import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useFetchEmployees } from '../hooks/useFetchEmployees';
import { RootStackScreenProps } from '../types';
import { QuizQuestionNameSelect } from '../components/QuizQuestionNameSelect';
import { shuffle } from '../utils/shuffle';

const IMAGE_WIDTH = Dimensions.get('window').width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const QuestionScreen = ({ navigation }: RootStackScreenProps<'Question'>) => {
  const employeeResult = useFetchEmployees();

  if (employeeResult.loading) {
    return (
      <View>
        <Text style={styles.title}>{'Laster...'}</Text>
      </View>
    );
  }

  if (employeeResult.error || employeeResult.employees === undefined) {
    return (
      <View>
        <Text style={styles.title}>{employeeResult.error}</Text>
      </View>
    );
  }

  const employees = shuffle(employeeResult.employees);

  return (
    <QuizQuestionNameSelect
      employee={employees[0]}
      wrongAnswers={employees.slice(1, 4)}
      onContinue={() => navigation.navigate('Question')}
    />
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
