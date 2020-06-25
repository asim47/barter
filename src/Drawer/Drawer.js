import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from '../Main';
import DrawerComponent from './DrawerComponet';

const Drawer = createDrawerNavigator();

const DrawerPage = () => {


  return (
      <Drawer.Navigator
        drawerStyle={{width: '80%'}}
        initialRouteName="App"
        drawerContent={e => <DrawerComponent {...e} />}>
        <Drawer.Screen name="App" component={Main} />
      </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({});

export default DrawerPage;
