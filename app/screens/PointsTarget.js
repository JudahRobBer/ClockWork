import React from 'react';
import { StyleSheet, View, Text, Button,Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../style/global';
import {useState, useEffect} from 'react'
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig"
import {getDoc,doc,collection, updateDoc} from "firebase/firestore"
import {getAuth} from "firebase/auth"




export default function ReviewDetails({ navigation }) {
  const [points,setPoints] = useState(0)

  useEffect(() => {
    const currentUser = getAuth().currentUser
    if (currentUser != null) {
      const userUID = currentUser.uid
      const docRef = doc(FIRESTORE_DB, "users",userUID)
      updateDoc(docRef, {goal_points: points})
    }
  },[points])


  const pressHandler = () => {
    navigation.navigate("Login");
  }
  const pressHandlernext = async() => {
    navigation.navigate("Tasks");
  }
  return (
    <View>
      <Text style={globalStyles.title}>Point Targets!</Text>
      <Text style={[globalStyles.text, {fontSize: 15, marginBottom : 20}]}>Set your goal by hitting the hours you wish to work</Text>
      <Text style={[globalStyles.text, {fontSize: 15, marginBottom : 20}]}>Be Mindful of the workload!</Text>
    
    <View style  = {globalStyles.container2}>
      <TouchableHighlight
        style={globalStyles.PTbox}
        underlayColor="lightgray" 
        onPress={() => {pressHandlernext(); setPoints(20) }}
      >
        <View style={globalStyles.box}>
          <Image source={require('../../assets/20_pts.png')} style={{height:50,width:50}} />
          <Text style={[globalStyles.text, { color: 'green' }]}>  2 hours - 20 points</Text>
        </View>
      </TouchableHighlight>
    </View>
      
    <View style  = {globalStyles.container2}>
      <TouchableHighlight
        style={globalStyles.PTbox}
        underlayColor="lightgray" 
        onPress={() => {pressHandlernext(); setPoints(40)}}
      >
        <View style={globalStyles.box}>
          <Image source={require('../../assets/40_pts.png')} style={{height:50,width:50}} />
          <Text style={[globalStyles.text, { color: 'black' }]}>  4 hours - 40 points</Text>
        </View>
      </TouchableHighlight>
    </View>
    
    <View style = {globalStyles.container2}>
      <TouchableHighlight
        style={[globalStyles.PTbox]} 
        underlayColor="lightgray" 
        onPress={() => {pressHandlernext(); setPoints(60) }}
      >
        <View style={globalStyles.box}>
          <Image source={require('../../assets/60_pts.png')} style={{height:50,width:50}} />
          <Text style={[globalStyles.text, { color: 'red' }]}>  6 hours - 60 points</Text>
        </View>
      </TouchableHighlight>
    </View>
      
    </View>
  );
}