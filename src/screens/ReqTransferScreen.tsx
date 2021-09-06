/* eslint-disable no-alert */
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import RadioButton from '../components/RadioButton';

export default function ReqTransferScreen() {
  let QRRef = useRef(null);
  const [visible, setvisible] = useState<boolean>(false);
  const [checked, setchecked] = useState({
    COP: false,
    USD: false,
  });
  const [InfoQR, setInfoQR] = useState<string>('');
  const [input, setinput] = useState({
    numAcount: '',
    value: '',
    moneyType: '',
    message: '',
  });

  const handleTextChange = (value: string, name: string) => {
    setinput({...input, [name]: value});
  };

  const generateQR = () => {
    if (input.numAcount === '') {
      alert('Por favor escribe el numero de cuenta');
    } else {
      let infoqr: string = JSON.stringify([
        {
          ...input,
          moneyType: checked.COP ? 'COP' : 'USD',
        },
      ]);
      setInfoQR(infoqr);
      setvisible(true);
    }
  };

  const shareQR = async () => {
    QRRef.current?.toDataURL((image: string) => {
      try {
        let shareOptionsUrl = {
          title: 'Solicitud Transferencia',
          message: 'Solicitud Transferencia',
          subject: 'Share information from your application',
          url: `data:image/jpeg;base64,${image}`,
        };
        Share.open(shareOptionsUrl);
      } catch (error) {
        console.log('error al compartir', error);
      }
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar Transferencia</Text>

      <Input
        label="Num. cuenta a donde vas a solicitar "
        labelStyle={styles.labelInput}
        keyboardType="number-pad"
        maxLength={16}
        inputContainerStyle={styles.inputContainer}
        onChangeText={value => handleTextChange(value, 'numAcount')}
      />

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <Input
            label="Valor  a solicitar "
            labelStyle={styles.labelInput}
            keyboardType="number-pad"
            inputContainerStyle={{...styles.inputContainer, width: 200}}
            onChangeText={value => handleTextChange(value, 'value')}
          />
        </View>

        <View style={styles.RBContainer}>
          <RadioButton
            checked={checked.COP}
            onChange={value => setchecked({USD: !value, COP: value})}
            text="COP"
          />
          <View style={{marginLeft: 20}}>
            <RadioButton
              checked={checked.USD}
              onChange={value => setchecked({COP: !value, USD: value})}
              text="USD"
            />
          </View>
        </View>
      </View>

      <Input
        label="Mensaje "
        labelStyle={styles.labelInput}
        inputContainerStyle={styles.inputContainer}
        multiline
        onChangeText={value => handleTextChange(value, 'message')}
      />

      <Button
        buttonStyle={styles.button}
        title="Generar QR"
        onPress={generateQR}
      />

      {visible ? (
        <View style={styles.QR}>
          <QRCode
            quietZone={10}
            getRef={ref => (QRRef.current = ref)}
            value={InfoQR}
            size={200}
          />

          {/* el text a la izquierda es un bug de la libreria */}
          <Button
            buttonStyle={{
              ...styles.buttonShare,
            }}
            title="Compartir"
            onPress={shareQR}
          />
        </View>
      ) : null}
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
