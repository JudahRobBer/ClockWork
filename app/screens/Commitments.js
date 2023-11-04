import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";

const TaskForm = () => {
  const [event, setEvent] = useState('');
  const [time, setTime] = useState('');


  const handleSubmit = () => {
    console.log('Task:', task);
    console.log('Time:', time);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Event name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Event"
        onChangeText={setEvent}
        value={event}
      />

      <Text style={styles.label}>Enter time (Start - End):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter time"
        onChangeText={setTime}
        value={time}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 15,
  },
});

export default TaskForm;
