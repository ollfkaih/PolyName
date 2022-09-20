import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Text, Button, Layout } from '@ui-kitten/components';
import React from 'react';
import { RootStackScreenProps } from '../types';

type Player = {
  name: string;
  medal: string;
  points: number;
};
const winningPlayers = [
  { name: 'Jens Arnesen', medal: '🥇', points: 123 },
  { name: 'Fredrik Fonn Hansen', medal: '🥈', points: 209 },
  { name: 'Langlang Langtlangtnavnesen', medal: '🥉', points: 32 },
  { name: 'Du', medal: '🤦‍♀️', points: 17 },
];

function MainPageScreen({ navigation }: RootStackScreenProps<'Root'>) {
  return (
    <>
      <Layout style={styles.container}>
        <Layout style={styles.fullWidth}>
          <Text style={{ ...styles.heading, marginTop: 20, marginLeft: 10 }}>
            PolyName
          </Text>
          <Text style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
            Ukas leaderboard
          </Text>
          <Layout style={styles.leaderboard}>
            {winningPlayers
              .sort((a, b) => b.points - a.points)
              .map((player: Player) => (
                <Layout key={player.name} style={styles.leaderboardItem}>
                  <Text style={styles.white}>
                    {player.medal} {player.name}
                  </Text>
                  <Text style={styles.white}>{player.points} p</Text>
                </Layout>
              ))}
          </Layout>

          <Text style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
            Ukas premie
          </Text>
          <Layout style={styles.leaderboard}>
            <Text style={styles.white}>📩 Gavekort 1.500 kr</Text>
          </Layout>

          <Text style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 10 }}>
            Tidligere vinnere
          </Text>
          <Layout style={{ ...styles.previousWinner, backgroundColor: '#5D135D' }}>
            <Text style={styles.white}>Olav K</Text>
            <Text style={styles.white}>Uke 38</Text>
          </Layout>
          <Layout style={styles.previousWinner}>
            <Text style={{ color: '#5D135D' }}>Person A</Text>
            <Text style={{ color: '#5D135D' }}>Uke 37</Text>
          </Layout>
          <Layout style={styles.previousWinner}>
            <Text style={{ color: '#5D135D' }}>Person B</Text>
            <Text style={{ color: '#5D135D' }}>Uke 36</Text>
          </Layout>
        </Layout>
      </Layout>
      <Layout style={styles.startArea}>
        <Button size="giant" style={styles.button}>
          Start quiz
        </Button>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    backgroundColor: '#FFE2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
  },
  startArea: {
    flex: 0.2,
    backgroundColor: '#FFE2FF',
    fontSize: 50,
    height: 100,
    textAlign: 'center',
  },
  leaderboardPlayers: {
    textAlign: 'left',
  },
  leaderboard: {
    backgroundColor: '#5D135D',
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  previousWinner: {
    borderWidth: 2,
    borderColor: '#5D135D',
    backgroundColor: '#FFE2FF',
    padding: 20,
    borderRadius: 8,
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leaderboardItem: {
    backgroundColor: '#5D135D',
    padding: 5,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  fullWidth: {
    width: '90%',
    justifyContent: 'center',
    backgroundColor: '#FFE2FF',
  },
  white: {
    color: 'white',
  },
  button: {
    backgroundColor: '#FD7F00',
    height: 75,
    borderColor: '#FD7F00',
    borderRadius: 4,
    margin: 30,
    border: 0,
  },
});

export default MainPageScreen;
