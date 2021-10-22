import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {styles} from './Styles'

const FlightEvent = ({item}) => (
  <View style={styles.item}>
    <View style={styles.iconContainer}>
      <FontAwesome name="plane" color="#333" size={28}/>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{item.Departure + ' - ' + item.Destination}</Text>
      <Text style={styles.subtext}>{''}</Text>
    </View>
    <View style={styles.timeContainer}>
      <Text style={styles.time}>
        {item.Time_Depart + ' - ' + item.Time_Arrive}
      </Text>
    </View>

  </View>
);

export default FlightEvent
