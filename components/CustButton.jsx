import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableHighlight, Pressable, Button } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { LinearGradient } from 'expo-linear-gradient';



export default function ({ text, color, handleClick }) {
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
        <View style={styles.inputcontainer}>
            <TouchableOpacity onPress={handleClick} activeOpacity={0.6} style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 100,
                backgroundColor: color,
                borderRadius: 30,
            }}>
                <Text style={{ color: 'white', fontFamily: 'raleway-bold', fontSize: 16 }}>{text}</Text>
            </TouchableOpacity>
        </View>
    )
}
