import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/tasksSlice';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import DatePicker from 'react-native-date-picker'

const AddTaskScreen = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [open, setDatePickerOpen] = useState(false)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [location, setLocation] = useState('');

    const handleAddTask = () => {
        dispatch(
            addTask({
                id: uuid(),
                title,
                description,
                dateTime,
                location,
                status: 'Pending',
            })
        );
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <DatePicker
                modal
                open={open}
                date={
                    dateTime === '' ?
                        new Date()
                        : new Date(Date.parse(dateTime))
                    }
                onConfirm={(date) => {
                    setDatePickerOpen(false)
                    setDateTime(date.toString())
                }}
                onCancel={() => {
                    setDatePickerOpen(false) 
                }}
            />
            <TextInput placeholderTextColor={'black'} style={styles.input} placeholder="Title" value={title} onChangeText={setTitle} />
            <TextInput placeholderTextColor={'black'} style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
            <TextInput placeholderTextColor={'black'} style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
            <View style={{ marginBottom: 10, padding: 8 }}>
            <Text>{dateTime===''?"Date not set":"Date: "+dateTime}</Text>
                <Button title="Set Date & Time" onPress={() => { setDatePickerOpen(true) }} />
            </View>
            <View style={{ marginBottom: 10, padding: 8 }}>
                <Button title="Add Task" onPress={handleAddTask} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { color: 'black', marginBottom: 10, borderWidth: 1, padding: 8, borderRadius: 5 },
});

export default AddTaskScreen;

