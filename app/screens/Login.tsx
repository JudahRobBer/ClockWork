import React, {useEffect, useState} from 'react';
import { Image, View, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {FIREBASE_AUTH, FIRESTORE_DB} from "../../firebaseConfig";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth} from "firebase/auth"
import {doc, addDoc, collection,setDoc} from "firebase/firestore"
import { globalStyles } from '../../style/global';


export interface Task{
    title:string,
    duration: number,
    category:string,
    location: string,
    done: boolean,
    start_time: number,
    end_time: number
}

export interface Points{
    earned: number,
    goal: number
}

export interface Commitment{
    commitment: string,
    start_time: number,
    end_time: number
}

export interface Worktime{
    start_time: number,
    end_time: number
}



const Login = ({navigation}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async() => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth,email,password);
            navigation.navigate('PointsTarget')
        } catch (error) {
            alert("Login Failed" + error.message);
        } finally {
            setLoading(false)
        }
    }

    const signUp = async() => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth,email,password);
            
            const currentUser = getAuth().currentUser
            const userUID = currentUser.uid
            const collectionRef = collection(FIRESTORE_DB,"users")
            
            const addToDB = await setDoc(doc(collectionRef,userUID), 
                {
                pwd:password, 
                user:email, 
                tasks: [],
                goal_points: 0,
                current_points:0,
                commitments: [],
                worktime: [],
                });

            console.log("success")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }



    return (
        <View style={styles.container} >
            <KeyboardAvoidingView behavior ="padding">
                <View style= {styles.imageWrapper} >
                <Image source= {require("../../assets/logo.png")} style={{height:180,width:180}} />
                </View>
                <TextInput value = {email}style = {styles.input} placeholder = "Email" autoCapitalize="none"
                onChangeText= {(text) => setEmail(text)}></TextInput>
                <TextInput value = {password} style = {styles.input} placeholder = "Password" autoCapitalize="none"
                secureTextEntry = {true} onChangeText= {(text) => setPassword(text)}></TextInput>

                {loading ? <ActivityIndicator size="large" color = "#0000ff" />
                : 
                <>
                    <Button title="Login" onPress = {() => signIn()} />
                    <Button title="Create Account" onPress = {() => signUp()} />
                </>}
            </KeyboardAvoidingView>
            </View>
    );
};

export default Login;



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex:1,
        justifyContent: "center",
        backgroundColor:"#dadada",
    },
    imageWrapper : {
        marginTop: -50,
        justifyContent: "center",
    },
    input: {
        marginVertical: 20,
        height: 50,
  
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff"
    }
});