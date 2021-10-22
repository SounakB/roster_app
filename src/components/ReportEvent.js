import React from "react";
import {StyleSheet, Text, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {styles} from './Styles'

const ReportEvent = ({item}) => (
  <View style={styles.item}>
    <View style={styles.iconContainer}>
      <FontAwesome name="flag-checked" color="#333" size={28}/>
    </View>
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Report</Text>
      <Text style={styles.subtext}>{  item.Departure + ' - ' + item.Destination }</Text>
    </View>
    <View style={styles.timeContainer}>
      <Text style={styles.time}>
        {item.Time_Depart + ' - ' + item.Time_Arrive}
      </Text>
    </View>

  </View>
);

export default ReportEvent


const __styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
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
  }
});

