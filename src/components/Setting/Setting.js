import React, { Component } from 'react';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import { Separator } from 'native-base';
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
} from 'react-native';

import { createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Setting extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      clinicIcon : require('../../images/down.png'),
      iconNext : true,
      list: [
        {
          title: 'Getting Started',
          body:
            'React native Accordion/Collapse component, very good to use in toggles & show/hide content',
        },
        {
          title: 'Components',
          body: 'AccordionList,Collapse,CollapseHeader & CollapseBody',
        },
      ],
    };
    AsyncStorage.getItem("loginData").then((value) => {
    }).done();
  }

  _head(item) {
    return (
      <Separator bordered style={{ alignItems: 'center' }}>
        <Text>{item.title}</Text>
      </Separator>
    );
  }

  _body(item) {
    return (
      <View style={{ padding: 10 }}>
        <Text style={{ textAlign: 'center' }}>{item.body}</Text>
      </View>
    );
  }
  // navigateToWebHome() {
  //   this.props.navigation.navigate('Webhome');
  // }
  // navigateToWebAbout() {
  //   this.props.navigation.navigate('Webabout');
  // }
  // navigateToWebDoctors() {
  //   this.props.navigation.navigate('Webdoctors');
  // }
  // navigateToWebServices() {
  //   this.props.navigation.navigate('WebServices');
  // }
  //  navigateToWebContactUs() {
  //   this.props.navigation.navigate('WebContactus');
  // }
  navigateToHome() {
    this.props.navigation.navigate('Home');
  }
  navigateToToken() {
    this.props.navigation.navigate('Current_Token');
  }
  navigateToAllToken() {
    this.props.navigation.navigate('Token');
  }
  navigateToMy_Account() {
    this.props.navigation.navigate('My_Account');
  }
  navigateToChangepwd() {
    this.props.navigation.navigate('Changepwd');
  }
  navigateToMain() {
    AsyncStorage.clear();
    this.props.navigation.navigate('Main');
  }
  changeIcon(){

  }
  render() {
    const { goBack } = this.props.navigation;
    return (
      <View style={{ height: deviceHeight }}>
      <View style={{zIndex:99}}>
        <View style={styles.container}>
          <Header
            backgroundColor="#2782d2"
            leftComponent={{
              icon: 'keyboard-backspace',
              color: 'white',
              onPress: () => goBack(),
            }}
            centerComponent={{
              text: 'Profile',
              style: { color: '#ffffff', fontSize: 22 },
            }}
          />
        </View>
        <TouchableOpacity onPress={this.navigateToMy_Account.bind(this)}>
          <View style={styles.buttonView}>
            <Image
              style={styles.buttonIcon}
              source={require('../../images/profile.png')}
            />
            <Text style={styles.buttonText}>My Account</Text>
            <Image
              style={styles.buttonNext}
              source={require('../../images/next.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToAllToken.bind(this)}>
          <View style={styles.buttonView}>
            <Image
              style={styles.buttonIcon}
              source={require('../../images/Tokenimg.png')}
            />
            <Text style={styles.buttonText}>My Tokens</Text>

            <Image
              style={styles.buttonNext}
              source={require('../../images/next.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToChangepwd.bind(this)}>
          <View style={styles.buttonView}>
            <Image
              style={styles.buttonIcon}
              source={require('../../images/reset_password.png')}
            />
            <Text style={styles.buttonText}>Change Password</Text>
            <Image
              style={styles.buttonNext}
              source={require('../../images/next.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateToMain.bind(this)}>
          <View style={styles.buttonView}>
            <Image
              style={styles.buttonIcon}
              source={require('../../images/logout.png')}
            />
            <Text style={styles.buttonText}>Log Out</Text>
            <Image
              style={styles.buttonNext}
              source={require('../../images/next.png')}
            />
          </View>
        </TouchableOpacity>
      {
        // <Collapse>
        //   <CollapseHeader>
          
        //     <View style={styles.buttonView}>
        //       <Image
        //         style={styles.buttonIcon}
        //         source={require('../../images/ayushyaa.png')}
        //       />
        //       <Text style={styles.buttonText}>Ayushyaa Clinic</Text>
        //       <Image
        //         style={styles.buttonNext}
        //         source={this.state.clinicIcon}
        //       />
        //     </View>
        //   </CollapseHeader>
        //   <CollapseBody>
        //   {
        //     <TouchableOpacity onPress={this.navigateToWebHome.bind(this)}>
        //     <View style={styles.childButtonView}>
        //       <Image
        //         style={styles.buttonIcon}
        //         source={require('../../images/hos-home.png')}
        //       />
        //       <Text style={styles.buttonText}>Home</Text>
        //       <Image
        //         style={styles.buttonNext}
        //         source={require('../../images/next.png')}
        //       />
        //     </View>
        //     </TouchableOpacity>
        //     }
        //     <TouchableOpacity onPress={this.navigateToWebAbout.bind(this)}>
        //     <View style={styles.childButtonView}>
        //       <Image
        //         style={styles.buttonIcon}
        //         source={require('../../images/about.png')}
        //       />
        //       <Text style={styles.buttonText}>About Us</Text>
        //       <Image
        //         style={styles.buttonNext}
        //         source={require('../../images/next.png')}
        //       />
        //     </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={this.navigateToWebDoctors.bind(this)}>
        //     <View style={styles.childButtonView}>
        //       <Image
        //         style={styles.buttonIcon}
        //         source={require('../../images/doctors.png')}
        //       />
        //       <Text style={styles.buttonText}>Doctors</Text>
        //       <Image
        //         style={styles.buttonNext}
        //         source={require('../../images/next.png')}
        //       />
        //     </View>
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={this.navigateToWebServices.bind(this)}>
        //     <View style={styles.childButtonView}>
        //       <Image
        //         style={styles.buttonIcon}
        //         source={require('../../images/services.png')}
        //       />
        //       <Text style={styles.buttonText}>Services</Text>
        //       <Image
        //         style={styles.buttonNext}
        //         source={require('../../images/next.png')}
        //       />
        //     </View>
        //     </TouchableOpacity>
        //     {
        //     // <View style={styles.childButtonView}>
        //     //   <Image
        //     //     style={styles.buttonIcon}
        //     //     source={require('../../images/logout.png')}
        //     //   />
        //     //   <Text style={styles.buttonText}>Testimonials</Text>
        //     //   <Image
        //     //     style={styles.buttonNext}
        //     //     source={require('../../images/next.png')}
        //     //   />
        //     // </View>
        //     }
        //     <TouchableOpacity onPress={this.navigateToWebContactUs.bind(this)}>
        //     <View style={styles.childButtonView}>
        //       <Image
        //         style={styles.buttonIcon}
        //         source={require('../../images/contact.png')}
        //       />
        //       <Text style={styles.buttonText}>Contact Us</Text>
        //       <Image
        //         style={styles.buttonNext}
        //         source={require('../../images/next.png')}
        //       />
        //     </View>
        //     </TouchableOpacity>
        //   </CollapseBody>
        // </Collapse>

        // <AccordionList list={this.state.list} />
      }
      </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            position: 'absolute',
            bottom: 0,
            borderTopWidth: 1,
            borderColor: 'lightgray',
            zIndex:9999,
            backgroundColor:'white'
          }}>
          <View
            style={{
              width: deviceWidth / 3,
              height: 75,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'lightgray',
              borderRightWidth: 1,
            }}>
            <TouchableOpacity onPress={this.navigateToHome.bind(this)}>
              <Image
                style={styles.iconImage}
                source={require('../../images/home.png')}
              />
              <Text style={{ color: '#7a7a7a' }}>Home</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: deviceWidth / 3,
              height: 75,
              justifyContent: 'center',
              alignItems: 'center',
              borderRightWidth: 1,
              borderColor: 'lightgray',
            }}>
            <TouchableOpacity onPress={this.navigateToToken.bind(this)}>
              <Image
                style={styles.iconImage}
                source={require('../../images/token.png')}
              />
              <Text style={{ color: '#7a7a7a' }}>Token</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: deviceWidth / 3,
              height: 75,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomColor: '#0f55b5',
              borderBottomWidth: 3,
            }}>
            <Image
              style={styles.iconImage}
              source={require('../../images/profilesactive.png')}
            />
            <Text style={{ color: '#0f55b5' }}>Profile</Text>
          </View>
        </View>
      </View>
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
  buttonView: {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#797979',
    paddingBottom: 16,
    zIndex:999
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 16,
  },
  buttonNext: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 10,
  },
  iconImage: {
    width: 30,
    height: 30
  },
});
export default Setting;
