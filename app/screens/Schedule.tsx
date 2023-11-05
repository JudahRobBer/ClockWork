import React from 'react';
import { StyleSheet, View, Text, Button,Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig"
import CommitmentForm from './Commitments';
import {useState,useEffect} from 'react';
import {doc, getDoc, updateDoc} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import { Colors } from 'react-native/Libraries/NewAppScreen';


const TableOfContents = () => {
  const [schedule, setSchedule] = useState([])
  const [timeSchedule, setTimeSchedule] = useState([])
  const [curPoints,SetCurPoints] = useState(0)
  

  //handle schedule parsing
  const parseStringCommitment = (commitment) => {
    
    //truly abhorent code
    const title = commitment.slice(0,commitment.search("_"))
    commitment = commitment.slice(commitment.search("_") + 1)
    const start = commitment.slice(0,commitment.search("_"))
    commitment = commitment.slice(commitment.search("_") + 1)
    const end = commitment.slice(commitment.search("_") + 1)

    const start_hour = parseInt(start.slice(0,start.search(":")))
    const start_minutes = parseInt(start.slice(start.search(":") + 1))
    const end_hour = parseInt(end.slice(0,start.search(":")))
    const end_minutes = parseInt(start.slice(end.search(":") + 1))
    return [start_hour,start_minutes,end_hour,end_minutes,title];
  }

  const generateArray = () => {
    const docRef = doc(FIRESTORE_DB, "users", getAuth().currentUser.uid);
        getDoc(docRef).then((docsnap) => {
            if (docsnap.exists()) {
                
              //get the data from database
                const taskData = docsnap.get("tasks")
                const commitmentData = docsnap.get("commitments")
                
                //assuming a maximum work day of 8 - 20
                //temporarySchedule[0] -> 8:00 - 9:00
                const temporarySchedule = Array(12).fill("")
                const temporaryTimeSchedule = Array(12).fill("")
                commitmentData.forEach((commitment) => {
                  const asList = parseStringCommitment(commitment)
                  const startIndex = (asList[0] - 8)
                  const endIndex = (asList[2] - 8)
                  if (0 <= startIndex && startIndex < temporarySchedule.length && 0 <= endIndex && endIndex < temporarySchedule.length && startIndex < endIndex) {
                    for (let i = startIndex; i < endIndex; i++){
                      temporarySchedule[i] = asList[4]
                      temporaryTimeSchedule[i] = asList[0] + ":" + asList[1] + "0" +"-" + (i + 9).toString() + ":00"  
                    }
                  }
                })

                taskData.forEach((task) => {
                  let assigned = false
                  let index = 0
                  while (!assigned && index < temporarySchedule.length){
                    //this is a valid hour
                    if (temporarySchedule[index] == "") {
                      assigned = true
                      temporarySchedule[index] = task.title
                      temporaryTimeSchedule[index] = (index + 8).toString() + ":00" +"-" + (index + 9).toString() + ":00"  
                    }
                  }
                })
                
                //filter out for only filled time slots
                const filteredSchedule = []
                temporarySchedule.forEach((item) => {
                  if (item != ""){
                    filteredSchedule.push(item)
                  }
                })
                const filteredTimeSchedule = []
                temporaryTimeSchedule.forEach((item) => {
                  if (item != ""){
                    filteredTimeSchedule.push(item)
                  }
                })
                
                setSchedule(filteredSchedule)
                setTimeSchedule(filteredTimeSchedule)
            }

            })
  }

  useEffect(() => {
    const currentUser = getAuth().currentUser
    const userUID = currentUser.uid
    const docRef = doc(FIRESTORE_DB, "users",userUID)
    updateDoc(docRef, {current_points: curPoints})
    console.log(curPoints)
    generateArray()
  },[curPoints])
  

    return (
      <View style={[styles.container, {marginTop : 40}]}>
        <View style={styles.column}>
          {schedule.map((event) => {
            return (
              <Button title= {event} onPress={() => {SetCurPoints(curPoints + 10)}}/>
            );
            
          })}
          
          
        </View>
          
        <View style={styles.column}>
          {timeSchedule.map((event) => {
            return (
              <Text style={globalStyles.text}>{event}</Text>
            );
            
          })}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Arrange the columns horizontally
      padding: 10, 
      
    },
    column: {
      flex: 1, // Make each column take an equal amount of space
      padding: 25,
      borderWidth: 1, // Add a border to the columns to make them less flat
      borderColor: 'gray', // Set the border color
      borderRadius: 5, // Add rounded corners to the columns
      backgroundColor: 'white', // Add a background color
      margin: 5, // Add margin to separate the columns
    },
    header: {
      fontWeight: 'bold',
      marginBottom: 5,
      alignSelf: 'center',
    },
  });
  
const style2 = StyleSheet.create({
    container: {
      flex: 1, // This will make the parent container take up the entire screen
      justifyContent: 'center', // Center the child content vertically
      alignItems: 'center', // Center the child content horizontally
      padding: 20,
    },
});

