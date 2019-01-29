import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from './src/components/Main';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Home from './src/components/Home';
import Setting from './src/components/Setting';
import Token_form from './src/components/Token_form';
import Token from './src/components/Token';
import Token_details from './src/components/Token_details';
import My_Account from './src/components/My_Account';
import Changepwd from './src/components/Changepwd';
import Current_Token from './src/components/Current_Token';
import Forgotpwd from './src/components/Forgotpwd';
import Webhome from './src/components/Webhome';
import Webabout from './src/components/Webabout';
import Webdoctors from './src/components/Webdoctors';
import WebContactus from './src/components/WebContactus';
import WebServices from './src/components/WebServices';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Button,
  ScrollView,
  WebView,
} from 'react-native';

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      header: null,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
   Current_Token: {
    screen: Current_Token,
    navigationOptions: {
      header: null,
    },
  },
   WebServices: {
    screen: WebServices,
    navigationOptions: {
      header: null,
    },
  }, 
   WebContactus: {
    screen: WebContactus,
    navigationOptions: {
      header: null,
    },
  }, 
   Webdoctors: {
    screen: Webdoctors,
    navigationOptions: {
      header: null,
    },
  }, 
  Webabout: {
    screen: Webabout,
    navigationOptions: {
      header: null,
    },
  },
  Token_details: {
    screen: Token_details,
    navigationOptions: {
      header: null,
    },
  },
  Token: {
    screen: Token,
    navigationOptions: {
      header: null,
    },
  },

  Token_form: {
    screen: Token_form,
    navigationOptions: {
      header: null,
    },
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      header: null,
    },
  },

  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  My_Account: {
    screen: My_Account,
    navigationOptions: {
      header: null,
    },
  },
  Changepwd: {
    screen: Changepwd,
    navigationOptions: {
      header: null,
    },
  },
Forgotpwd:{
  screen: Forgotpwd,
  navigationOptions: {
    header: null,
  }
},
});

export default AppNavigator;
