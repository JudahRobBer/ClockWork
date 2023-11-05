import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";
import {getDoc,doc,collection, updateDoc} from "firebase/firestore"
import firebase from 'firebase/app';
import 'firebase/firestore'; // Import Firestore
import 'firebase/auth'; // Import Firebase Authentication (if needed)

const CommitmentForm = () => {
  const [event, setEvent] = useState('');
  const [time, setTime] = useState('');


const handleSubmit = async() => {
    console.log('Task:', event);
    console.log('Time:', time);
    
    
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