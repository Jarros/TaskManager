
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addTask, updateTaskStatus, deleteTask } from '../store/tasksSlice';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

const EditTaskScreen = ({ navigation, route }: any) => {
  const { task } = route.params;
  const tasks = useSelector((state: RootState) => state.tasks.list);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dateTime, setDateTime] = useState(task.dateTime);
  const [location, setLocation] = useState(task.location);
  const [status, setStatus] = useState(task.status);

  useEffect(() => {
    //Alert.alert("task:"+task);
  }, []);

  const handleEditTask = (newStatus: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled') => {
    dispatch(
      updateTaskStatus({
        id: task.id,
        status: newStatus,
      })
    );
    navigation.goBack();
  };

  const handleDeleteTask = () => {
    dispatch(
      deleteTask(task.id)
    );
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.input}>{"Title"}</Text>
        <Text style={styles.input2}>{title}</Text>
        <Text style={styles.input}>{"Description"}</Text>
        <Text style={styles.input2}>{description}</Text>
        <Text style={styles.input}>{"Date & Time"}</Text>
        <Text style={styles.input2}>{dateTime}</Text>
        <Text style={styles.input}>{"Location"}</Text>
        <Text style={styles.input2}>{location}</Text>
        <Text style={styles.input}>{"Status"}</Text>
        <Text style={styles.input2}>{status}</Text>
      </View>
      <View style={{ padding: 10 }}>
        <View style={{}}>
          <Button color='#aaddaa' title="Mark as Completed" onPress={()=>{handleEditTask("Completed")}} />
        </View>
        <View style={{}}>
          <Button color='#ddddaa' title="Mark as In Progress" onPress={()=>{handleEditTask("In Progress")}} />
        </View>
        <View style={{}}>
          <Button color='#aaaaaa' title="Mark as Cancelled" onPress={()=>{handleEditTask("Cancelled")}} />
        </View>
        <View style={{}}>
          <Button color='#555555' title="Delete task" onPress={handleDeleteTask} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 0, fontStyle: 'italic', padding: 0, color: 'rgba(0.0,0.0,0.0,0.4)' },
  input2: { marginLeft:20, marginBottom: 10, padding: 8 },
});

export default EditTaskScreen;