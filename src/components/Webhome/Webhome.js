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
  WebView,
} from 'react-native';
import { Constants } from 'expo';
import { Header } from 'react-native-elements';

import { createStackNavigator } from 'react-navigation';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class Webhome extends Component {
  render() {
    const { goBack } = this.props.navigation;
    return (
        <View style={styles.container}>
          <Header
            backgroundColor="#2782d2"
            leftComponent={{
              icon: 'keyboard-backspace',
              color: 'white',
              onPress: () => goBack(),
            }}
            centerComponent={{
              text: 'Home',
              style: { color: '#ffffff', fontSize: 22 },
            }}
          />
          <Text></Text>
          <View style={{flex: 1, flexDirection:'column'}}>
          <WebView source={{uri:"http://ayushaaclinic.walkneeds.com/index.html"}} style={{width:'100%',height:'100%',}} />
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
    flex: 1,
  },
});
export default Webhome;
