import React, { useState } from 'react'
import {
    StyleSheet, Text, View, Image, ScrollView, Pressable, Modal, Button, TextInput, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import TaskList from './TaskList';
import CustButton from './CustButton';
import PopupModal from './PopupModal';
import Header from './Header';
import ZeroTasks from './ZeroTasks';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOpen } from '../reduxGo/actions';
import { ActivityIndicator } from 'react-native';
import WeatherTab from './WeatherTab';


export default function MainPage() {
    const dispatch = useDispatch();
    const tasksList = useSelector(state => state.todoListReducer.taskList);
    const modalOpen = useSelector(state => state.todoListReducer.modalOpen);
    const [modalVisible, setModalVisible] = useState(false);



    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            justifyContent: 'space-around',
            width: useDimensions().window.width,
            alignItems: 'center',
        },

    })
    return (
        <View style={styles.mainContainer}>
            <Header numberOfTasks={tasksList.length} />
            <LinearGradient colors={['#a4aadc', '#b1f5e4']} start={{ x: 0, y: 0.4 }}
                end={{ x: 2, y: 0 }}
                locations={[0.1, 0.3]}
                style={{
                    flex: 5, width: '85%', justifyContent: 'center',
                    borderRadius: 10,
                    alignItems: 'center',
                    backgroundColor: '#f3f0f0',
                    marginHorizontal: 4,
                    marginVertical: 6
                }}>
                <WeatherTab></WeatherTab>
            </LinearGradient>
            {tasksList.length == 0 ? <ZeroTasks /> : <TaskList />}
            <View style={{ flex: 2 }}><CustButton text={'Add Task'} colors={['#63a4ff', '#83eaf1']} handleClick={() => dispatch(setModalOpen('new'))} color={'dodgerblue'} setModalVisible={setModalVisible} modalVisible={modalVisible} /></View>
            <Modal
                transparent
                animationType='slide'
                visible={modalOpen !== ''}
            >
                <PopupModal ></PopupModal>
            </Modal>
        </View>
    )
}