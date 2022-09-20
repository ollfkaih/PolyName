import React, { useState } from 'react';
import { Employee } from '../hooks/useFetchEmployees';
import { View } from './Themed';
import { Button } from '@ui-kitten/components';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { shuffle } from '../utils/shuffle';

interface Props {
  employee: Employee;
  wrongAnswers: Employee[];
  onContinue: () => void;
}

const IMAGE_WIDTH = Dimensions.get('window').width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const QuizQuestionNameSelect = ({ employee, wrongAnswers, onContinue }: Props) => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>();

  const buttons = shuffle([
    <Button
      style={styles.button}
      status={selectedEmployee === employee ? 'success' : ''}
      onPress={() => setSelectedEmployee(employee)}
    >
      {employee.name}
    </Button>,
    ...wrongAnswers.map((wrongAnswer) => (
      <Button
        style={styles.button}
        status={selectedEmployee === wrongAnswer ? 'danger' : ''}
        onPress={() => setSelectedEmployee(wrongAnswer)}
      >
        {wrongAnswer.name}
      </Button>
    )),
  ]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        key={employee.name}
        source={{ uri: employee?.image }}
        resizeMode="cover"
      />
      {buttons}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  button: {
    margin: 4,
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
