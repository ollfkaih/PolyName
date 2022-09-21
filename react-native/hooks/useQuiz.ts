import { Employee, useFetchEmployees } from './useFetchEmployees';
import { NameSelectQuestion, Question, Quiz } from '../types';
import { useState } from 'react';
import { shuffle } from '../utils/shuffle';
import { Asset } from 'expo-asset';

interface QuizResponse {
  loading: boolean;
  error?: string;
  quiz?: Quiz;
  resetQuiz: () => void;
}

const createNameSelectQuestion: QuestionGenerator<NameSelectQuestion> = (
  employee,
  allEmployees
) => ({
  type: 'name-select',
  correctAnswer: employee,
  incorrectAnswers: shuffle(allEmployees)
    .filter((e) => e.name !== employee.name)
    .slice(0, 3),
});

type QuestionGenerator<T extends Question = Question> = (
  employee: Employee,
  allEmployees: Employee[]
) => T;

const questionGenerators: QuestionGenerator[] = [createNameSelectQuestion];

const createQuestion: QuestionGenerator = (employee, allEmployees) =>
  questionGenerators[Math.floor(Math.random() * questionGenerators.length)](
    employee,
    allEmployees
  );

const createQuiz = (
  employees: Employee[],
  { questionCount }: { questionCount: number }
): Quiz => ({
  questions: shuffle(employees)
    .slice(0, questionCount)
    .map((employee) => createQuestion(employee, employees)),
});

const loadAssetsAsync = async (images: string[]) => {
  return Promise.all(images.map((image) => Asset.fromModule(image).downloadAsync()));
};

export const useQuiz = ({ questionCount }: { questionCount: number }): QuizResponse => {
  const { loading, error, employees } = useFetchEmployees();
  const [preloadingImages, setPreloadingImages] = useState(true);

  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined);

  if (employees && !quiz) {
    const quiz = createQuiz(employees, { questionCount });
    setPreloadingImages(true);
    loadAssetsAsync(quiz.questions.map((q) => q.correctAnswer.image)).then(() =>
      setPreloadingImages(false)
    );
    setQuiz(quiz);
  }

  return {
    loading: loading || preloadingImages,
    error,
    quiz,
    resetQuiz: () => {
      setQuiz(undefined);
    },
  };
};
