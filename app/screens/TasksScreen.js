import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function ToDoInputScreen() {
  const navigation = useNavigation();
  const [task, setTask] = useState('');
  const [duration, setDuration] = useState('');

  const handleSaveToDo = () => {
    // You can implement logic to save the to-do task and its duration here.
    // For simplicity, we'll just print the task and duration to the console.
    console.log(`Task: ${task}, Duration: ${duration}`);

    // After saving, you can navigate back to the previous screen.
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Task:</Text>
      <TextInput
        placeholder="Enter your task"
        value={task}
        onChangeText={(text) => setTask(text)}
      />

      <Text>Duration (in minutes):</Text>
      <TextInput
        placeholder="Enter duration"
        value={duration}
        onChangeText={(text) => setDuration(text)}
        keyboardType="numeric" // Ensure only numeric input
      />

      <Button title="Save" onPress={handleSaveToDo} />
    </View>
  );
}

export default ToDoInputScreen;
