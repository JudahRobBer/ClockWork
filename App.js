import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native"
import List from "./app/screens/List"
import Login from "./app/screens/Login"
import Details from "./app/screens/Details"
import PointsTarget from "./app/screens/PointsTarget"
import {FIREBASE_AUTH, FIRESTORE_DB} from "./firebaseConfig"
import {User, onAuthStateChanged} from "firebase/auth"
import {addDoc, collection, doc} from "firebase/firestore"


const Stack = createNativeStackNavigator();

const insideStack = createNativeStackNavigator();


function InsideLayout () {
  return (
    <insideStack.Navigator initialRouteName="PointsTarget">
      <insideStack.Screen name="PointsTarget" component={PointsTarget} option={{headerShown:false}} />
      <insideStack.Screen name = "Tasks" component={List}/>
      <insideStack.Screen name ="User Details" component = {Details}/>
      <insideStack.Screen name="Login" component={Login} option={{headerShown:false}}/>
    </insideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
    })
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName ='Login'>
        {user ? <Stack.Screen name="Inside" component = {InsideLayout} options={{headerShown: false}}/>
        : <Stack.Screen name="Login" component={Login} options={{headerLeft: () => null,}}/>}
        <insideStack.Screen name="PointsTarget" component={PointsTarget} option={{headerShown:false}}/>
        <insideStack.Screen name = "Todo List" component={List}/>
        <insideStack.Screen name = "Details" component={Details}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

