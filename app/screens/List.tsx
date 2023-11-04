import React, {useEffect, useState} from 'react';
import { Text, View, Button, StyleSheet, TextInput, FlatList, TouchableOpacity} from 'react-native';
import {FIRESTORE_DB, FIREBASE_AUTH} from "../../firebaseConfig";
import {signOut, getAuth} from "firebase/auth"
import {addDoc, collection, onSnapshot, doc, updateDoc, deleteDoc, getDoc} from "firebase/firestore"
import {Entypo} from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";


//data model?
export interface Todo {
    title:string;
    done: boolean;
    id:string
}

export interface Task {
    title:string;
    category: string;
    duration: number;
}

const List = ({navigation}) => {
    //mutate and acces list data
    const [todos,setTodos] = useState([]);
    const [todo,setTodo] = useState("");


    //The user authentication is linked to the database with UID
    const currentUserUID = getAuth().currentUser.uid;
    const docRef = doc(FIRESTORE_DB,"users",currentUserUID);
    
    //triggered on updates
    //get all of the task data from the user document
    /*
    useEffect(() => {
       const todoRef = collection(FIRESTORE_DB,"todos");
       const subscriber = onSnapshot(todoRef,{
        next: (snapshot)=> {
            const todos = [];
            snapshot.docs.forEach((doc) => {
                todos.push({
                    id: doc.id,
                    ...doc.data(),
                } as Todo);
            });
            setTodos(todos);
        },
       });
       return () => subscriber();
    },[]);
    */
    
    useEffect(() => {
        getUserTasks()
    },[]);
    
    const getUserTasks = ()=> {
        const docRef = doc(FIRESTORE_DB, "users", getAuth().currentUser.uid);
        getDoc(docRef).then((docsnap) => {
            if (docsnap.exists()) {
                const taskArray = []
                const tasks = docsnap.get("tasks")
                tasks.forEach((task) => {
                    taskArray.push(task)
                })

                
                console.log("Task Data",tasks)
                setTodos(taskArray)
            } else  {
                console.log("Tasks not found")
            }
        })
        
    }

    


    const renderTodo = ({item}) => {
        
        const toggleDone = async() => {
            await updateDoc(doc(FIRESTORE_DB,'todos',item.id), 
            {done: !item.done});
            
        };

        const deleteItem = async() => {
            deleteDoc(doc(FIRESTORE_DB,"todos",item.id));
        };
        
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress ={toggleDone} style = {styles.todo}>
                    {item.done && <Ionicons name="md-checkmark-circle"/>}
                    {!item.done && <Entypo name ="circle" size={24} color = "black"/>}       
                
                    <Text style={styles.todoText}>{item.title}</Text>
                </TouchableOpacity>
                <Ionicons name="trash-bin-outline" size = {24} color = "red" onPress={deleteItem}/>

            </View>
        );
    }

    const addTodo = async () => {
        const doc = await addDoc(collection(FIRESTORE_DB,'todos'), {title:todo, done:false});
        console.log("file add_todo:",doc);
        setTodo("");
    };

    //get the existing array of tasks
    //add the next item to the array
    //replace the array in the document 
    const addTask= async() => {
        const docRef = doc(FIRESTORE_DB, "users", getAuth().currentUser.uid);
        getUserTasks()
        const taskCopy = todos
        taskCopy.push({title:todo, done:false})
        await updateDoc(docRef, {
            tasks: taskCopy
        })
        setTodo("");
    }
    
    return (
        <View style= {styles.container}>
            <View style = {styles.form}>
                <TextInput style = {styles.input} placeholder = "Add Todo"
                onChangeText = {(text) => setTodo(text)} value = {todo}/>
                <Button onPress = {addTask} title="Add Todo" disabled={todo === ""}/>
            </View>
            {todos.length > 0 && (
            <View>
                <FlatList 
                data = {todos} 
                renderItem={renderTodo}
                keyExtractor={(todo:Todo) => todo.id}/>
            </View>
            )}
            <Button onPress={() => navigation.navigate('Details')} title="Open Details"/>
            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout"/>
        </View>
    );
}

export default List

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        marginVertical: 20,
        flexDirection:'row',  
        alignItems: "center",      
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor:"#fff",
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding:10,
        marginVertical: 4,


    },
    todoText: {
        flex: 1,
        paddingHorizontal:4,

    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }

})
