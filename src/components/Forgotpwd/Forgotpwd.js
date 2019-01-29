import React, { Component } from 'react';
import { Header } from 'react-native-elements';
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
  Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Forgotpwd extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      phone: '',
      password: '',
      otp: '',
      conf_password: '',
      phoneFlag: true,
      otpFlag: false,
      passFlag: false,
    };

    this.animatedValue1 = new Animated.Value(deviceWidth)
  }
  navigateToLogin() {
    this.props.navigation.navigate('Login');
  }
  getOtp() {
    fetch('http://softbizz.in/Ayushya-clinic/api/public/ForgotPassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'forgot',
        phone: this.state.phone,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loader: false });
        if (!responseJson.error) {
          this.showToastMessage(responseJson.message, 'green');
          console.log(responseJson);
          this.setState({
            phoneFlag: false,
            otpFlag: true,
            passFlag: false,
          });
          
        } else {
          this.showToastMessage(responseJson.message, 'red');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  verifyOtp() {
    fetch('http://softbizz.in/Ayushya-clinic/api/public/VerifyOTPForgot', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.phone,
        otp: this.state.otp,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        alert(JSON.stringify(responseJson))
        if (!responseJson.error) {
          this.setState({
            phoneFlag: false,
            otpFlag: false,
            passFlag: true,
          });
          
        } else {
          this.showToastMessage(responseJson.message, 'red');
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        console.log(error);
      });
  }
  forgotpwd() {
    fetch('http://softbizz.in/Ayushya-clinic/api/public/ChangePassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.phone,
        password: this.state.password,
        con_password: this.state.conf_password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ loader: false });
        if (responseJson.error) {
          this.showToastMessage(responseJson.message, 'red');
        } else {
          this.props.navigation.navigate('Login');
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        console.log(error);
      });
  }
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
    return (
      <KeyboardAwareScrollView
    enableOnAndroid
    enableAutomaticScroll
    keyboardOpeningTime={0}
    extraHeight={Platform.select({ android: 200 })}
  >
      <View>
        <Image
          style={styles.stretch}
          source={require('../../images/hospital.png')}
        />
        
        <View style={styles.backgroundOpacity} />
        <View style={styles.viewData}>
          {this.state.phoneFlag ? (
            <View>
              <View style={styles.phoneInputView}>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone"
                  placeholderTextColor="#ffffff"
                  value={this.state.phone}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ phone: text })}
                />
              </View>
              <View style={styles.loginButton}>
                <TouchableOpacity onPress={this.getOtp.bind(this)}>
                  <Text style={styles.loginText}>Get OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
          {this.state.otpFlag ? (
            <View>
              <View style={styles.pwdInputView}>
                <TextInput
                  style={styles.pwdInput}
                  placeholder="OTP"
                  placeholderTextColor="#ffffff"
                  value={this.state.otp}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ otp: text })}
                />
              </View>
              <View style={styles.loginButton}>
                <TouchableOpacity onPress={this.verifyOtp.bind(this)}>
                  <Text style={styles.loginText}>Verify OTP</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={this.getOtp.bind(this)}>
                  <Text style={styles.loginText}>Resend OTP</Text>
                </TouchableOpacity>
            </View>
          ) : null}
          {this.state.passFlag ? (
            <View>
              <View style={styles.pwdInputView}>
                <TextInput
                  style={styles.pwdInput}
                  placeholder="Password"
                  placeholderTextColor="#ffffff"
                  value={this.state.password}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ password: text })}
                />
              </View>
              <View style={styles.pwdInputView}>
                <TextInput
                  style={styles.pwdInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#ffffff"
                  value={this.state.conf_password}
                  secureTextEntry={true}
                  underlineColorAndroid="transparent"
                  onChangeText={text => this.setState({ conf_password: text })}
                />
              </View>
              <View style={styles.loginButton}>
                <TouchableOpacity onPress={this.forgotpwd.bind(this)}>
                  <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
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
  loginButton: {
    width: deviceWidth - 20,
    backgroundColor: '#2782d2',
    marginLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    opacity: 0.8,
    marginTop: 15,
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
  },
  pwdInput: {
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
  pwdInputView: {
    width: deviceWidth - 20,
    marginLeft: 0,
  },
});
export default Forgotpwd;
