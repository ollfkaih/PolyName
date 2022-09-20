import React, { useMemo, useState } from 'react';
import { Employee } from '../hooks/useFetchEmployees';
import { Button, Layout } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { shuffle } from '../utils/shuffle';
import { AnswerStatus, NameSelectQuestion } from '../types';

interface Props {
  question: NameSelectQuestion;
  onAnswer: (status: AnswerStatus) => void;
}

const IMAGE_WIDTH = Dimensions.get('window').width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const QuizQuestionNameSelect = ({ question, onAnswer }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState<Employee | undefined>();

  const answers = useMemo(
    () => shuffle([question.correctAnswer, ...question.incorrectAnswers]),
    [question]
  );

  return (
    <Layout style={styles.container}>
      <Image
        style={styles.image}
        key={question.correctAnswer.name}
        source={{ uri: question.correctAnswer?.image }}
        resizeMode="cover"
      />
      <Layout>
        {answers.map((answer) => (
          <Button
            key={answer.name}
            style={styles.button}
            status={
              (selectedAnswer === answer &&
                (selectedAnswer === question.correctAnswer ? 'success' : 'danger')) ||
              undefined
            }
            onPress={
              selectedAnswer
                ? undefined
                : () => {
                    setSelectedAnswer(answer);
                    onAnswer(answer === question.correctAnswer ? 'CORRECT' : 'INCORRECT');
                  }
            }
          >
            {answer.name}
          </Button>
        ))}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  button: {
    margin: 4,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    flex: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
