import { useEffect, useState, useRef } from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, Pressable, Modal, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, Switch
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import CustButton from './CustButton';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOpen, setTaskList, seelc } from '../reduxGo/actions';
import { colorArray } from './color-config';
import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import storage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import moment from 'moment';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
});

export default function PopupModal() {
    const dispatch = useDispatch();
    const tasksList = useSelector(state => state.todoListReducer.taskList);
    const modalOpen = useSelector(state => state.todoListReducer.modalOpen);
    const selectedTask = useSelector(state => state.todoListReducer.selectedTask);
    const [showdt, setShowDt] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [invalid, setInvalid] = useState(false);
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [task, setTask] = useState({
        tasktitle: '',
        desc: '',
        date: '',
        time: '',
    });
    const [alert, setAlert] = useState(true);

    useEffect(() => {
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => { });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    const addTask = async () => {
        if (task.tasktitle.trim() !== "" && task.desc.trim() !== "" && task.date !== '' && task.time !== '') {
            const now = new Date();
            const momentNow = moment();
            const nowdate = `${now.getDate() < 10 ? '0' : ''}` + now.getDate() + '/' + `${now.getDate() < 10 ? '0' : ''}` + now.getMonth() + 1 + '/' + now.getFullYear();
            if (moment(moment(task.date, 'DD-MM-YYYY')).isSame(moment(nowdate, 'DD-MM-YYYY')) && momentNow.isAfter(moment(task.time, 'HH:mm'))) {
                setInvalid(true);
                setTimeout(() => {
                    setInvalid(false);
                }, 3000);
                return;
            }
            var randomIndex = Math.floor(Math.random() * colorArray.length);
            while (tasksList.length > 0 && colorArray[randomIndex].primary == tasksList[tasksList.length - 1].primary) {
                randomIndex = Math.floor(Math.random() * colorArray.length);
            }
            dispatch(setTaskList([...tasksList, { title: task.tasktitle.trim(), desc: task.desc.trim(), key: tasksList.length + 1, primary: colorArray[randomIndex].primary, secondary: colorArray[randomIndex].secondary, time: task.time, date: task.date, alert: alert }]));
            if (moment(moment(task.date, 'DD-MM-YYYY')).isSame(moment(nowdate, 'DD-MM-YYYY'))) {
                const endTime = moment(task.time, "HH:mm");
                const startTime = moment(now, "HH:mm");
                console.log(startTime, endTime);
                const duration = moment.duration(endTime.diff(startTime));
                const hours = parseInt(duration.asHours());
                const minutes = parseInt(duration.asMinutes()) % 60;
                const seconds = parseInt(duration.asSeconds()) % 60;
                console.log(hours, minutes);
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: task.tasktitle.trim(),
                        body: task.desc.trim(),
                        data: { data: task }
                    },
                    trigger: {
                        seconds: hours * 3600 + minutes * 60 + seconds
                    }
                });
            }
            setTask({ tasktitle: '', desc: '', date: '', time: '' });
            dispatch(setModalOpen(''));
        }

    }


    const handleDateTimeChange = (newValue) => {
        setShowDt('');
        if (showdt === 'date') {
            setDate(newValue);
            const formatedDate = `${newValue.getDate() < 10 ? '0' : ''}` + newValue.getDate() + '/' + `${newValue.getDate() < 10 ? '0' : ''}` + ((newValue.getMonth() + 1) < 10 ? '0' + (newValue.getMonth() + 1) : '' + (newValue.getMonth() + 1)) + '/' + newValue.getFullYear();
            setTask({ ...task, date: formatedDate });

        }
        else if (showdt === 'time') {
            setTime(newValue);
            const formattedTime = `${newValue.getHours() < 10 ? '0' : ''}` + newValue.getHours() + ':' + `${newValue.getMinutes() < 10 ? '0' : ''}` + newValue.getMinutes();
            setTask({ ...task, time: formattedTime });


        }

    }

    const handleClose = () => {
        dispatch(setModalOpen(''));
    }

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            width: useDimensions().window.width,
            backgroundColor: 'rgba(0, 0, 0,0.5) ',
            alignItems: 'center',
            justifyContent: 'center',
        }
        ,
        modalView: {
            height: 600,
            padding: modalOpen === 'view' ? 40 : 60,
            width: '90%',
            shadowOffset: { width: 1, height: 1 },
            shadowColor: '#333',
            shadowOpacity: 0.3,
            backgroundColor: 'whitesmoke',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 15,
        },
        closeIconView: {
            position: 'absolute',
            right: 20,
            padding: 5,
            top: 15,
        },
        closeIcon: {
            height: 15,
            width: 15,
        },
        inputBoxes: {
            paddingVertical: 10,
        }
        ,
        labels: {
            fontFamily: 'raleway-bold',
            fontSize: 15,
            color: '#5b5959eb',
        },
        dtContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
        },

        dtSubContainer: {
            flexDirection: 'row',
            width: 140,
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 15,
            backgroundColor: '#ededed',
            borderRadius: 15,
        },
        dt: {
            fontFamily: 'raleway-medium',
            fontSize: 15,
        },
        dtIcon: {
            height: 20,
            width: 20,
        },
        toggleContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    })
    return (


        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TouchableOpacity onPress={() => { handleClose() }} style={styles.closeIconView}><Image style={styles.closeIcon} source={require('../assets/clear.png')}></Image></TouchableOpacity>
                {modalOpen === 'new' || modalOpen === 'edit' ? <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', }}><Text style={{ fontSize: 22, fontFamily: 'raleway-bold', color: '#5b5959eb' }}>Create a new Task</Text></View> : <View></View>}
                {modalOpen === 'new' || modalOpen === 'edit' ? <KeyboardAvoidingView enabled={true} style={{
                    paddingVertical: 10,
                }}>
                    <View style={styles.inputBoxes}>
                        <Text style={styles.labels}>Task Title</Text>
                        <TextInput spellCheck={true} selectionColor={'dodgerblue'} onChangeText={(text) => { setTask({ ...task, tasktitle: text }); }} placeholder='Start here...' style={{ width: 300, fontSize: 17, marginVertical: 5, borderRadius: 10, backgroundColor: '#ededed', padding: 10, color: '#575757', fontFamily: 'raleway-medium' }}>
                        </TextInput></View>
                    <View style={styles.inputBoxes}>
                        <Text style={styles.labels}>Description</Text>
                        <TextInput onChangeText={(text) => { setTask({ ...task, desc: text }); }} multiline textAlignVertical='top' numberOfLines={2} placeholder='Go to the groceries at 12pm and withdraw money from the atm. ' style={{ fontFamily: 'raleway-medium', width: 300, fontSize: 17, padding: 10, borderRadius: 10, backgroundColor: '#ededed', marginVertical: 5, color: '#575757', fontWeight: '400' }}>
                        </TextInput>
                    </View>
                    <View style={styles.inputBoxes}>
                        <Text style={styles.labels}>Choose Date & Time</Text>
                        <View style={styles.dtContainer}>
                            <TouchableOpacity onPress={() => { setShowDt('date'); }} style={styles.dtSubContainer}><Image style={styles.dtIcon} source={task.date === '' ? require('../assets/calendar.png') : require('../assets/pen.png')}></Image><Text style={styles.dt}>{task.date === '' ? 'Select Date' : task.date}</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => { setShowDt('time'); }} style={styles.dtSubContainer}><Image style={styles.dtIcon} source={task.time === '' ? require('../assets/clock.png') : require('../assets/pen.png')}></Image><Text style={styles.dt}>{task.time === '' ? 'Select Time' : task.time}</Text></TouchableOpacity>
                        </View>
                        {invalid && <Text style={{ color: 'red', fontFamily: 'raleway-regular' }} >*Invalid Date or Time</Text>}
                    </View>
                    <View style={{ paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[styles.labels]}>Get alert for this task</Text><Switch thumbColor={alert ? "#f5644b" : "#f4f3f4"} trackColor={{ false: "#767577", true: "#f28181" }} value={alert} onValueChange={() => setAlert(!alert)}></Switch>
                    </View>
                    <View></View>
                </KeyboardAvoidingView> : <ViewMode />}
                {showdt !== '' && <DateTimePicker
                    value={showdt === 'date' ? date : time}
                    minimumDate={Date.parse(new Date())}
                    display='default'
                    mode={showdt}
                    onChange={(event, changedValue) => handleDateTimeChange(changedValue)}
                />}
                {modalOpen === 'new' || modalOpen === 'edit' ? <View style={{ marginTop: 25 }}><CustButton colors={['#ee8c68', '#eb6b9d']} padding={false} handleClick={addTask} task={task} text={'Create'} /></View> : <View></View>}

            </View >
        </View >
    )
}

