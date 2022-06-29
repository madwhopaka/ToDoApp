import { useState } from 'react';
import {
    StyleSheet, Text, View, Image, ScrollView, Pressable, Modal, Button, TextInput, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import CustButton from './CustButton';

export default function PopupModal({ handleClose, addTask, task, setTask }) {

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
            padding: 60,
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
            fontSize: 18,
            color: 'tomato',
        },
    })
    return (


        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <TouchableOpacity onPress={() => { handleClose() }} style={styles.closeIconView}><Image style={styles.closeIcon} source={require('../assets/clear.png')}></Image></TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 20, }}><Text style={{ fontSize: 22, fontFamily: 'raleway-bold', color: 'tomato' }}>Create New Task</Text></View>
                <KeyboardAvoidingView enabled={true} style={{
                    paddingVertical: 40,
                }}>
                    <View style={styles.inputBoxes}>
                        <Text style={styles.labels}>Task Title</Text>
                        <TextInput spellCheck={true} selectionColor={'dodgerblue'} onChangeText={(text) => { setTask({ ...task, tasktitle: text }); }} placeholder='Start here...' style={{ width: 300, fontSize: 19, marginVertical: 5, color: '#575757', fontFamily: 'raleway-medium-italic' }}>
                        </TextInput></View>
                    <View style={styles.inputBoxes}>
                        <Text style={styles.labels}>Description</Text>
                        <TextInput onChangeText={(text) => { setTask({ ...task, desc: text }); }} multiline textAlignVertical='top' numberOfLines={5} placeholder='Go to the groceries at 12pm and withdraw money from the atm. ' style={{ fontFamily: 'raleway-medium-italic', width: 300, fontSize: 19, marginVertical: 5, color: '#575757', fontWeight: '400' }}>
                        </TextInput>
                    </View>
                </KeyboardAvoidingView>
                <CustButton colors={['#ee8c68', '#eb6b9d']} handleClick={addTask} task={task} text={'Create'} />
            </View >
        </View >
    )
}