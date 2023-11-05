import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";
import {getDoc,doc,collection, updateDoc} from "firebase/firestore"

import {getAuth} from "firebase/auth"
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import Firestore
import 'firebase/auth'; // Import Firebase Authentication (if needed)


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
    <View >
      <View style={globalStyles.containerCom}>
      <Text style={globalStyles.label}>Enter Event name:</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Enter Event"
          onChangeText={setEvent}
          value={event}
        />
      </View>

      <View style = {globalStyles.containerCom}>
        <Text style={globalStyles.label}>Enter time (Start - End):</Text>
          <TextInput
            style={globalStyles.input}
            placeholder = "Enter time"
            onChangeText={setTime}
            value={time}
            keyboardType="numeric"
          />
        </View>
        
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CommitmentForm;


