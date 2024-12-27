import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, Pressable, View, Button, Alert, Modal, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons/faListCheck'
import { faSort } from '@fortawesome/free-solid-svg-icons/faSort'
import { faClock } from '@fortawesome/free-solid-svg-icons/faClock'
import { faSquare } from '@fortawesome/free-solid-svg-icons/faSquare'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { styles } from '../styles/styles'

const TaskListScreen = ({ navigation }: any) => {
    const tasks = useSelector((state: RootState) => state.tasks.list);
    const [displayedTasks, setDisplayedTasks] = useState(tasks);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setDisplayedTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => { setModalVisible(true) }}>
                    <FontAwesomeIcon icon={faSort} style={{ margin: 20 }} size={30} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending':
                return '#aaaaaa';
            case 'In Progress':
                return '#aaaa55';
            case 'Completed':
                return '#55aa55';
            case 'Cancelled':
                return 'black';
        }
    }

    const sortByDate = () => {
        const sortedTasks = [...displayedTasks].sort((a, b) => {
            const dateA = a.dateTime ? new Date(a.dateTime).getTime() : Infinity; // Empty dateTime => treated as far past
            const dateB = b.dateTime ? new Date(b.dateTime).getTime() : Infinity;
            return dateA - dateB;
        });
        setDisplayedTasks(sortedTasks);
        setModalVisible(false);
    };

    const sortByStatus = () => {
        const statusPriority: { [key: string]: number } = {
            'Pending': 1,
            'In Progress': 2,
            'Completed': 3,
            'Cancelled': 4,
        };
        const sortedTasks = [...displayedTasks].sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);
        setDisplayedTasks(sortedTasks);
        setModalVisible(false); // Close the modal
    };

    const renderItem = ({ item }: any) => (

        <TouchableOpacity
            style={{ padding: 10, borderBottomWidth: 1 }}
            onPress={() => navigation.navigate('EditTask', { task: item })}
        >
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <FontAwesomeIcon style={{ margin: 6 }} icon={item.status === 'Completed' ? faSquareCheck : faSquare} />
                <Text style={{ margin: 3, fontSize: 18 }}>{item.title}</Text>
            </View>

            <View>
                <Text>{item.description}</Text>
                <Text>{item.dateTime}</Text>
                <Text style={{
                    fontStyle: 'italic',
                    color: getStatusColor(item.status)
                }}>{item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    const SortModal = ({ item }: any) => (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <Pressable
                style={StyleSheet.absoluteFill}
                onPress={() => { setModalVisible(false) }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            style={[styles.button, styles.button]}
                            onPress={() => sortByDate()}>
                            <Text style={styles.textStyle}>Sort by date</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.button]}
                            onPress={() => sortByStatus()}>
                            <Text style={styles.textStyle}>Sort by status</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={displayedTasks} keyExtractor={(item) => item.id} renderItem={renderItem} />
            <Button title="Add Task" onPress={() => navigation.navigate('AddTask')} />
            <SortModal />
        </View>
    );
};

export default TaskListScreen;