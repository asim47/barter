import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from "./Components/Home/Home"
import Listing from './Components/Listing/Listing';
import SignInLogin from './Components/SignInLogin/SignInLogin';
import SignUp from './Components/SignUp/SignUp';
import OfferDetails from './Components/OfferDetail/OfferDetail';
import CategoryList from './Components/CategoryList/CategoryList';
import BartarPoints from './Components/BartarPoints/BartarPoints';
import PostOffer1 from './Components/PostOffer/PostOffer1';
import PostOffer2 from './Components/PostOffer/PostOffer2';
import Faqs from './Components/FAQs/FAQs';
import InviteFriend from './Components/InviteFriend/InviteFriend';
import PointsHistory from './Components/PointsHistory/PointsHistory';
import ContactUs from './Components/ContactUs/ContactUs';
import MyOffers from './Components/MyOffers/MyOffers';
import SuggestionScreem from './Components/Suggestion/SuggestionScreem';
import OffersToOthersDetails from './Components/OffersToOthersDetails/OffersToOthersDetails';

const Stack = createStackNavigator();

const Main = () => {

  return (
      
      <Stack.Navigator
        headerMode="none"
        initialRouteName="Home"
        screenOptions={{
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS
        }}

      >
        <Stack.Screen  name="Home" component={Home} />
        <Stack.Screen name="Listing" component={Listing} />
        <Stack.Screen name="SignInLogin" component={SignInLogin} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="OfferDetails" component={OfferDetails} />
        <Stack.Screen name="CategoryList" component={CategoryList} />
        <Stack.Screen name="BartarPoints" component={BartarPoints} />
        <Stack.Screen name="PostOffer1" component={PostOffer1} />
        <Stack.Screen name="PostOffer2" component={PostOffer2} />
        <Stack.Screen name="Faqs" component={Faqs} />
        <Stack.Screen name="InviteFriends" component={InviteFriend} />
        <Stack.Screen name="PointsHistory" component={PointsHistory} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="MyOffers" component={MyOffers} />
        <Stack.Screen name="SuggestionScreem" component={SuggestionScreem} />
        <Stack.Screen name="OffersToOthersDetails" component={OffersToOthersDetails} />
      </Stack.Navigator>
  );
};

const styles = StyleSheet.create({

});

export default Main;
