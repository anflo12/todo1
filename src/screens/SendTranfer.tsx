import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';

import RadioButton from '../components/RadioButton';

export default function SendTranfer({navigation, route}: any) {
  const result: any =
    route.params.result === undefined ? [] : route.params.result;
  let data = result.length > 0 ? result[0] : {};

  const [setchecked] = useState({
    COP: false,
    USD: false,
  });

  const [input, setinput] = useState({
    numAcount: data.numAcount,
    value: data.value,
    message: '',
  });

  const handleTextChange = (value: string, name: string) => {
    setinput({...input, [name]: value});
  };

  const tranfer = () => {
    Alert.alert('Transferencia realizada', '', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate('Home')},
    ]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realizar Transferencia</Text>

      <Input
        label="Num. cuenta a donde vas a solicitar "
        labelStyle={styles.labelInput}
        value={input.numAcount}
        keyboardType="number-pad"
        maxLength={16}
        inputContainerStyle={styles.inputContainer}
        onChangeText={value => handleTextChange(value, 'numAcount')}
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <Input
            label="Valor  a solicitar "
            value={input.value}
            labelStyle={styles.labelInput}
            inputContainerStyle={{...styles.inputContainer, width: 200}}
            onChangeText={value => handleTextChange(value, 'value')}
          />
        </View>

        <View style={styles.RBContainer}>
          <RadioButton
            checked={data.moneyType === 'USD' ? true : false}
            onChange={value => setchecked({USD: !value, COP: value})}
            text="USD"
          />
          <View style={{marginLeft: 20}}>
            <RadioButton
              checked={data.moneyType === 'COP' ? true : false}
              onChange={value => setchecked({COP: !value, USD: value})}
              text="COP"
            />
          </View>
        </View>
      </View>

      {result ? (
        <Button
          buttonStyle={styles.button}
          title="Realizar Transferencia"
          onPress={() => tranfer()}
        />
      ) : (
        <Button
          buttonStyle={styles.button}
          title="Escanear QR"
          onPress={() => navigation.navigate('Scanner')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5ccfa',
  },

  title: {
    fontSize: 20,
    color: '#0a2c42',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 30,
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

  buttonShare: {
    width: '75%',
    alignSelf: 'center',
    backgroundColor: 'red',
    marginTop: 15,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  QR: {
    marginTop: 25,
    alignItems: 'center',
  },
  RBContainer: {
    flexDirection: 'row',
  },
});
