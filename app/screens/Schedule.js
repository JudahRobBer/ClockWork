import React from 'react';
import { StyleSheet, View, Text, Button,Image, TouchableHighlight } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig"
import CommitmentForm from './Commitments';




export default function ShowSchedule({navigation}){
    // const currentUser = getAuth().currentUser;
    // const userID = currentUser.userID;
    // const docRef = doc(FIRESTORE_DB, "users", userID)

    class FormattedTime {
        constructor(stringForm) {
            this.title = stringForm.slice(0,stringForm.search("_"))
            stringForm = stringForm.slice(stringForm.search("_" + 1))
            this.start = stringForm.slice(0,stringForm.slice(stringForm.search("_")))
            stringForm = stringForm.slice(stringForm.search("_" + 1))
            this.end = stringForm
        }
    }
    
    <View>
        <View style = {globalStyles.container}>

        </View>

    </View>

}