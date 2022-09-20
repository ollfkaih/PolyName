import React, { ReactNode, useState } from 'react';
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native';
import { Text, View } from '../components/Themed';
import { AnswerStatus, RootStackScreenProps } from '../types';
import { QuizQuestionNameSelect } from '../components/QuizQuestionNameSelect';
import { useQuiz } from '../hooks/useQuiz';

const IMAGE_WIDTH = Dimensions.get('window').width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const QuestionScreen = ({ navigation }: RootStackScreenProps<'Question'>) => {
  const quizResponse = useQuiz({ questionCount: 10 });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('UNANSWERED');

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

  const currentQuestion = quizResponse.quiz.questions[questionIndex];

  let questionComponent: ReactNode;
  switch (currentQuestion.type) {
    case 'name-select':
      questionComponent = (
        <QuizQuestionNameSelect question={currentQuestion} onAnswer={setAnswerStatus} />
      );
      break;
    case 'picture-select':
      questionComponent = <Text>picture-select</Text>;
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      {questionComponent}
      <Text>{answerStatus}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
