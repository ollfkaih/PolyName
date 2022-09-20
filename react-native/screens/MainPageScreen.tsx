import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text } from '@ui-kitten/components';
import React from 'react';
import { RootStackScreenProps } from '../types';

function MainPageScreen({ navigation }: RootStackScreenProps<'Root'>) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.heading}>PolyName</Text>
        <Text>leaderboard</Text>
        <View>
          <Text>1. plasyer</Text>
          <Text>2. player</Text>
          <Text>3. player</Text>
          <Text>You</Text>
        </View>
      </View>
      <View style={styles.startArea}>
        <View>
          <Button title={'Start Quiz'} onPress={() => navigation.navigate('Question')}>
            Start quiz
          </Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: '#fcabfc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
  },
  startArea: {
    flex: 0.2,
    backgroundColor: '#111',
    fontSize: 50,
    height: 100,
  },
});

export default MainPageScreen;
