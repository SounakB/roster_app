import React from "react";
import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
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
    color: '#f33',
    textAlign: 'right'
  },
  timeContainer: {
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    //alignSelf: 'flex-end',
    //justifySelf: 'flex-end',
    //backgroundColor: '#333',
    flex: 6
  },
  subtext: {
    fontSize: 16,
    color: '#555'
  },
  iconContainer:{
    justifyContent: 'center',
    alignContent: 'center',
  }
});
