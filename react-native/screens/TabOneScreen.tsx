import React from 'react';
import { Button, ScrollView } from 'react-native';

import { Text } from '../components/Themed';
import { Employee, useFetchEmployees } from '../hooks/useFetchEmployees';
import { RootStackScreenProps } from '../types';

export const TabOneScreen = ({ navigation }: RootStackScreenProps<'TabOne'>) => {
  const employeeResult = useFetchEmployees();

  const gotoDetails = (employee: Employee) => () =>
    navigation.navigate('Modal', { employee });

  return (
    <ScrollView>
      {employeeResult.error ? (
        <Text>{employeeResult.error}</Text>
      ) : employeeResult.loading ? (
        <Text>{'Laster...'}</Text>
      ) : (
        employeeResult.employees?.map((employee, index) => {
          return (
            <Button title={employee.name} onPress={gotoDetails(employee)} key={index} />
          );
        })
      )}
    </ScrollView>
  );
};
