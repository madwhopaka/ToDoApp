import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MainPage from './components/MainPage';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Store, persistor } from './reduxGo/store';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import storage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { setLocation } from './reduxGo/actions';

const fetchFonts = async () =>
  Font.loadAsync({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'raleway-medium-italic': require('./assets/fonts/Raleway-MediumItalic.ttf'),
    'raleway-bold-italic': require('./assets/fonts/Raleway-BoldItalic.ttf')

  });




// Location subscription in the global scope
let locationSubscrition = null

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  useEffect(() => {
    async function getPermission() {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Enable push notifications to use the app!');
          await storage.setItem('expopushtoken', "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    }
    getPermission();

  }, []);



  useEffect(() => {
    async function getFonts() {
      await fetchFonts();
      setFontsLoaded(true);
    }
    getFonts();

  }, [])
  if (fontsLoaded) {
    return (<Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}><View style={styles.container}>
        <MainPage />
        <StatusBar style="auto" />
      </View></PersistGate>
    </Provider>)
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}
