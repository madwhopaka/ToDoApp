import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableHighlight, Pressable, Button } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';



export default function ({ padding = true, text, colors, handleClick }) {
    const styles = StyleSheet.create({
        inputcontainer: {
            height: '10%',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },

        input: {
            height: 60,
            borderWidth: 2,
            borderColor: 'grey',
            paddingHorizontal: 20,
            fontSize: 16,
            width: useDimensions().window.width / 1.5,
            borderRadius: 40,
        },

        addIcon: {
            height: 60,
            width: 60,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
    })
    return (
        <TouchableOpacity onPress={handleClick} activeOpacity={0.6}>
            <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} locations={colors.length == 2 ? [0.1, 0.8] : [0, 0.3, 0.9]} style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 100,
                borderRadius: 25,
                marginTop: -30,
            }}><Text style={{ color: 'white', fontFamily: 'raleway-bold', fontSize: 16 }}>{text}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}