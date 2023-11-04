import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';
export default function ReviewDetails({ navigation }) {

  const pressHandler = () => {
    navigation.goBack();
  }
  const pressHandlernext = () => {
    navigation.navigate("Tasks");
  }
  return (
    <View style={globalStyles.title}>
      <Text style={globalStyles.title}>Point Targets!</Text>
      <Text style={globalStyles.content}>2 hours-20 points</Text>
      <Button title='Hit Me!' onPress={pressHandlernext} />
      <Text style={globalStyles.content}>4 hours-40 points</Text>
      <Button title='Hit Me!' onPress={pressHandlernext} />
      <Text style={globalStyles.content}>6 hours-60 points</Text>
      <Button title='Hit Me!' onPress={pressHandlernext} />
      <Button title='Log Out' onPress={pressHandler} />
    </View>
  );
}