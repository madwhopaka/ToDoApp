import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainPage from './components/MainPage';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { useEffect } from 'react';

const fetchFonts = async () =>
  Font.loadAsync({
    'raleway-regular': require('./assets/fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'raleway-medium-italic': require('./assets/fonts/Raleway-MediumItalic.ttf'),
    'raleway-bold-italic': require('./assets/fonts/Raleway-BoldItalic.ttf')

  });

export default function App() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function getFonts() {
      await fetchFonts();
      setFontsLoaded(true);
    }
    getFonts();
  }, [])
  if (fontsLoaded) {
    return (<View style={styles.container}>
      <MainPage />
      <StatusBar style="auto" />
    </View>)
  } else {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
}

