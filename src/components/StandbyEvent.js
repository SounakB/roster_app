import React from "react";
import {StyleSheet, Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {styles} from './Styles'

const StandbyEvent = ({item}) => (
  <View style={styles.item}>
    <View style={styles.iconContainer}>
      <FontAwesome name="paste" color="#333" size={28}/>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{item.DutyCode}</Text>
      <Text style={styles.subtext}>{item.DutyID + ' (' + item.Departure + ')'}</Text>
    </View>
    <View style={styles.timeContainer}>
      <Text style={styles.time}>
        {item.Time_Depart + ' - ' + item.Time_Arrive}
      </Text>
    </View>

  </View>
);

export default StandbyEvent


const __styles = StyleSheet.create({

  item: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 1,
    flexDirection: 'row'
  },
  header: {
    fontSize: 16,
    backgroundColor: "#ececec",
    color: '#333',
    padding: 10
  },
  title: {
    fontSize: 24,
    color: '#333'
  },
  titleContainer: {
    flex: 9,
    paddingHorizontal: 10
  },
  time: {
    color: '#f33'
  },
  timeContainer: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    flex: 1
  },
  subtext: {
    fontSize: 16,
    color: '#555'
  }
});

