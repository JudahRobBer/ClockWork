import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../../style/global';
import {useState} from 'react'
import {FIRESTORE_DB} from "../../firebaseConfig"
import {getDoc,doc,collection, updateDoc} from "firebase/firestore"
import {getAuth} from "firebase/auth"




export default function ReviewDetails({ navigation }) {
  const [points,setPoint] = useState(null)

  

  const pressHandler = () => {
    navigation.navigate("Login");
  }
  const pressHandlernext = async() => {
    const currentUser = getAuth().currentUser
    const userUID = currentUser.uid
    const docRef = doc(FIRESTORE_DB, "users",userUID)
    const updateUser = await updateDoc(docRef, {goal_points: points})

    console.log("success")
    
    navigation.navigate("Tasks");
  }
  return (
    <View style={globalStyles.title}>
      <Text style={globalStyles.title}>Point Targets!</Text>
      <Text style={globalStyles.content}>2 hours-20 points</Text>
      <Button title='Hit Me!' onPress={() => {setPoint(20); pressHandlernext()}} />
      <Text style={globalStyles.content}>4 hours-40 points</Text>
      <Button title='Hit Me!' onPress={() => {setPoint(40); pressHandlernext()}} />
      <Text style={globalStyles.content}>6 hours-60 points</Text>
      <Button title='Hit Me!' onPress={() => {setPoint(60); pressHandlernext()}}/>
      <Button title='Log Out' onPress={pressHandler} />
    </View>
  );
}