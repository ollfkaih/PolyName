import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { AnswerStatus, Quiz } from '../types';

interface Props {
  quiz: Quiz;
  answers: AnswerStatus[];
  currentQuestionIndex: number;
}

export const QuizProgressBar = ({ quiz, answers, currentQuestionIndex }: Props) => {
  return (
    <Layout style={styles.container}>
      {quiz.questions.map((question, index) => {
        let backgroundColor: string;
        switch (answers[index] || 'UNANSWERED') {
          case 'CORRECT':
            backgroundColor = 'green';
            break;
          case 'INCORRECT':
            backgroundColor = 'red';
            break;
          case 'UNANSWERED':
            if (index === currentQuestionIndex) {
              backgroundColor = 'blue';
            } else {
              backgroundColor = 'gray';
            }
            break;
        }

        return (
          <Layout
            key={index}
            style={{
              ...styles.element,
              backgroundColor,
            }}
          />
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  element: {
    flex: 1,
    height: 6,
    width: 10,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 10,
  },
});
