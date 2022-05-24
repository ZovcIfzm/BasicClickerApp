import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const App = () => {
  const [score, setScore] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setScore(score + 1);
        }}>
        <Text>Press me! Current score: {score}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
  },
});

export default App;
