import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  text: string;
}
export default function RadioButton({checked, onChange, text}: Props) {
  return (
    <View>
      {checked ? (
        <TouchableOpacity style={styles.btn} onPress={() => onChange(!checked)}>
          <Icon name="ellipse" color="black" size={20} />
          <Text>{text}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => onChange(!checked)} style={styles.btn}>
          <Icon name="ellipse-outline" color="black" size={20} />
          <Text>{text}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
  },
});
