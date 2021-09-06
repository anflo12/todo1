import React from 'react';
import {StyleSheet} from 'react-native';
import {QRscanner} from '@cubeking/react-native-qr-scanner';

export default function ScannerScreen({navigation}) {
  const Onsuccess = result => {
    let resultParse: [] = JSON.parse(result.data);

    console.log(JSON.parse(result.data));
    navigation.navigate('Sendtranfer', {result: resultParse});
  };

  return (
    <QRscanner
      onRead={Onsuccess}
      zoom={0}
      rectHeight={200}
      recWidth={150}
      finderY={50}
    />
  );
}

const styles = StyleSheet.create({});
