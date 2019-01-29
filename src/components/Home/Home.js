import React, { Component } from "react";
import ImageSlider from "react-native-image-slider";
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
  BackHandler,
  Alert
} from "react-native";
import { createStackNavigator } from 'react-navigation';
import backAndroid, {hardwareBackPress, exitApp} from 'react-native-back-android';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.hardwareBackPress = this.hardwareBackPress.bind(this);
    AsyncStorage.getItem("loginData").then((value) => {
    }).done();
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.hardwareBackPress);
}
  navigateToSetting(){
        this.props.navigation.navigate('Setting');
    }
    navigateToToken(){
      this.props.navigation.navigate('Current_Token');
    }
    navigateToToken_form(){
      this.props.navigation.navigate('Token_form');
    }
    navigateToWebAbout() {
    this.props.navigation.navigate('Webabout');
  }
  navigateToWebDoctors() {
    this.props.navigation.navigate('Webdoctors');
  }
  navigateToWebServices() {
    this.props.navigation.navigate('WebServices');
  }
   navigateToWebContactUs() {
    this.props.navigation.navigate('WebContactus');
  }
  hardwareBackPress() {
    if(this.props.navigation.state.routeName == 'Home' || this.props.navigation.state.routeName == 'Main') {
        Alert.alert(
            'Ayushyaa Clinic',
            'Want to quit?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {text: 'OK', onPress: () => exitApp()}
            ],
            {cancelable: false}
        );

    }else{
       
    }
    return true
};
  render() {
    
    return (
      <View style={{height: deviceHeight}}>
      <ScrollView>
        <View style={styles.imageView}>
          <ImageSlider
            autoPlayWithInterval={2000}
            images={[
              require("../../images/banner-img1.jpg"),
              require("../../images/banner-img2.jpg"),
              require("../../images/banner-img3.jpg")
            ]}
          />
        </View>
        <View style={{padding: 10,}}>
          <Text style={{fontSize: 20,fontWeight: "bold",textAlign:'center'}}>
              <Text style={{color:'#551a8b'}}>Ayushyaa </Text>
              <Text style={{color:'#02afd0'}}>Clinic</Text>
          </Text>
          <Text style={{textAlign:'center'}}>
            Ayushyaa Clinic introduced its digital platform, Ask Ayushyaa. The
            platform provides remote healthcare services. The platform connects
            patients with doctors remotely and provides services like
            consultation with doctors via video, voice calls and email.
          </Text>
        </View>
        <View style={styles.tokenButton}>
          <TouchableOpacity onPress={ this.navigateToToken_form.bind(this)} >
            <Text style={styles.loginText}>Take a token</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection:'row'}}>
        <View>
        <TouchableOpacity onPress={this.navigateToWebDoctors.bind(this)}>
         <Image
          style={{width: deviceWidth/2-30, height: deviceWidth/2-30, margin:15}}
          source={require('../../images/doctor.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToWebAbout.bind(this)}>
        <Image
          style={{width: deviceWidth/2-30, height: deviceWidth/2-30, margin:15}}
          source={require('../../images/aboutus.png')}
        />
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={this.navigateToWebServices.bind(this)}>
        <Image
          style={{width: deviceWidth/2-30, height: deviceWidth/2-30, margin:15}}
          source={require('../../images/serviceses.png')}
        />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToWebContactUs.bind(this)}>
        <Image
          style={{width: deviceWidth/2-40, height: deviceWidth/2-40, margin:15}}
          source={require('../../images/contactus.png')}
        />
        </TouchableOpacity>
        </View>
        </View>
        <View style={{height:100}}></View>
        </ScrollView>
        <View style={{flex: 1, flexDirection: 'row', position:'absolute',bottom:0, borderTopWidth:1,borderColor:'lightgray'}}>
          <View style={{width: (deviceWidth/3), height: 75, justifyContent:'center',alignItems:'center',borderColor:'lightgray',backgroundColor:'white',borderRightWidth:1, borderBottomColor:'#0f55b5', borderBottomWidth:3}} >
           <Image
          style={styles.iconImage}
          source={require('../../images/homeactive.png')}
        />
        <Text style={{color:'#0f55b5'}}>Home</Text>
        </View>
          <View style={{width: (deviceWidth/3), height: 75, justifyContent:'center',alignItems:'center',borderRightWidth:1,borderColor:'lightgray',backgroundColor:'white'}}>
          <TouchableOpacity onPress = { this.navigateToToken.bind(this) }>
          <Image
          style={styles.iconImage}
          source={require('../../images/token.png')}
        />
        <Text style={{color:'#7a7a7a'}}>Token</Text>
        </TouchableOpacity>
          </View>
          <View style={{width: (deviceWidth/3), height: 75, justifyContent:'center',alignItems:'center',backgroundColor:'white'}} >
          <TouchableOpacity onPress = { this.navigateToSetting.bind(this) }>
            <Image
          style={styles.iconImage}
          source={require('../../images/profiles.png')}
        />
        <Text style={{color:'#7a7a7a'}}>Profile</Text>
        </TouchableOpacity>
          </View>


        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imageView: {
    height: 250
  },
  iconImage:{
    width:30,
    height:30
  },
  tokenButton: {
    width: deviceWidth - 20,
    backgroundColor: "#2782d2",
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    opacity: 0.8,
    marginTop: 20
  },
  loginText: {
    textAlign: "center",
    fontSize: 18,
    color: "white"
  },
});
export default Home;
