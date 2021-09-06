import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {api} from '../utils/api';

export default function LoginScreen({navigation}: any) {
  const [loading, setloading] = useState<boolean>(false);
  const [user, setuser] = useState({
    email: '',
    password: '',
  });
  const SignIn = async () => {
    setloading(true);
    const id = await AsyncStorage.getItem('id');
    console.log('id', id);
    const response = await api.get('https://dummyapi.io/data/v1/user/' + id);

    if (response !== undefined) {
      setloading(false);
      navigation.navigate('Home');
    } else {
      setloading(false);
      Alert.alert('Error en correo o contraseña', response, [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const handleTextChange = (value: string, name: string) => {
    setuser({...user, [name]: value});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <Input
        label="E-mail"
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.labelInput}
        onChangeText={value => handleTextChange(value, 'email')}
      />

      <Input
        label="Contraseña"
        secureTextEntry
        labelStyle={styles.labelInput}
        inputContainerStyle={styles.inputContainer}
        onChangeText={value => handleTextChange(value, 'password')}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>¿No tienes cuenta? Registrate.</Text>
      </TouchableOpacity>

      <Button
        loading={loading}
        buttonStyle={styles.button}
        title="Ingresar"
        onPress={SignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5ccfa',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 20,
    color: '#0a2c42',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 16,
  },

  inputContainer: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,

    backgroundColor: 'white',
    borderRadius: 100,
    elevation: 2,
    paddingLeft: 12,
  },
  labelInput: {
    marginLeft: 12,
    marginBottom: 6,
    color: '#0a2c42',
  },

  register: {
    color: '#0a2c42',
    fontSize: 14,
    marginLeft: 18,
    marginBottom: 12,
  },

  button: {
    width: '75%',
    alignSelf: 'center',
  },
});
