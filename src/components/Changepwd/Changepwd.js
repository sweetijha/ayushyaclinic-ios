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
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Changepwd extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      old_password : '',
      new_password : '',
      conf_password : '',
      loggedIn : true,
      errorMessage : ''
    };
    this.animatedValue1 = new Animated.Value(deviceWidth)

    AsyncStorage.getItem("loginData").then((value) => {
        if(value){
           this.setState({user_id:JSON.parse(value).user_id})
        }
    }).done();
  }
  componentDidMount() {
    AsyncStorage.getItem("loginData").then((value) => {
        if(value == null){
           this.setState({
             loggedIn : false
           });
        }
        else{
          this.setState({
             loggedIn : true
           });
        }
    }).done();
}
   navigateToHome() {
     if(this.state.new_password == this.state.conf_password){
        fetch('http://softbizz.in/Ayushya-clinic/api/public/Update_Password', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id : this.state.user_id,
        old_password: this.state.old_password,
        new_password: this.state.new_password

      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if(responseJson.error){
          this.showToastMessage(responseJson.message, 'red');
        }else{
          this.props.navigation.navigate('Setting');
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
     }else{
       this.showToastMessage('password mismatch', 'red');
     }
    
  }
   navigateToAllToken() {
    this.props.navigation.navigate('Token');
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
    const { goBack } = this.props.navigation;
    return (
      <View style={{ height: deviceHeight }}>
        <Header
          backgroundColor="#2782d2"
          leftComponent={{
            icon: 'keyboard-backspace',
            color: 'white',
            onPress: () => goBack(),
          }}
          centerComponent={{
            text: 'Change Password',
            style: { color: '#ffffff', fontSize: 22 },
          }}
        />
        {       this.state.loggedIn?
      <View>
        <View style={styles.phoneInputView}>
          <Text style={{ marginBottom: 6 }}>Old Password</Text>
          <TextInput style={styles.phoneInput} placeholder="Old Password" 
              value={this.state.old_password}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ old_password: text })}/>
          <Text style={{ marginBottom: 6, marginTop: 4 }}>New Password</Text>
          <TextInput style={styles.phoneInput} placeholder="New Password"  
              value={this.state.new_password}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ new_password: text })}/>
          <Text style={{ marginBottom: 6, marginTop: 4 }}>
            Confirm Password
          </Text>
          <TextInput style={styles.phoneInput} placeholder="Confirm Password"  
              value={this.state.conf_password}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ conf_password: text })}/>
        </View>
        <View style={styles.submitButton}>
          <TouchableOpacity  onPress={this.navigateToHome.bind(this)}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
        </View>
        :
        <View style={styles.comingsoon}>
          <Image
          style={styles.imgComingSoon}
            source={require('../../images/backc.jpg')}
          />
          <View style={styles.viewData}>
            <Image
              style={styles.cimg}
                source={require('../../images/ban.png')}
              />
              <Text style={styles.textc}>
                Login to Access Your Account
              </Text>
          </View>
        </View>
}
            <Animated.View  style={{ transform: [{ translateX: this.animatedValue1 }], height: 50, backgroundColor: this.state.errorColor, position: 'absolute',left:0, top:30, right:0, justifyContent:  'center',zIndex: 1000000 }}>
            <Text style={{ marginLeft: 10,  color: 'white',  fontSize:16, fontWeight: 'bold', textAlign:'center' }}>
              {this.state.errorMessage}
            </Text>
            </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
  comingsoon:{
    height : deviceHeight,
    width:deviceWidth,
    
  },
  imgComingSoon:{
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute',
    zIndex: 100,
  },
  viewData: {
    zIndex: 10000,
    width: deviceWidth,
    height: deviceHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cimg:{
    width:deviceWidth/2,
    height:deviceWidth/2,
    position:'relative',
    top:-50
  },
  textc:{
    fontSize:30,
    color:'white',
    textAlign:'center',
    position:'relative',
    top:-50
  }
});
export default Changepwd;
