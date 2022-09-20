import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import React from 'react';

function MainPageScreen() {
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

  return (
    <Layout>
      <Layout>
        <Text style={styles.heading}>PolyName</Text>
        <Text>leaderboard</Text>
        <Layout>
          <Text>1. player</Text>
          <Text>2. player</Text>
          <Text>3. player</Text>
          <Text>You</Text>
        </Layout>
      </Layout>
      <Layout style={styles.startArea}>
        <Layout>
          <Button title={'Start Quiz'}>Start quiz</Button>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainPageScreen;
