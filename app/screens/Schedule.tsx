import React from 'react';
import { StyleSheet, View, Text, Button,Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig"
import CommitmentForm from './Commitments';

const TableOfContents = () => {
    return (
      <View style={[styles.container, {marginTop : 40}]}>
        <View style={styles.column}>
          <Text style={styles.header}>Events</Text>
          <Text style={globalStyles.text}>Event 1</Text>
          <Text style={globalStyles.text}>Event 2</Text>
          <Text style={globalStyles.text}>Event 3</Text>
          <Text style={globalStyles.text}>Event 4</Text>
          <Text style={globalStyles.text}>Event 5</Text>
          <Text style={globalStyles.text}>Event 6</Text>
          {/* Add more events here */}
        </View>
  
        <View style={styles.column}>
          <Text style={styles.header}>Scheduled Time</Text>
          <Text style={globalStyles.text}>9:00 AM</Text>
          <Text style={globalStyles.text}>10:30 AM</Text>
          <Text style={globalStyles.text}>10:30 AM</Text>
          <Text style={globalStyles.text}>10:30 AM</Text>
          {/* Add corresponding scheduled times here */}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row', // Arrange the columns horizontally
      padding: 10, // Add padding to the container to separate it from the edges
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

export default function Schedule({navigation}){
    return(
        <View style={style2.container}>
            <Text style={[globalStyles.title, {fontSize : 30, marginTop : -200}]}> This is Your Schedule!</Text>
            <TableOfContents />
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
  

 
 
  
