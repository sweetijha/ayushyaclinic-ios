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
  Alert
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Expo from 'expo';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      phone: '',
      password: '',
      skipPage:'',
      errorMessage : ''
    };
    this.animatedValue1 = new Animated.Value(deviceWidth)
  }
  componentDidMount() {
    AsyncStorage.getItem("loginData").then((value) => {
        if(value){
           this.props.navigation.navigate('Home');
        }
    }).done();
    this.getToken();
}
 getToken(){
      fetch('http://softbizz.in/Ayushya-clinic/api/public/GetAllToken', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.length>0)
            this.setState({skipPage : 'Current_Token'});
        else
            this.setState({skipPage : 'Home'});
         
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
    }
    async signInWithGoogleAsync() {
      try {
        const result = await Expo.Google.logInAsync({
          androidClientId: "171301071937-ivu3jnktgt4bq6rn0krn4re3pecinmkt.apps.googleusercontent.com",
          scopes: ['profile', 'email'],
          iosClientId: "171301071937-7m405vtmjm3fio0373s30h5gkeeqfdsm.apps.googleusercontent.com",
        });
        // alert(JSON.stringify(result))
        if (result.type === 'success') {
          this.socialLogin(result.user.name, result.user.email, result.user.id);
        } else {
          return {cancelled: true};
        }
      } catch(e) {
        return {error: true};
      }
    }
    socialLogin(name, email, unique_id){
      fetch('http://softbizz.in/Ayushya-clinic/api/public/User_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email_id: email,
        unique_id : unique_id,
        login_type : 'social'
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify (responseJson))
        if(responseJson.error){
          this.showToastMessage(responseJson.message, 'red');
        }else{
          AsyncStorage.setItem('loginData', JSON.stringify(responseJson.data))
          this.props.navigation.navigate(this.state.skipPage);
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
    }
    async FacebooklogIn() {
      try {
        const {
          type,
          token,
          expires,
          permissions,
          declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('2249790811718711', {
          permissions: ['public_profile','email'],
        });
        if (type === 'success') {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
          var det = await response.json();
          this.socialLogin(det.name, det.email, det.id);
        } else {
          // type === 'cancel'
        }
      } catch ({ message }) {
        alert(`Facebook Login Error: ${message}`);
      }
    }
  navigateToHome() {
    fetch('http://softbizz.in/Ayushya-clinic/api/public/User_login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: this.state.phone,
        password: this.state.password
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.error){
          this.showToastMessage(responseJson.message, 'red');
        }else{
          AsyncStorage.setItem('loginData', JSON.stringify(responseJson.data))
          this.props.navigation.navigate(this.state.skipPage);
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  }
  navigateToForgotpwd(){
    this.props.navigation.navigate('Forgotpwd');
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
    keyboardShouldPersistTaps="handled"
  >
      <View>
        <Image
          style={styles.stretch}
          source={require('../../images/hospital.png')}
        />
        <View style={styles.backgroundOpacity} />
        <View style={styles.viewData}>
          <View style={styles.phoneInputView}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Phone"
              keyboardType="numeric"
              placeholderTextColor="#ffffff"
              underlineColorAndroid="transparent"
              value={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
          </View>
          <View style={styles.pwdInputView}>
            <TextInput
              style={styles.pwdInput}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              underlineColorAndroid="transparent"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={text => this.setState({ password: text })}
            />
          </View>
          <View style={styles.loginButton}>
            <TouchableOpacity onPress={this.navigateToHome.bind(this)}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgotButton}>
            <TouchableOpacity onPress={this.navigateToForgotpwd.bind(this)}>
              <Text style={styles.loginText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
          <View style={{marginRight:20}}>
          <TouchableOpacity onPress={this.signInWithGoogleAsync.bind(this)}>
          <Image source={require('../../images/googleplus.png')} style={{width:50,height:50}} />
          </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={this.FacebooklogIn.bind(this)}>
            <Image source={require('../../images/facebook.png')} style={{width:50,height:50}} />
            </TouchableOpacity>
          </View>
        
          </View>
        </View>
      </View>
      <Animated.View  style={{ transform: [{ translateX: this.animatedValue1 }], height: 50, backgroundColor: this.state.errorColor, position: 'absolute',left:0, top:30, right:0, justifyContent:  'center',zIndex: 1000000 }}>
          <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold', textAlign:'center' }}>
            {this.state.errorMessage}
          </Text>
        </Animated.View>
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
    marginBottom: 15,
  },
  phoneInputView: {
    width: deviceWidth - 20,
    marginLeft: 0,
  },
  pwdInputView: {
    width: deviceWidth - 20,
    marginLeft: 0,
  },
  forgotButton: {
    width: deviceWidth - 30,
    marginLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    opacity: 0.8,
  },
});
export default Login;
