import React, {useEffect, useState} from 'react';
import { Text, View, Button, StyleSheet, TextInput, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import {FIREBASE_AUTH} from "../../firebaseConfig";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading,setLoading] = useState(false);
    const auth = FIREBASE_AUTH;


    const signIn = async() => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth,email,password);
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
            console.log("success")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior ="padding">
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
        marginHorizontal: 20,
        flex:1,
        justifyContent: "center",
    },
    input: {
        marginVertical: 10,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff"
    }
});