export default function ShowSchedule({navigation}){
  const [schedule, setSchedule] = useState([])
  const [item, setItem] = useState(null)
  const [timeSchedule, setTimeSchedule] = useState([])
  const [curPoints,SetCurPoints] = useState(0)
  const [totalPoints,setTotalPoints] =useState(0)
  

  //handle schedule parsing
  const parseStringCommitment = (commitment) => {
    
    //truly abhorent code
    const title = commitment.slice(0,commitment.search("_"))
    commitment = commitment.slice(commitment.search("_") + 1)
    const start = commitment.slice(0,commitment.search("_"))
    commitment = commitment.slice(commitment.search("_") + 1)
    const end = commitment.slice(commitment.search("_") + 1)

    const start_hour = parseInt(start.slice(0,start.search(":")))
    const start_minutes = parseInt(start.slice(start.search(":") + 1))
    const end_hour = parseInt(end.slice(0,start.search(":")))
    const end_minutes = parseInt(start.slice(end.search(":") + 1))
    return [start_hour,start_minutes,end_hour,end_minutes,title];
  }

  const generateArray = () => {
    const docRef = doc(FIRESTORE_DB, "users", getAuth().currentUser.uid);
        getDoc(docRef).then((docsnap) => {
            if (docsnap.exists()) {
                
              //get the data from database
                const taskData = docsnap.get("tasks")
                const commitmentData = docsnap.get("commitments")
                
                //assuming a maximum work day of 8 - 20
                //temporarySchedule[0] -> 8:00 - 9:00
                const temporarySchedule = Array(12).fill("")
                const temporaryTimeSchedule = Array(12).fill("")
                commitmentData.forEach((commitment) => {
                  const asList = parseStringCommitment(commitment)
                  const startIndex = (asList[0] - 8)
                  const endIndex = (asList[2] - 8)
                  if (0 <= startIndex && startIndex < temporarySchedule.length && 0 <= endIndex && endIndex < temporarySchedule.length && startIndex < endIndex) {
                    for (let i = startIndex; i < endIndex; i++){
                      temporarySchedule[i] = asList[4]
                      temporaryTimeSchedule[i] = asList[0] + ":" + asList[1] + "0" +"-" + (i + 9).toString() + ":00"  
                    }
                  }
                })

                taskData.forEach((task) => {
                  let assigned = false
                  let index = 0
                  while (!assigned && index < temporarySchedule.length){
                    //this is a valid hour
                    if (temporarySchedule[index] == "") {
                      assigned = true
                      temporarySchedule[index] = task.title
                      temporaryTimeSchedule[index] = (index + 8).toString() + ":00" +"-" + (index + 9).toString() + ":00"  
                    }
                  }
                })
                
                //filter out for only filled time slots
                const filteredSchedule = []
                temporarySchedule.forEach((item) => {
                  if (item != ""){
                    filteredSchedule.push(item)
                  }
                })
                const filteredTimeSchedule = []
                temporaryTimeSchedule.forEach((item) => {
                  if (item != ""){
                    filteredTimeSchedule.push(item)
                  }
                })
                
                setSchedule(filteredSchedule)
                setTimeSchedule(filteredTimeSchedule)
            }

            })
  }

  useEffect(() => {
    const currentUser = getAuth().currentUser
    const userUID = currentUser.uid
    const docRef = doc(FIRESTORE_DB, "users",userUID)
    updateDoc(docRef, {current_points: curPoints})
    getDoc(docRef).then((docsnap) => {
      if (docsnap.exists()) {
          setTotalPoints(docsnap.get("goal_points"))
          SetCurPoints(docsnap.get("current_points"))
    }})
    console.log(curPoints)
    if (item == null)
    {
      generateArray()
    }
  },[curPoints])
  
    const buttonBehavior = () => {
      
      //update the arrays
        SetCurPoints(curPoints + 10)
        const index = schedule.findIndex((element) => element == item )
        
  
        const copy = schedule
        delete copy[index]
        setSchedule(copy)
        
        
        const timeCopy = timeSchedule
        delete timeCopy[index]
        setTimeSchedule(timeCopy)

    }


    return(
        <View style={style2.container}>
            <Text style={[globalStyles.title, {fontSize : 30, marginTop : 0}]}> This is Your Schedule!</Text>
            <Text style ={[globalStyles.title, {fontSize : 20, marginTop : 0}]}>{ 'Points Summary: '+ curPoints + '/' + totalPoints} </Text>
          
            <View style={[styles.container, {marginTop : 40}]}>
        <View style={styles.column}>
          {schedule.map((event) => {
            return (
              <Button title= {event} onPress={() => {setItem(event); buttonBehavior()}}/>
            );
            
          })}
          
          
        </View>
          
        <View style={styles.column}>
          {timeSchedule.map((event) => {
            return (
              <Text style={globalStyles.text, {flexDirection: "row", marginBottom:20, fontSize:18}}>{event}</Text>
            );
            
          })}
        </View>
      </View>
            <View style = {[globalStyles.box, {backgroundColor : "green", marginBottom : 10}]}>
                <Button
                     onPress={() => navigation.navigate("Commitments")} title="Add More Commitments" color='white'
                />
            </View>
            <Button title='Log Out' onPress={() =>{FIREBASE_AUTH.signOut(), 
                                                    navigation.navigate('Login')}}/>
        </View>
    );

}

 
 
  
