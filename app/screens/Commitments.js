import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";
import {getDoc,doc,collection, updateDoc} from "firebase/firestore"
import {getAuth} from "firebase/auth"


const CommitmentForm = () => {
  const [event, setEvent] = useState('');
  const [time, setTime] = useState('');
  const [formattedEvents,setFormattedEvents] = useState([]);


  const handleSubmit = async() => {
  
    time_split = time.search("-")
    formatted = event.concat("_"+ time.slice(0,time_split) + "_" + time.slice(time_split + 1))
    
    const commitmentCopy = formattedEvents
    commitmentCopy.push(formatted)
    
    const docRef = doc(FIRESTORE_DB, "users", getAuth().currentUser.uid);
    await updateDoc(docRef, {
      commitments: commitmentCopy,
  })
  };

  return (
    <View style={globalStyles.container}>
      <View>
      <Text style={globalStyles.label}>Enter Event name:</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Enter Event"
        onChangeText={setEvent}
        value={event}
      />
      </View>

      <View>
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
    </View>
  );
};

export default CommitmentForm;


