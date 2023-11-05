import React from 'react';
import { StyleSheet, View, Text, Button,Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig"
import CommitmentForm from './Commitments';

export default function ShowSchedule({navigation}){
    const currentUser = getAuth().currentUser;
    const userID = currentUser.userID;
    const docRef = doc(FIRESTORE_DB, "users", userID)
    docRef
    <View>
        <Text style = {globalStyles.title}> Schedule </Text>
        <Text style = {globa}
    </View>

}