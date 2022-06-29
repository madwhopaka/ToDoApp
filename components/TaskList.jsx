import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { colorArray } from './color-config';


export default function TaskList({ tasklist, handleListClick }) {


    const styles = StyleSheet.create({
        taskListContainer: {
            flex: 15,
            marginTop: 30,
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    return (
        <View style={styles.taskListContainer}>
            <FlatList style={{
                width: '85%',
            }}
                data={tasklist}
                renderItem={item => TaskView(item)}
            >

            </FlatList>
        </View>)
}


function TaskView({ item }) {
    const styles = StyleSheet.create({
        taskListContainer: {
            flex: 15,
            marginTop: 30,
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        task: {
            paddingLeft: 20,
            paddingRight: 20,
            fontSize: 22,
            fontFamily: 'raleway-bold',
            color: '#575757',
            borderRadius: 10,
        }
        ,
        taskView: {
            flex: 1,
            height: 100,
            marginVertical: 4,
            borderRadius: 10,
            justifyContent: 'flex-start',
        },

        desc: {
            color: '#737171',
            paddingRight: 60,
            paddingLeft: 20,
            fontFamily: 'raleway-medium-italic',
            fontSize: 17,
        }
    })
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => console.log(item.key)} key={item.key} style={{
            flex: 1,
            height: 100,
            padding: 10,
            marginVertical: 4,
            borderRadius: 10,
            backgroundColor: item.primary,
            justifyContent: 'flex-start',
        }}>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={{
                    height: '90%',
                    backgroundColor: item.secondary,
                    width: 2,
                    borderRadius: 20,

                }}>

                </View>
                <View><Text numberOfLines={1} style={styles.task} >{item.title}</Text>
                    <Text numberOfLines={1} style={styles.desc}>{item.desc}</Text></View>
            </View>
        </TouchableOpacity>
    )
}