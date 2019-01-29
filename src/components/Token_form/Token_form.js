import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableHighlight,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
  Keyboard,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Picker,
  Platform
} from 'react-native';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Icon from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { createStackNavigator } from 'react-navigation';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Token_form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      phone: '',
      gender: 'Male',
      dob: '',
      email: '',
      conv_time: '',
      user_id : '',
      tabFlag: 1,
      noOfPatient:'',
      errorMessage : ''
    };
    this.animatedValue1 = new Animated.Value(deviceWidth)

      AsyncStorage.getItem("loginData").then((value) => {
          this.setState({
            user_id: JSON.parse(value).user_id
          })
      }).done();
  }
  navigateToToken_details() {
    this.props.navigation.navigate('Token_details');
  }
  selfTabClick(){
    this.setState({
      tabFlag : 1
    })
  }
  otherTabClick(){
    this.setState({
      tabFlag : 2
    })
  }
  addOtherToken() {
    fetch('http://softbizz.in/Ayushya-clinic/api/public/Token_Generate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: this.state.phone,
        patient_name: this.state.name,
        dob: this.state.dob,
        email: this.state.email,
        NoOfPatient: this.state.noOfPatient,
        user_id : this.state.user_id,
        TokenFor: 'Other'
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson));
        if (responseJson.error) {
          this.showToastMessage(responseJson.message, 'red');
        } else {
          this.setState({
            phone : '',
            name  : '',
            dob : '',
            email : '',
            noOfPatient : ''
          });
          setTimeout(() => {
            this.props.navigation.navigate('Current_Token');
          }, 100);
          
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  }

  addSelfToken() {
    fetch('http://softbizz.in/Ayushya-clinic/api/public/Token_Generate', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        NoOfPatient: this.state.noOfPatient,
        user_id : this.state.user_id,
        TokenFor: 'self'
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson));
        if (responseJson.error) {
          this.showToastMessage(responseJson.message, 'red');
        } else {
          this.setState({
            phone : '',
            name  : '',
            dob : '',
            email : '',
            noOfPatient : ''
          });
          setTimeout(() => {
            this.props.navigation.navigate('Current_Token');
          }, 100);
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  }
  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = date => {
    //alert('A date has been picked: ', date.toString());
    this.setState({
      dob:
        date.getFullYear() +
        '-' +
        (parseInt(date.getMonth() + 1) < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        (parseInt(date.getDate()) < 10 ? '0' + date.getDate() : date.getDate()),
    });
    this._hideDatePicker();
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = time => {
    this.setState({
      conv_time:
        (parseInt(time.getHours()) < 10
          ? '0' + time.getHours()
          : time.getHours()) +
        ':' +
        (parseInt(time.getMinutes()) < 10
          ? '0' + time.getMinutes()
          : time.getMinutes()),
    });
    // alert(time.getHours()+':'+time.getMinutes());
    this._hideTimePicker();
  };

  showToastMessage(message, color ){
    this.setState({
      errorMessage : message,
      errorColor : color
    })
    Animated.timing(
      this.animatedValue1,
      { 
        toValue: 0,
        duration: 350
      }).start(this.closeToast());
  }
  closeToast() {
    setTimeout(() => {
      Animated.timing(
      this.animatedValue1,
      { 
        toValue: deviceWidth,
        duration: 350
      }).start()
    }, 2000)
  }


  render() {
    const { dob } = this.state;
    const { goBack } = this.props.navigation;
    return (
      <KeyboardAwareScrollView
    enableOnAndroid
    enableAutomaticScroll
    keyboardOpeningTime={0}
    extraHeight={Platform.select({ android: 200 })}
    keyboardShouldPersistTaps="handled"
  >
      <View style={{ height: deviceHeight, flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Header
              backgroundColor="#2782d2"
              leftComponent={{
                icon: 'keyboard-backspace',
                color: 'white',
                onPress: () => goBack(),
              }}
              centerComponent={{
                text: 'Token Form',
                style: { color: '#ffffff', fontSize: 22 },
              }}
            />
          </View>
          <View
          style={{
            flex: 1,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderColor: 'lightgray',
            zIndex:9999,
            backgroundColor:'white'
          }}>
          <View
            style={{
              width: deviceWidth / 2,
              height: 75,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'lightgray',
              borderRightWidth: 1,
            }}>
            <TouchableOpacity onPress={this.selfTabClick.bind(this)}>
              <Icon
                name="person"
                color={this.state.tabFlag==1?"#0f55b5":"#7a7a7a"}
                size={50}
              />
              <Text style={{ color: this.state.tabFlag==1?"#0f55b5":"#7a7a7a", textAlign:'center' }}>Self</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: deviceWidth / 2,
              height: 75,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderColor: 'lightgray',
            }}>
            <TouchableOpacity onPress={this.otherTabClick.bind(this)}>
            <Icon
                name="person-add"
                color={this.state.tabFlag==2?"#0f55b5":"#7a7a7a"}
                size={50}
              />
              <Text style={{ color: this.state.tabFlag==2?"#0f55b5":"#7a7a7a", textAlign:'center' }}>Other</Text>
            </TouchableOpacity>
          </View>
          </View>
          {
            this.state.tabFlag == 1 ?
            <View>
            <View  style={styles.phoneInputView}>
            <Text style={{ marginBottom: 6, marginTop: 4 }}>Number of Patient</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.phoneInput}
              placeholder="Enter the Number of Patient"
              value={this.state.noOfPatient}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ noOfPatient: text })}
            />
            </View>
            <View style={styles.submitButton}>
            <TouchableOpacity onPress={this.addSelfToken.bind(this)}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          
          </View>
            </View>
            :
            <View>
            <View style={styles.phoneInputView}>
            <Text style={{ marginBottom: 6 }}>Full Name</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="Full Name"
              value={this.state.name}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ name: text })}
            />
            <Text style={{ marginBottom: 6, marginTop: 4 }}>Phone Number</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.phoneInput}
              placeholder="Phone Number"
              value={this.state.phone}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ phone: text })}
            />
            <Text style={{ marginBottom: 6 }}>Date of Birth</Text>
            <TouchableOpacity onPress={this._showDatePicker}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Date of Birth"
                editable={false}
                value={this.state.dob}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ dob: text })}
              />
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDatePicker}
              mode="date"
            />
            <Text style={{ marginBottom: 6, marginTop: 4 }}>Email</Text>
            <TextInput
              style={styles.phoneInput}
              placeholder="Email"
              value={this.state.email}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ email: text })}
            />
            <Text style={{ marginBottom: 6, marginTop: 4 }}>Number of Patient</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.phoneInput}
              placeholder="Enter the Number of Patient"
              value={this.state.noOfPatient}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ noOfPatient: text })}
            />
          </View>
          <View style={styles.submitButton}>
            <TouchableOpacity onPress={this.addOtherToken.bind(this)}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
          </View>
          }
        </ScrollView>
        <Animated.View  style={{ transform: [{ translateX: this.animatedValue1 }], height: 50, backgroundColor: this.state.errorColor, position: 'absolute',left:0, top:30, right:0, justifyContent:  'center',zIndex: 1000000 }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold', textAlign:'center' }}>
            {this.state.errorMessage}
          </Text>
        </Animated.View>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  phoneInput: {
    borderColor: '#808080',
    borderWidth: 1,
    height: 40,
    color: '#000000',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  phoneInputView: {
    width: deviceWidth - 30,
    marginLeft: 15,
    marginTop: 20,
  },
  submitButton: {
    width: deviceWidth - 20,
    backgroundColor: '#2782d2',
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    opacity: 0.8,
    marginTop: 20,
  },
  submitText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  selectInput: {
    borderColor: '#808080',
    borderWidth: 1,
    height: 40,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  pickerInput:{
    height:40

  },
  // iconImage: {
  //   width: 30,
  //   height: 30
  // },
});
export default Token_form;
