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
    const [category,setCategory] = useState("");
    const [duration, setDuration] = useState(null);


    //The user authentication is linked to the database with UID
    const currentUserUID = getAuth().currentUser.uid;
    const docRef = doc(FIRESTORE_DB,"users",currentUserUID);
    
    
    
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

        const deleteItem = async() => {
            deleteDoc(doc(FIRESTORE_DB,"todos",item.id));
        };
       

        return (
            

            <View style={styles.todoContainer}>
                <Text style={styles.titleText}>{item.title} </Text>
                <Text style={styles.todoText} >{item.category}</Text>
                <Text style={styles.todoText}>{item.duration}</Text>
                <Ionicons name="trash-bin-outline" size = {24} color = "red" allign= "right" onPress={deleteItem}/>
            </View>
        );
    }

   

    //get the existing array of tasks
    //add the next item to the array
    //replace the array in the document 
    const addTask= async() => {
        const docRef = doc(FIRESTORE_DB, "users", getAuth().currentUser.uid);
        const taskCopy = todos
        taskCopy.push({title:todo,
            done:false,
            category:category,
            start_time: 0o0,
            end_time: 0o0,
            duration: duration
            })
        await updateDoc(docRef, {
            tasks: taskCopy,
        })
        setTodo(""),
        setCategory("")
        setDuration("")
        ;

    }
    
    return (
        <View style= {styles.container}>
            <View style = {styles.form}>
                <TextInput style = {styles.input} placeholder = "Task"  textAlign = "center" // copy buttons for more options
                onChangeText = {(text) => setTodo(text)} value = {todo}/>

                <TextInput style = {styles.input} placeholder = "Category" textAlign = "center"
                onChangeText = {(text) => setCategory(text)} value = {category}/>

                <TextInput style = {styles.input} placeholder = "Duration"  textAlign = "center"
                onChangeText = {(number) => setDuration(number)} value = {duration}/>
                <View>
                    <Button  onPress = {addTask} title="Enter Task" disabled={todo === ""}/>
                </View>
            </View>
            {todos.length > 0 && (
            
            <><View style={styles.todoContainer}>
                    <Text style={styles.titleText}>Title </Text>
                    <Text style={styles.titleText}>Category </Text>
                    <Text style={styles.titleText}>Duration </Text>
                </View><View>
                        <FlatList
                            data={todos}
                            renderItem={renderTodo}
                            keyExtractor={(todo: Todo) => todo.id} />
                    </View></>
            )}
            <Button onPress={() => navigation.navigate('Details')}title="Open Details" />
            <Button onPress={() => navigation.navigate('Commitments')} title="Commitments"/>
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
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor:"#fff",
        marginVertical: 2,
        marginHorizontal: 5,
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#fff",
        padding:10,
        marginVertical: 4,


    },

    titleText: {
        flex: 1,
        paddingHorizontal:4,
        fontSize:15,

    },


    todoText: {
        flex: 1,
        paddingHorizontal:4,
        fontSize:15,
        marginLeft: 24,
        
        

    },
    todo: {
        flex: 1,
        flexDirection: 'row',
        fontFamily: "Optima",
        alignItems: 'center',
    }

})