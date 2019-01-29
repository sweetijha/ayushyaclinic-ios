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
import DateTimePicker from 'react-native-modal-datetime-picker';

class My_Account extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      email: '',
      loggedIn : false,
      user_id : '',
      phone : '',
      dob:"",
      errorMessage : ''
    };
    this.animatedValue1 = new Animated.Value(deviceWidth)
    AsyncStorage.getItem("loginData").then((value) => {
      
        if(value == null){
           this.setState({
             loggedIn : false
           });
        }
        else{
          this.setState({
             loggedIn : true,
             name : JSON.parse(value).name,
             email : JSON.parse(value).email_id,
             user_id : JSON.parse(value).user_id,
             phone : JSON.parse(value).phone,
             dob : JSON.parse(value).dob
           });
        }
    }).done();
  }
  componentDidMount() {
    
}
  navigateToHome() {
    this.props.navigation.navigate('Home');
  }
   navigateToAllToken() {
    this.props.navigation.navigate('Token');
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
  updateProfile(){
    fetch('http://softbizz.in/Ayushya-clinic/api/public/Update_Profile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        user_id: this.state.user_id,
        email_id: this.state.email,
        dob : this.state.dob,
        phone: this.state.phone
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // alert(JSON.stringify(responseJson))
        if(responseJson.error){
          this.showToastMessage(responseJson.message, 'red');
        }else{
          let sd = {
            "user_id" : this.state.user_id,
            "name" : this.state.name,
            "phone" : this.state.phone,
            "email_id" : this.state.email,
            "dob" : this.state.dob
          };
          
           AsyncStorage.setItem('loginData', JSON.stringify(sd))
          this.props.navigation.navigate('Setting');
        }
      })
      .catch(error => {
        alert(JSON.stringify(error));
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
            text: 'My Account',
            style: { color: '#ffffff', fontSize: 22 },
          }}
        />
        <View>
        <View style={styles.phoneInputView}>
          <Text style={{ marginBottom: 6 }}>Full Name</Text>
          <TextInput style={styles.phoneInput} underlineColorAndroid="transparent" placeholder="Full Name"  value={this.state.name}
              onChangeText={text => this.setState({ name: text })}/>
          <Text style={{ marginBottom: 6, marginTop: 4 }}>Email</Text>
          <TextInput style={styles.phoneInput} placeholder="Email" underlineColorAndroid="transparent"  value={this.state.email}
              onChangeText={text => this.setState({ email: text })}/>
              <Text style={{ marginBottom: 6, marginTop: 4 }}>Date of Birth</Text>
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

            <Text style={{ marginBottom: 6, marginTop: 4 }}>Phone Number</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.phoneInput}
              placeholder="Enter phone number"
              value={this.state.phone}
              underlineColorAndroid="transparent"
              onChangeText={text => this.setState({ phone: text })}
            />
        </View>
        
            
        <View style={styles.submitButton}>
          <TouchableOpacity onPress = { this.updateProfile.bind(this) }>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
        </View>

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
export default My_Account;
