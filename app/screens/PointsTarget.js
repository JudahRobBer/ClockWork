import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../../style/global';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";
import navigationOptions from "@react-navigation/native"
export default function ReviewDetails({ navigation }) {

  const pressHandler = () => {
      // `headerLeft: undefined` should work too
      // `headerLeft: null` should work but could trigger a TS error
    navigation.goBack();

  }
  const pressHandlernext = () => {
    navigation.navigate("Todo List");
  }
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Point Targets!</Text>
      <Text style={globalStyles.content}>2 hours-20 points</Text>
      <Button title='Hit Me!' onPress={pressHandlernext} />
      <Text style={globalStyles.content}>4 hours-40 points</Text>
      <Button title='Hit Me!' onPress={pressHandlernext} />
      <Text style={globalStyles.content}>6 hours-60 points</Text>
      <Button title='Hit Me!' onPress={pressHandlernext} />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
    </View>
  );
}