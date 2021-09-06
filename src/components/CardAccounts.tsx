import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-elements';
import {CardData} from '../interfaces/CardData';

interface Props {
  item: CardData;
  index: number;
}
export default function CardAccounts({item}: Props) {
  let numAccountText =
    item.numAccount === undefined ? '' : item.numAccount.toString();
  let numAccount = numAccountText.substring(9, numAccountText.length);
  let numAccountReplace = numAccountText
    .toString()
    .replace(numAccount, '*****');
  return (
    <View>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.numAccount}>
            Num. cuenta: {numAccountReplace}
          </Text>
          <Text style={styles.amount}> $ {item.amount}</Text>
        </View>
        <View>
          <Text style={styles.username}>Titular: {item.nameUser}</Text>
          <Text style={styles.username}>Tipo cuenta: {item.typeAccount}</Text>
          <Text style={styles.date}>
            Fecha expiracion: {item.fechaExpiracion}
          </Text>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  numAccount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#105085',
  },
  amount: {
    fontSize: 16,
    color: '#c74d28',
    fontWeight: '700',
  },
  username: {
    fontSize: 18,
    marginTop: 5,
  },

  date: {
    fontSize: 16,
    marginTop: 5,
  },
  cardContainer: {
    marginHorizontal: 5,
  },
});
