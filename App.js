import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Main from './src/Main';

import { Reducer } from './store/Reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DrawerPage from './src/Drawer/Drawer';
import SplashScreen from 'react-native-splash-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from "react-native-vector-icons/Entypo"; // location-pin
import Ionicons from "react-native-vector-icons/Ionicons"; // md-paper
import MaterialIcons from "react-native-vector-icons/MaterialIcons" //sms
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"


export const store = createStore(Reducer, compose(applyMiddleware(thunk)));

const App = () => {
  useEffect(() => {
    AntDesign.loadFont();
    FontAwesome.loadFont();
    Entypo.loadFont();
    Ionicons.loadFont();
    MaterialIcons.loadFont();
    EvilIcons.loadFont();
    Feather.loadFont()
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#303E9F" />
      <Provider store={store}>
        <DrawerPage />
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  App: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default App;
