import React from "react";
import {StyleSheet, Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {styles} from './Styles'

const DayoffEvent = ({item}) => (
  <View style={styles.item}>
    <View style={styles.iconContainer}>
      <FontAwesome name="calendar-times" color="#333" size={28}/>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{'Day Off'}</Text>
      <Text style={styles.subtext}>{  item.Departure }</Text>
    </View>
    <View style={styles.timeContainer}>

    </View>

  </View>
);

export default DayoffEvent
