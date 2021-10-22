import React from "react";
import {StyleSheet, Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {styles} from './Styles'

const LayoverEvent = ({item}) => (
  <View style={styles.item}>
    <View style={styles.iconContainer}>
      <FontAwesome name="briefcase" color="#333" size={28}/>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{'Layover'}</Text>
      <Text style={styles.subtext}>{  item.Departure }</Text>
    </View>
    <View style={styles.timeContainer}>
      <Text style={styles.time}>
        {item.Time_Depart + ' - ' + item.Time_Arrive}
      </Text>
    </View>

  </View>
);

export default LayoverEvent
