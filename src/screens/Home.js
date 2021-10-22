import React, {Component} from "react";
import {SectionList, SafeAreaView, StatusBar, StyleSheet, Text, View,
  TouchableNativeFeedback, TouchableOpacity, Modal} from "react-native";
import {data} from "../data";
import {parse} from "@babel/core";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FlightEvent from "../components/FlightEvent";
import StandbyEvent from "../components/StandbyEvent";
import DayoffEvent from "../components/DayoffEvent";
import LayoverEvent from "../components/LayoverEvent";
import PositioningEvent from "../components/PositioningEvent";
import ReportEvent from "../components/ReportEvent";
import DebriefEvent from "../components/DebriefEvent";
import SimulatorEvent from "../components/SimulatorEvent";
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { showMessage, hideMessage } from "react-native-flash-message";

const DATA_URL = 'https://rosterbuster.aero/wp-content/uploads/dummy-response.json'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],
      isRefreshing: false,
      modalVisible: false,
      modalData: {}
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    let _this = this
    if(this.state.isRefreshing){
      return 0
    }else {
      this.setState({isRefreshing : true})
    }

    NetInfo.fetch().then(async state => {
      if(state.isConnected){
        // get online data
        var requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        };
        fetch(DATA_URL, requestOptions)
          .then((response) => response.json())
          .then(async (result) => {
            //console.log(result)
            _this.processData(result)
            _this.setState({isRefreshing : false})
            _this.storeData(result)
          }).catch((error) => {
          alert(error);
          _this.setState({isRefreshing : false})
          console.log('error', error);
        })
      }else {
        //get offline data
        try {
          const jsonValue = await AsyncStorage.getItem('@data')
          if(jsonValue != null){
            _this.processData(JSON.parse(jsonValue))
            showMessage({
              message: "You are offline!",
              description: "Data loaded from offline memory",
              type: "default",
            });
          }else{
            showMessage({
              message: "Network connectivity failed!",
              description: "Please connect to load latest data",
              type: "danger",
            });
          }
          _this.setState({isRefreshing : false})
          //return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch(e) {
          _this.setState({isRefreshing : false})
          // error reading value
        }
      }
    });

  }

  processData = (data) =>{
    var sections = []
    for (var i = 0; i < data.length; i++) {
      let found = false
      for (var j = 0; j < sections.length; j++) {
        if (sections[j].date == data[i]["Date"]) {
          sections[j].data.push(data[i])
          found = true
          break
        }
      }
      if (!found) {
        sections.push({
          date: data[i]["Date"],
          data: [data[i]]
        })
      }
    }
    this.setState({sections})
  }

  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@data', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  Item = ({item}) => {
    switch (item.DutyID) {
      case "FLT":
        return (<FlightEvent item={item}/>)
        break;
      case "SBY":
        return (<StandbyEvent item={item}/> )
      case "DO":
        return (<DayoffEvent item={item}/> )
      case "OFD":
        return (<LayoverEvent item={item}/> )
      case "POS":
        return (<PositioningEvent item={item}/> )

      default:
        // The dummy json does not contain Report Event, Debrief Event and Simulator Event so we are looking for those by matching substring of DutyCode
        let dutyCode = item.DutyCode.toLowerCase()

        if(dutyCode.includes('report')){
          return (<ReportEvent item={item}/> )
        }else if(dutyCode.includes('debrief')){
          return (<DebriefEvent item={item}/> )
        }else if(dutyCode.includes('simulator') || dutyCode.includes('training')){
          return (<SimulatorEvent item={item}/> )
        }
    }
  }

  checkField = (string) => {
    if(string != null && string.length != 0){
      return string
    }
    return 'N/A'
  }

  formatDate(date) {
    if(date) {
      var dayShortNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
      var monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
      let arr = date.split("/")
      let monthIndex = parseInt(arr[1]) - 1
      let month = monthShortNames[monthIndex]
      let d = new Date(arr[1] + '/' + arr[0] + '/' + arr[2])
      let day = dayShortNames[d.getDay()]
      let string = day + ' ' + arr[0] + ' ' + month + '. ' + arr[2]
      return string
    }
  }

  render() {
    return (
      <>
      <SectionList
        sections={this.state.sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) =>
          <TouchableOpacity onPress={async() => {
            await this.setState({modalVisible: true, modalData: item})
            console.log(this.state.modalData)
          }}>
          <this.Item item={item}/>
          </TouchableOpacity>
        }
        renderSectionHeader={({section: {date}}) => (
          <Text style={styles.header}>{this.formatDate(date)}</Text>
        )}
        onRefresh={this.getData}
        refreshing={this.state.isRefreshing}
      />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}

        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalDate}>{this.formatDate(this.state.modalData.Date)}</Text>
              <Text style={styles.modalTitle}>{this.state.modalData.DutyCode}</Text>
              <View style={styles.modalList}>
              <Text style={styles.modalText}>{'Duty ID : ' + this.checkField(this.state.modalData['DutyID'])}</Text>
              <Text style={styles.modalText}>{'Departure : ' + this.checkField(this.state.modalData['Departure'])}</Text>
              <Text style={styles.modalText}>{'Destination : ' + this.checkField(this.state.modalData['Destination'])}</Text>
              <Text style={styles.modalText}>{'Aircraft Type : ' + this.checkField(this.state.modalData['Aircraft Type'])}</Text>
              <Text style={styles.modalText}>{'Flight number : ' + this.checkField(this.state.modalData['Flightnr'])}</Text>
              <Text style={styles.modalText}>{'Tail : ' + this.checkField(this.state.modalData['Tail'])}</Text>
              <Text style={styles.modalText}>{'Time of Departure : ' + this.checkField(this.state.modalData['Time_Depart'])}</Text>
              <Text style={styles.modalText}>{'Time of Arrival : ' + this.checkField(this.state.modalData['Time_Arrive'])}</Text>
              <Text style={styles.modalText}>{'Captain : ' + this.checkField(this.state.modalData['Captain'])}</Text>
              <Text style={styles.modalText}>{'First Officer : ' + this.checkField(this.state.modalData['First Officer'])}</Text>
              <Text style={styles.modalText}>{'Flight Attendant : ' + this.checkField(this.state.modalData['Flight Attendant'])}</Text>
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setState({modalVisible: !this.state.modalVisible})}
              >
                <Text style={styles.textStyle}><FontAwesome name='times' size={20}/> </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: "left",
    color: '#333'
  },
  modalTitle:{
    fontSize: 24,
    color: '#000'
  },
  modalDate:{
    color: '#666',
    fontSize: 20,
    fontWeight: '700'
  },
  modalList: {
    flex:1,
    marginVertical: 12
  }
});

export default Home;
