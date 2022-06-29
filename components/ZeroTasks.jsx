import {
    StyleSheet, Text, View, Image, ScrollView, Pressable, Modal, Button, TextInput, KeyboardAvoidingView, TouchableOpacity
} from 'react-native';

export default function ZeroTasks() {
    return (
        <View style={{
            flex: 15,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image style={{ height: 180, width: 180 }} source={require('../assets/empty_list.png')}></Image>
            <Text style={{ fontSize: 20, fontFamily: 'raleway-bold-italic', fontWeight: '500', color: 'grey' }}> You don't have any tasks now.</Text>
        </View>
    )
}
