import React, { ReactNode, useState } from 'react';
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Text, View } from '../components/Themed';
import { AnswerStatus, Quiz, RootStackScreenProps } from '../types';
import { QuizQuestionNameSelect } from '../components/QuizQuestionNameSelect';
import { useQuiz } from '../hooks/useQuiz';
import { QuizAnswerResult } from '../components/QuizAnswerResult';
import { Layout } from '@ui-kitten/components';
import { QuizProgressBar } from '../components/QuizProgressBar';

const IMAGE_WIDTH = Dimensions.get('window').width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const QuestionScreen = ({ navigation }: RootStackScreenProps<'Question'>) => {
  const quizResponse = useQuiz({ questionCount: 10 });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerStatus[]>([]);

  const getAnswerStatus = (questionIndex: number) => {
    return answers[questionIndex] || 'UNANSWERED';
  };

  const currentAnswerStatus = getAnswerStatus(questionIndex);

  if (quizResponse.loading) {
    return (
      <View>
        <Text style={styles.title}>{'Laster...'}</Text>
      </View>
    );
  }

  if (quizResponse.error || quizResponse.quiz === undefined) {
    return (
      <View>
        <Text style={styles.title}>{quizResponse.error}</Text>
      </View>
    );
  }

  const quiz: Quiz = quizResponse.quiz;

  const currentQuestion = quiz.questions[questionIndex];

  let questionComponent: ReactNode;
  switch (currentQuestion.type) {
    case 'name-select':
      questionComponent = (
        <QuizQuestionNameSelect
          key={currentQuestion.correctAnswer.name}
          question={currentQuestion}
          onAnswer={(status) => setAnswers([...answers, status])}
        />
      );
      break;
    case 'picture-select':
      questionComponent = <Text>picture-select</Text>;
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        <QuizProgressBar
          quiz={quiz}
          answers={answers}
          currentQuestionIndex={questionIndex}
        />
        {questionComponent}
        {currentAnswerStatus !== 'UNANSWERED' && (
          <QuizAnswerResult
            answerStatus={currentAnswerStatus}
            onNextQuestion={() => {
              if (questionIndex + 1 >= quiz.questions.length) {
                navigation.navigate('Root');
              }
              setQuestionIndex(questionIndex + 1);
            }}
          />
        )}
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
