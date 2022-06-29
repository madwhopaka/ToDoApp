import { StyleSheet, Text, View, Image, ScrollView, Pressable, Modal, Button, } from 'react-native';


export default function Header({ numberOfTasks }) {

    const styles = StyleSheet.create({
        paddingLeft: {
            paddingLeft: 20,
        },
        flexRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerContainer: {
            flex: 3,
            paddingTop: 30,
            paddingHorizontal: 20,
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20,
        }
        ,
        header1: {
            fontSize: 24,
            fontFamily: 'raleway-bold',
        },

        avatar: {
            borderRadius: 15,
            height: 55,
            width: 55,
            // borderWidth: 2,
            // borderColor: 'skyblue',
        },
        subtitle: {
            color: 'grey',
            fontFamily: 'raleway-regular',
        },
    })
    return (
        <View style={[styles.headerContainer, styles.flexRow]}>
            <View style={[styles.paddingLeft]}>
                <Text style={styles.header1}>My Tasks</Text>
                <Text style={styles.subtitle}>{numberOfTasks > 0 ? numberOfTasks : 0} tasks for today</Text>
            </View>
            <Image style={styles.avatar} resizeMode="contain" source={require('../assets/avatar.jpg')} ></Image>
        </View>)
}
