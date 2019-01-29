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
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from 'react-native-modal-datetime-picker';


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Signup extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      phone: '',
      email_id: '',
      password: '',
      confirm_password: '',
      dob:''
    };
    this.animatedValue = new Animated.Value(deviceWidth)
  }
  componentDidMount() {
    AsyncStorage.getItem('signupData')
      .then(value => {
        if (value) {
          this.props.navigation.navigate('Home');
        }
      })
      .done();
  }
  closeToast() {
    setTimeout(() => {
      Animated.timing(
      this.animatedValue,
      { 
        toValue: deviceWidth,
        duration: 350
      }).start()
    }, 2000)
  }
  navigateToHome() {
    
    if(this.state.password == this.state.confirm_password){
      fetch('http://softbizz.in/Ayushya-clinic/api/public/User_Registration', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        phone: this.state.phone,
        email_id: this.state.email_id,
        password: this.state.password,
        dob: this.state.dob
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.error) {
          // alert(responseJson.message);
          this.setState({
            errorMessage : responseJson.message,
            errorColor : 'red'
          })
          Animated.timing(
            this.animatedValue,
            { 
              toValue: 0,
              duration: 350
            }).start(this.closeToast());
        } else {
          this.setState({
            errorMessage : responseJson.message,
            errorColor : 'green'
          })
          Animated.timing(
            this.animatedValue,
            { 
              toValue: 0,
              duration: 350
            }).start(this.closeToast());
          AsyncStorage.setItem('loginData', JSON.stringify(responseJson.data));
          this.props.navigation.navigate('Home');
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
    }else{
      this.setState({
        errorMessage : 'Password & Confirm Password Mismatch',
        errorColor : 'red'
      })
      Animated.timing(
        this.animatedValue,
        { 
          toValue: 0,
          duration: 350
        }).start(this.closeToast());
    }
    
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
  _toastWithDurationGravityOffsetHandler=()=>{
    //function to make Toast With Duration, Gravity And Offset
     ToastAndroid.showWithGravityAndOffset(
      'Hi I am Toast with garavity and offset',
      ToastAndroid.LONG, //can be SHORT, LONG
      ToastAndroid.BOTTOM, //can be TOP, BOTTON, CENTER
      25, //xOffset
      50 //yOffset
    );
     }
  render() {
    return (
      <KeyboardAwareScrollView
    enableOnAndroid
    enableAutomaticScroll
    keyboardOpeningTime={0}
    extraHeight={Platform.select({ android: 200 })}
    keyboardShouldPersistTaps="handled"
  >
        <View style={{ flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Image
            style={styles.stretch}
            source={require('../../images/hospital.png')}
          />
          <View style={styles.backgroundOpacity} />
          <View style={styles.viewData}>
            <View style={styles.phoneInputView}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Name"
                placeholderTextColor="#ffffff"
                value={this.state.name}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ name: text })}
              />
            </View>
            <View style={styles.phoneInputView}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone"
                keyboardType="numeric"
                placeholderTextColor="#ffffff"
                value={this.state.phone}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ phone: text })}
              />
            </View>
            <View style={styles.phoneInputView}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Email"
                placeholderTextColor="#ffffff"
                value={this.state.email_id}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ email_id: text })}
              />
            </View>
            <View style={styles.phoneInputView}>
            <TouchableOpacity onPress={this._showDatePicker}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Date of Birth"
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
            </View>
            <View style={styles.phoneInputView}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                value={this.state.password}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={text => this.setState({ password: text })}
              />
            </View>
            <View style={styles.phoneInputView}>
              <TextInput
                style={styles.phoneInput}
                placeholder="Confirm Password"
                placeholderTextColor="#ffffff"
                underlineColorAndroid="transparent"
                value={this.state.confirm_password}
                secureTextEntry={true}
                onChangeText={text => this.setState({ confirm_password: text })}
              />
            </View>
            <View style={styles.submitButton}>
              <TouchableOpacity onPress={this.navigateToHome.bind(this)}>
                <Text style={[styles.loginText]}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
           </ScrollView>
        </View>
        <Animated.View  style={{ transform: [{ translateX: this.animatedValue }], height: 50, backgroundColor: this.state.errorColor, position: 'absolute',left:0, top:30, right:0, justifyContent:  'center' }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold', textAlign:'center' }}>
            {this.state.errorMessage}
          </Text>
        </Animated.View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  stretch: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    zIndex: 100,
  },
  backgroundOpacity: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000,
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
  },
  viewData: {
    zIndex: 10000,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    width: deviceWidth - 20,
    backgroundColor: '#2782d2',
    marginLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    opacity: 0.8,
    marginTop: 10,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  phoneInput: {
    borderColor: '#7cb9b9',
    borderWidth: 1,
    height: 40,
    color: 'white',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    marginTop: 10,
  },

  phoneInputView: {
    width: deviceWidth - 20,
    marginLeft: 0,
  },
});
export default Signup;
