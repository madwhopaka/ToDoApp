import React, { useState } from 'react'
import {
    StyleSheet, Text, View, Image, ScrollView, Pressable, Modal, Button, TextInput, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import TaskList from './TaskList';
import InputContainer from './CustButton';
import CustButton from './CustButton';
import PopupModal from './PopupModal';
import Header from './Header';
import ZeroTasks from './ZeroTasks';
import { colorArray } from './color-config';
import { LinearGradient } from 'expo-linear-gradient';

export default function MainPage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [tasklist, setTasklist] = useState([]);
    const [task, setTask] = useState({
        tasktitle: '',
        desc: ''
    })


    const handleListClick = () => {
        setEditModal(true);
    }
    const addTask = () => {
        if (task.tasktitle.trim() != "" && task.desc.trim() != "") {
            var randomIndex = Math.floor(Math.random() * colorArray.length);
            while (tasklist.length > 0 && colorArray[randomIndex].primary == tasklist[tasklist.length - 1].primary) {
                randomIndex = Math.floor(Math.random() * colorArray.length);
            }
            setTasklist([...tasklist, { title: task.tasktitle.trim(), desc: task.desc.trim(), key: tasklist.length + 1, primary: colorArray[randomIndex].primary, secondary: colorArray[randomIndex].secondary }]);
            setTask({ tasktitle: '', desc: '', });
            setModalVisible(false);
        }
        console.log(tasklist);

    }

    const handleClose = () => {
        setModalVisible(false);
    }
    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            justifyContent: 'space-around',
            width: useDimensions().window.width,
        },

    })
    return (
        <View style={styles.mainContainer}>
            <Header numberOfTasks={tasklist.length} />
            <LinearGradient colors={['#a770ef', '#cf8bf3', '#fdb99b']} start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                locations={[0, 0.2, 0.9]}
                style={{ flex: 5, width: '85%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center', borderRadius: 10, marginTop: 20, }}></LinearGradient>
            {tasklist.length == 0 ? <ZeroTasks /> : <TaskList tasklist={tasklist} />}
            <CustButton text={'Add Task'} handleClick={() => { setModalVisible(true) }} color={'dodgerblue'} setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <Modal
                transparent
                animationType='slide'
                visible={modalVisible}
            >
                <PopupModal modalVisible={modalVisible} addTask={addTask} task={task} setTask={setTask} setModalVisible={setModalVisible} handleClose={handleClose}></PopupModal>
            </Modal>
        </View>
    )
}

