import React from 'react';
import { StyleSheet, View, Text, Button,Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../style/global';
import {useState} from 'react'
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig"
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
    <View>
      <Text style={globalStyles.title}>Point Targets!</Text>
      <Text style={[globalStyles.text, {fontSize: 15, marginBottom : 20}]}>Set your goal by hitting the hours you wish to work</Text>
      <Text style={[globalStyles.text, {fontSize: 15, marginBottom : 20}]}>Be Mindful of the workload!</Text>
      <TouchableHighlight
        style={globalStyles.container}
        underlayColor="lightgray" // Change the background color when pressed
        onPress={() => {setPoint(20); pressHandlernext()}}
      >
        <View style={globalStyles.box}>
          <Image source={require('../../assets/20_pts.png')} style={{height:50,width:50}} />
          <Text style={[globalStyles.text, { color: 'green' }]}>  2 hours - 20 points</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={globalStyles.container}
        underlayColor="lightgray" // Change the background color when pressed
        onPress={() => {setPoint(40); pressHandlernext()}}
      >
        <View style={globalStyles.box}>
          <Image source={require('../../assets/40_pts.png')} style={{height:50,width:50}} />
          <Text style={[globalStyles.text, { color: 'black' }]}>  4 hours - 40 points</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[globalStyles.container, {marginBottom: 100}]}
        underlayColor="lightgray" // Change the background color when pressed
        onPress={() => {setPoint(60); pressHandlernext()}}
      >
        <View style={globalStyles.box}>
          <Image source={require('../../assets/60_pts.png')} style={{height:50,width:50}} />
          <Text style={[globalStyles.text, { color: 'red' }]}>  6 hours - 60 points</Text>
        </View>
      </TouchableHighlight>
      <Button title='Log Out' onPress={() =>{FIREBASE_AUTH.signOut(), 
                                        navigation.navigate('Login')}}/>
    </View>
  );
}