import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TaskListScreen from './TaskListScreen';
import AddTaskScreen from './AddTaskScreen';
import EditTaskScreen from './EditTaskScreen';

const Stack = createStackNavigator();

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'My Tasks' }} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
            <Stack.Screen name="EditTask" component={EditTaskScreen} options={{ title: 'Manage Task' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;