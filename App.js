import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [username, setUsername] = useState('base');
  const [score, setScore] = useState(0);
  const [allScores, setAllScores] = useState([]);

  //This useEffect runs once when this component is first rendered
  useEffect(() => {
    //fetch all scores, return ordered by score in descending order
    getCurrentScores();
  }, []);

  //Get current leaderboard
  const getCurrentScores = () => {
    firestore()
      .collection('scores')
      .orderBy('score', 'desc')
      .get()
      .then(querySnapshot => {
        const docs = [];
        querySnapshot.forEach(doc => {
          docs.push(doc.data());
        });
        setAllScores(docs);
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
  };

  //update user score on firebase
  const updateUserScore = newScore => {
    firestore()
      .collection('scores')
      .doc(username)
      .set({username: username, score: score})
      .then(() => {
        //refetch current leaderboard
        getCurrentScores();
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.userNameInput}
        placeholder="Enter username"
        onChangeText={setUsername}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setScore(score + 1);
          updateUserScore(score + 1);
        }}>
        <Text>Press me! Current score: {score}</Text>
      </TouchableOpacity>
      <Text>Leadeboard</Text>
      {allScores.map(userScore => {
        return (
          <>
            <Text>
              {userScore.username}: {userScore.score}
            </Text>
          </>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'lightblue',
  },
});

export default App;
