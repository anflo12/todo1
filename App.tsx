import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, SafeAreaView, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MainNavigation} from './src/navigation/MainNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  LogBox.ignoreLogs(["Animated: `useNativeDriver`"])
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{...backgroundStyle, flex: 1}}>
        <NavigationContainer>
          <MainNavigation />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
