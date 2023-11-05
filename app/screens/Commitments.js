import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform , TouchableOpacity, FlatList} from 'react-native';
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
    if (event == '' || time == '' || timeEnd == ''){
      alert('Please make sure all the boxes are filled');
    }
    else if (parseInt(time.slice(0,time.search(":")) >= parseInt(timeEnd.slice(0,timeEnd.search(":")))))
    {
      alert("Please Enter a valid Interval")
    }
    else if (time.slice(time.search(":")+1) != "00" || time.slice(time.search(":") + 1) != "00")
    {
      alert("We are only handling hour intervals on the hour at this time!")
    }

    else{
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
  }
};
const generateschedule = () => {
  navigation.navigate("Schedule")
}

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

      <FlatList
        data={formattedEvents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index }) => (
          <View style={globalStyles.tableRow}>
            <Text style={globalStyles.tableCell}>{item.split('_')[0]}</Text>
            <Text style={globalStyles.tableCell}>from</Text>
            <Text style={globalStyles.tableCell}>{item.split('_')[1]}</Text>
            <Text style={globalStyles.tableCell}>to</Text>
            <Text style={globalStyles.tableCell}>{item.split('_')[2]}</Text>
          </View>
        )}
      />
      
      <TouchableOpacity style={[globalStyles.button, { backgroundColor: '#2f68c4' }]} onPress={handleSubmit}>
                <Text style = {globalStyles.buttonText}> Submit!</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[globalStyles.button, { backgroundColor: '#b50704' }]} onPress={generateschedule}>
                <Text style = {globalStyles.buttonText} > Generate Schedule!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommitmentForm;