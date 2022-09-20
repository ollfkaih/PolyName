import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, StyleSheet, Button } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import React from 'react';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <ApplicationProvider {...eva} theme={eva.light}>
          <SafeAreaView style={styles.container}>
            <View>
              <Text style={styles.heading}>PolyName</Text>
              <Text>leaderboard</Text>
            </View>
          </SafeAreaView>
          <SafeAreaView style={styles.startArea}>
            <View>
              <Button title={"Start Quiz"}>Start quiz</Button>
            </View>
          </SafeAreaView>
        </ApplicationProvider>
    );
  }
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
    height: 100
  }
});