import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform , TouchableOpacity} from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";
import {getDoc,doc,collection, updateDoc} from "firebase/firestore"

import {getAuth} from "firebase/auth"
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import Firestore
import 'firebase/auth'; // Import Firebase Authentication (if needed)


const CommitmentForm = ({navigation}) => {
  const [event, setEvent] = useState('');
  const [time, setTime] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [formattedEvents,setFormattedEvents] = useState([]);



  const handleSubmit = async() => {
    time_split = time.search("-")
    formatted = event.concat("_"+ time + "_" + timeEnd)
    
    const commitmentCopy = formattedEvents
    commitmentCopy.push(formatted)
    
    const docRef = doc(FIRESTORE_DB, "users", getAuth().currentUser.uid);
    await updateDoc(docRef, {
      commitments: commitmentCopy,
  })

  setEvent("")
  setTime("")
  setTimeEnd("")

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
        <View style = {globalStyles.inputRow}>
          <Text style={globalStyles.label}>Enter time (Start):</Text>
            
          <Text style={globalStyles.label}>Enter time (End):</Text>
          
        </View>

        <View style = {[globalStyles.inputRow]}>
            <TextInput
              style={globalStyles.input}
              placeholder = "Enter time"
              onChangeText={setTime}
              value={time}
            />
          <TextInput
            style={globalStyles.input}
            placeholder = "Enter time"
            onChangeText={setTimeEnd}
            value={timeEnd}
          />
        </View>
      </View>

      
        

      <TouchableOpacity style={[globalStyles.button, { backgroundColor: '#00FF00' }]} onPress={handleSubmit}>
                <Text style = {globalStyles.buttonText}>Generate Schedule!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommitmentForm;