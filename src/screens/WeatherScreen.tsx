import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import {WeatherResponse} from '../interfaces/WeatherResponse';
import {api} from '../utils/api';

export default function WeatherScreen() {
  const [weather, setWeather] = useState<WeatherResponse | undefined>();
  useEffect(() => {
    const loadWeather = async () => {
      let result = api.get<WeatherResponse>(
        'http://api.weatherstack.com/current?access_key=ef2073bf3b7b96532da10239b5ec70cc&query=Cali',
      );
      return result;
    };
    Promise.all([loadWeather()]).then(result => setWeather(result[0]));
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={{uri: weather?.current?.weather_icons[0]}}
        style={{width: 200, height: 200}}
      />
      <Text style={styles.title}>{weather?.current.temperature}° </Text>
      <Text style={styles.description}>
        {weather?.current.weather_descriptions[0]}°{' '}
      </Text>
      <Text style={styles.city}>
        {weather?.location.name} / {weather?.location.country}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: '#a5ccfa',

    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  city: {
    fontSize: 18,
  },

  description: {
    fontSize: 16,
  },
});
