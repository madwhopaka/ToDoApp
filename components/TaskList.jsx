import { StyleSheet, Text, View, Image, FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native';
import { s } from '@react-native-community/hooks';
import { useSelector, useDispatch } from 'react-redux';
import { setModalOpen, setSelectedTask, setTaskList } from '../reduxGo/actions';
import { convertPm, dateFormating } from './util';



export default function TaskList() {
    const dispatch = useDispatch();
    const tasksList = useSelector(state => state.todoListReducer.taskList);
    const styles = StyleSheet.create({
        taskListContainer: {
            flex: 15,
            width: '100%',
            marginTop: 20,
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
    });


    return (
        <View style={styles.taskListContainer}>
            <ScrollView
                centerContent={true}
                indicatorStyle={'white'}
                style={{
                    width: '85%',
                }}
            >
                {tasksList.map((task) => {
                    return <TaskView item={task} dispatch={dispatch} key={task.key} />
                })}
            </ScrollView>
        </View>)
}


function TaskView({ item, dispatch }) {
    const styles = StyleSheet.create({
        task: {
            paddingLeft: 20,
            paddingRight: 10,
            fontSize: 19,
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
            paddingRight: 10,
            paddingLeft: 20,
            fontFamily: 'raleway-medium-italic',
            fontSize: 16,
        }

    })

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => { console.log(item); dispatch(setSelectedTask(item)); dispatch(setModalOpen('view')) }} key={item.key} style={{
            flex: 1,
            height: 100,
            padding: 10,
            marginVertical: 4,
            borderRadius: 10,
            backgroundColor: item.primary,
            justifyContent: 'flex-start',
        }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{
                        height: '90%',
                        backgroundColor: item.secondary,
                        width: 2,
                        borderRadius: 20,

                    }}>

                    </View>
                    <View style={{ paddingRight: 20 }}>
                        <Text numberOfLines={1} style={styles.task} >{item.title}</Text>
                        <Text numberOfLines={1} style={styles.desc}>{item.desc}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'raleway-bold', color: '#575757', fontSize: 13 }}>{dateFormating(item.date)}</Text>
                    <Text style={{ fontFamily: 'raleway-bold', color: '#575757', fontSize: 13 }}>{convertPm(item.time)}</Text>
                    <View style={{ marginTop: 7 }}>
                        {<Image source={item.alert === true ? require('../assets/noton.png') : require('../assets/notification.png')} style={{ height: 20, width: 20 }}></Image>}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}