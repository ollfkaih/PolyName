import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, StyleSheet, Button } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import React from 'react';
import MainPageScreen from './screens/MainPageScreen';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{flex: 1}}>
          <MainPageScreen />
        </SafeAreaView>
      </ApplicationProvider>
    );
  }
}
