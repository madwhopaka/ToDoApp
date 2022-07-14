import {
    StyleSheet, Text, View, Image, ScrollView, Pressable, Modal, Button, TextInput, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import * as Location from "expo-location"
import { useEffect, useState } from 'react';
import { getLastNotificationResponseAsync } from 'expo-notifications';

const API_KEY = '28a793730263fcfcab2c3990f804d29a';

export default function WeatherTab() {
    const styles = StyleSheet.create({
        Container: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingSpinner: {
            justifyContent: 'space-around',
            alignItems: 'center',
        }
    })
    const [location, setLocation] = useState({ city: '', dist: '', pincode: '' });
    const [weather, setWeather] = useState({
        main: '', desc: '', temp: '', icon: '', wind: ''
    });
    const fetchWeather = async (pincode) => {
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${pincode}&appid=${API_KEY}&units=metric`;
        try {
            const resp = await fetch(baseURL);
            if (resp.status == 200) {
                const data = await resp.json();
                console.log(JSON.parse(JSON.stringify(data)))
                const temp = JSON.stringify(data.main.temp);
                const main = JSON.parse(JSON.stringify(data.weather[0].main));
                const icon = JSON.parse(JSON.stringify(data.weather[0].icon));
                const wind = JSON.parse(JSON.stringify(data.wind.speed));
                const humidity = JSON.parse(JSON.stringify(data.main.humidity));

                setWeather({ temp: Number(temp).toFixed(1), humidity: humidity, main: main, wind: wind, icon: icon });
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permission not granted',
                    'Allow the app to use location service.',
                    [{ text: 'OK' }],
                    { cancelable: false }
                );
            }
            let { coords } = await Location.getCurrentPositionAsync();
            if (coords) {
                const { latitude, longitude } = coords;
                let response = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude
                });
                const city = response[0].city;
                const dist = response[0].district;
                setLocation({ city: city, dist: dist, pincode: response[0].postalCode });
                await fetchWeather(response[0].postalCode);
            }
        }
        getLocation();
    }, []);


    return (
        <View style={styles.Container}>
            {location.city === "" && weather.main === "" ? <View style={styles.loadingSpinner}><Text style={{ fontFamily: "raleway-medium", color: "#6b6b6b", fontSize: 17 }}>Fetching Data...</Text><Image style={{ height: 70, width: 70 }} source={require('../assets/storm.png')}></Image></View> :
                <View style={{ justifyContent: 'center', height: '100%', width: '100%', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: 60, width: 60, zIndex: 10, }} source={{ uri: `http://openweathermap.org/img/w/${weather.icon}.png` }}></Image>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', zIndex: 100, marginTop: -20 }}>
                        <Text style={{ fontFamily: 'raleway-bold', fontSize: 40, color: '#575757' }}>{weather.temp}°</Text>
                        <Text style={{ fontFamily: 'raleway-regular', fontSize: 15, color: '#575757' }}>{location.dist}</Text>
                        <Text style={{ fontFamily: 'raleway-regular', fontSize: 15, color: '#575757' }}>{location.city}</Text>
                    </View>

                </View >
            }
        </View >
    )
}
