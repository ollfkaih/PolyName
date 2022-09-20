import React from 'react';
import { Dimensions, Button, Image, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

const IMAGE_WIDTH = Dimensions.get('window').width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const ModalScreen = ({
  navigation,
  route: {
    params: { employee },
  },
}: RootStackScreenProps<'Modal'>) => {
  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text>{employee.name}</Text>
      <Image
        style={styles.image}
        key={employee.name}
        source={{ uri: employee.image }}
        resizeMode="cover"
      />

      <Button title="Tilbake" onPress={goBack} />
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
