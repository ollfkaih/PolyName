import { Button } from '@ui-kitten/components';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { useFetchEmployees } from '../hooks/useFetchEmployees';
import { RootStackScreenProps } from '../types';

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

  const employee = employeeResult.employees[0];

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        key={employee.name}
        source={{ uri: employee?.image }}
        resizeMode="cover"
      />
      <Button onPress={() => navigation.goBack()}>{employee.name}</Button>
    </View>
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
