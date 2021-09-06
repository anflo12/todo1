import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {UserDataRegister} from '../interfaces/UserData';
import {api} from '../utils/api';

export default function RegisterScreen({navigation}: any) {
  const [loading, setloading] = useState<boolean>(false);
  const [user, setuser] = useState({
    userNames: '',
    lastNames: '',
    email: '',
    password: '',
  });
  const registerUser = async () => {
    const data: UserDataRegister = {
      firstName: user.userNames,
      lastName: user.lastNames,
      email: user.email,
    };
    setloading(true);
    const response = await api.post(
      'https://dummyapi.io/data/v1/user/create',
      data,
    );

    if (response !== undefined) {
      setloading(false);
      Alert.alert('Usuario creado exitosamente', '', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('Login')},
      ]);
      await AsyncStorage.setItem('id', response.data.id);
    } else {
      setloading(false);
      Alert.alert('Error al crear usuario', response, [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const handlerText = (value: string, name: string) => {
    setuser({...user, [name]: value});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarte</Text>

      <Input
        label="Nombres completos"
        inputContainerStyle={styles.inputContainer}
        labelStyle={styles.labelInput}
        onChangeText={value => handlerText(value, 'userNames')}
      />

      <Input
        label="Apellidos completos"
        labelStyle={styles.labelInput}
        inputContainerStyle={styles.inputContainer}
        onChangeText={value => handlerText(value, 'lastNames')}
      />

      <Input
        label="Correo Electronicó"
        labelStyle={styles.labelInput}
        inputContainerStyle={styles.inputContainer}
        onChangeText={value => handlerText(value, 'email')}
      />

      <Input
        label="Contraseña"
        secureTextEntry
        labelStyle={styles.labelInput}
        inputContainerStyle={styles.inputContainer}
        onChangeText={value => handlerText(value, 'password')}
      />

      <Button
        buttonStyle={styles.button}
        loading={loading}
        title="Registrarse"
        onPress={registerUser}
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
    marginTop: 50,
    marginBottom: 30,
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
