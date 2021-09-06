import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Image, SpeedDial} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import CardAccounts from '../components/CardAccounts';
import {CardData} from '../interfaces/CardData';

export default function HomeScreen({navigation, route}: any) {
  const [card, setCard] = useState<CardData[]>();
  const [open, setOpen] = useState(false);
  let refreshing =
    route.params.refreshing === undefined ? false : route.params.refreshing;
  useEffect(() => {
    const loadCards = async () => {
      let accounts = await AsyncStorage.getItem('accounts');

      let result;
      if (accounts === null) {
        result = [];
      } else {
        result = JSON.parse(accounts);
      }
      return result;
    };

    Promise.all([loadCards()]).then(result => setCard(result[0]));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Image
          source={{
            uri: 'https://www.delitosfinancieros.org/wp-content/uploads/2021/01/2021-1-ENE-Deutsche-Bank.jpg',
          }}
          style={{width: '100%', height: 250}}
        />

        <Text style={styles.title}>Mis cuentas</Text>
        <FlatList
          data={card}
          renderItem={({item, index}) => (
            <CardAccounts item={item} index={index} />
          )}
        />
      </View>
      <SpeedDial
        isOpen={open}
        icon={<Icon name="close-outline" color="white" size={20} />}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}>
        <SpeedDial.Action
          icon={<Icon name="thunderstorm-outline" color="white" size={20} />}
          title="Ver clima"
          onPress={() => navigation.navigate('Weather')}
        />
        <SpeedDial.Action
          icon={<Icon name="paper-plane-outline" color="white" size={20} />}
          title="Realizar transferencia"
          onPress={() => navigation.navigate('Sendtranfer')}
        />

        <SpeedDial.Action
          icon={<Icon name="card-outline" color="white" size={20} />}
          title="Solicitar transferencia"
          onPress={() => navigation.navigate('Reqtranfer')}
        />
        <SpeedDial.Action
          icon={<Icon name="cash-outline" color="white" size={20} />}
          title="Agregar cuenta"
          onPress={() => navigation.navigate('addAccount')}
        />
      </SpeedDial>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5ccfa',
  },
  title: {
    marginTop: 30,
    marginLeft: 12,
    fontSize: 18,
    color: '#0b3658',
    fontWeight: 'bold',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
