import { AnswerStatus } from '../types';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';

interface Props {
  answerStatus: Exclude<AnswerStatus, 'UNANSWERED'>;
  onNextQuestion: () => void;
}

export const QuizAnswerResult = ({ answerStatus, onNextQuestion }: Props) => {
  return (
    <Layout
      style={{
        ...styles.container,
        backgroundColor: answerStatus === 'CORRECT' ? 'green' : 'red',
      }}
    >
      <Text style={styles.title}>{answerStatus}</Text>
      <Button style={styles.button} onPress={onNextQuestion}>
        Next question
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  button: {
    margin: 4,
    marginBottom: 100,
  },
});
