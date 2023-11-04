import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";
import {getDoc,doc,collection, updateDoc} from "firebase/firestore"


const CommitmentForm = () => {
  const [event, setEvent] = useState('');
  const [time, setTime] = useState('');


  const handleSubmit = () => {
    console.log('Task:', task);
    console.log('Time:', time);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.label}>Enter Event name:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Event"
        onChangeText={setEvent}
        value={event}
      />

      <Text style={globalStyles.label}>Enter time (Start - End):</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter time"
        onChangeText={setTime}
        value={time}
        keyboardType="numeric"
      />

      <Button title="Submit" onPress={handleSubmit} />

    </View>
  );
};



export default CommitmentForm;