function ViewMode() {
    const selectedTask = useSelector(state => state.todoListReducer.selectedTask);
    const styles = StyleSheet.create({
        task: {
            fontSize: 30,
            fontFamily: 'raleway-bold',
            color: '#575757',
            borderRadius: 10,
        },

        tasksub: {
            fontSize: 15,
            fontFamily: 'raleway-medium'
        },
        desc: {
            color: '#363636',
            fontFamily: 'raleway-medium',
            fontSize: 20,
        }
        ,
        propContainer: {
            marginVertical: 10,
            justifyContent: 'center',

        },
        dtContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
        },

        dtSubContainer: {
            flexDirection: 'row',
            width: 130,
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 15,
            backgroundColor: '#ededed',
            borderRadius: 15,
        },
        dt: {
            fontFamily: 'raleway-medium',
            fontSize: 15,
        },
        dtIcon: {
            height: 20,
            width: 20,
        },
    })
    return (
        <View style={{ flex: 1, width: '100%' }}>
            <View style={styles.propContainer}>
                <Text style={styles.tasksub}>Title</Text>
                <Text style={styles.task}>{selectedTask.title}</Text>
            </View>
            <View style={styles.propContainer}>
                <Text style={styles.tasksub}>Description</Text>
                <Text style={styles.desc}>{selectedTask.desc} We are going to do the best place in India and going to the hottest place in indiallsdo sisodioweiwoifsoidfoeiwoiweoiwowiwoewiowiewoi</Text>
            </View>
            <View style={styles.propContainer}>
                <Text style={styles.tasksub}>Date & Time</Text>
                <View style={styles.dtContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={styles.dtSubContainer}><Image style={styles.dtIcon} source={require('../assets/calendar.png')}></Image><Text style={styles.dt}>{selectedTask.date}</Text></TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.dtSubContainer}><Image style={styles.dtIcon} source={require('../assets/clock.png')}></Image><Text style={styles.dt}>{selectedTask.time}</Text></TouchableOpacity>
                </View>
                <View style={[styles.propContainer]}>
                    <Text style={styles.tasksub} >Alert</Text>
                    <Image style={{ height: 35, width: 35 }} source={selectedTask.alert === true ? require('../assets/noton.png') : require('../assets/notification.png')}></Image>
                    <Text style={styles.desc}>{selectedTask.alert === true ? 'On' : 'Off'}</Text>
                </View>
            </View>
        </View >
    )
}
