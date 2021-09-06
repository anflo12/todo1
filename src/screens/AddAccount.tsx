import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, Input} from 'react-native-elements';
import RadioButton from '../components/RadioButton';
import {CardData} from '../interfaces/CardData';

export default function AddAccount({navigation}: any) {
  const [checked, setchecked] = useState({
    corriente: false,
    ahorros: false,
  });
  const [acounts, setAcounts] = useState<CardData>({
    numAccount: 0,
    typeAccount: '',
    nameUser: '',
    fechaExpiracion: '',
  });
  const handleTextChange = (value: string, name: string) => {
    if (name === 'numAccount') {
      setAcounts({...acounts, [name]: parseInt(value)});
    } else {
      setAcounts({...acounts, [name]: value});
    }
  };

  const addAccount = async () => {
    console.log('data', acounts);
    if (
      acounts.nameUser === '' ||
      acounts.numAccount === 0 ||
      acounts.fechaExpiracion === ''
    ) {
      Alert.alert('Por favor llenar todos los campos', '', [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      let accounts = await AsyncStorage.getItem('accounts');
      let newAccounts: CardData[] = [];
      if (accounts === null) {
        newAccounts.push({
          numAccount: acounts.numAccount,
          nameUser: acounts.nameUser,
          typeAccount: checked.ahorros ? 'Ahorros' : 'Corriente',
          fechaExpiracion: acounts.fechaExpiracion,
          amount: '100.000.000',
        });

        await AsyncStorage.setItem('accounts', JSON.stringify(newAccounts));
        navigation.navigate('Home', {refreshing: true});
      } else {
        let accountsArray = JSON.parse(accounts);
        newAccounts.push(...accountsArray, {
          numAccount: acounts.numAccount,
          nameUser: acounts.nameUser,
          typeAccount: checked.ahorros ? 'Ahorros' : 'Corriente',
          fechaExpiracion: acounts.fechaExpiracion,
          amount: '100.000.000',
        });

        await AsyncStorage.setItem('accounts', JSON.stringify(newAccounts));
        navigation.navigate('Home', {refreshing: true});
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar cuenta</Text>
      <View style={styles.RBContainer}>
        <RadioButton
          checked={checked.ahorros}
          onChange={value => setchecked({corriente: !value, ahorros: value})}
          text="C. Ahorros"
        />
        <View style={{marginLeft: 20}}>
          <RadioButton
            checked={checked.corriente}
            onChange={value => setchecked({ahorros: !value, corriente: value})}
            text="C. Corriente"
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View>
          <Input
            label="Num. cuenta"
            keyboardType="number-pad"
            maxLength={16}
            // eslint-disable-next-line react-native/no-inline-styles
            inputContainerStyle={{...styles.inputContainer, width: 230}}
            labelStyle={styles.labelInput}
            onChangeText={value => handleTextChange(value, 'numAccount')}
          />
        </View>
        <View>
          <Input
            label="Fecha expiración"
            // eslint-disable-next-line react-native/no-inline-styles
            inputContainerStyle={{
              ...styles.inputContainer,
              width: 160,
              marginLeft: -12,
            }}
            labelStyle={styles.labelInput}
            onChangeText={value => handleTextChange(value, 'fechaExpiracion')}
          />
        </View>
      </View>
      <Input
        label="Nombre titular"
        labelStyle={styles.labelInput}
        inputContainerStyle={styles.inputContainer}
        onChangeText={value => handleTextChange(value, 'nameUser')}
      />
      <Button
        buttonStyle={styles.button}
        title="Agregar"
        onPress={addAccount}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5ccfa',
   
  },
  RBContainer: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 15,
    marginVertical: 12,
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

  button: {
    width: '75%',
    alignSelf: 'center',
  },
});
