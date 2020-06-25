import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  I18nManager,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../../../colos/colors';
import Search from '../Search/Search';
import NotificationDialog from '../NotificationDialog/NotificationDialog';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import AntDesign from "react-native-vector-icons/AntDesign"

const PointsHistory = (props) => {
  const { navigate, openDrawer, goBack } = props.navigation;
  const { totalPoints } = props.route.params
  const dispatch = useDispatch();


  const [openSearch, setOpeneSearch] = useState(false);
  const [openNoti, setOpeneNoti] = useState(false);

  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const MyPoints = useSelector(({ offer }) => offer.MyPoints);

  useEffect(() => {
    dispatch(Actions.GettingMyOffers())
  }, [])

  return !MyPoints ? (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}><ActivityIndicator color={COLORS.orange} /></View>
  ) : (
      <View style={{ flex: 1, alignItems: "center" }}>
        {/* Header */}
        <View style={{ height: 60, width: "100%", backgroundColor: COLORS.blue, alignItems: "center", flexDirection: "row" }}>
          <ClickAbleByAsim onPress={() => goBack()} style={{ height: "100%", width: 50, justifyContent: "center", padding: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
            <AntDesign
              name="arrowleft"
              color="white"
              size={30}
            />
          </ClickAbleByAsim>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            {
              I18nManager.isRTL ? "نقاط الولاء" : "LOYALITY POINTS"
            }
          </Text>

          <View
            style={{
              flex: 1,

              justifyContent: isAuth ? 'space-around' : "flex-end",
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <ClickAbleByAsim
              style={{ paddingTop: 20, paddingBottom: 20, marginRight: 20 }}
              onPress={() => {
                setOpeneSearch(true);
              }}>
              <Image
                style={{ height: 18, width: 18 }}
                source={require('../../../assests/search.png')}
              />
            </ClickAbleByAsim>
            {
              isAuth ? (
                <>
                  <ClickAbleByAsim
                    style={{ paddingTop: 20, paddingBottom: 20 }}
                    onPress={() => setOpeneNoti(true)}>
                    <Image
                      style={{ height: 18, width: 18 }}
                      source={require('../../../assests/bell.png')}
                    />
                  </ClickAbleByAsim>

                  <ClickAbleByAsim
                    style={
                      Platform.OS == 'ios' ? {} : { paddingTop: 20, paddingBottom: 20 }
                    }
                    onPress={() => navigate('PostOffer1')}>
                    <Text style={{ color: 'white', fontSize: 30 }}> + </Text>
                  </ClickAbleByAsim>

                  <ClickAbleByAsim
                    style={
                      Platform.OS == 'ios' ? {} : { paddingTop: 20, paddingBottom: 20 }
                    }
                    onPress={() => navigate('BartarPoints')}>
                    <Text style={{ color: 'white', fontSize: 20 }}> $ </Text>
                  </ClickAbleByAsim>


                </>
              ) : null
            }
          </View>

        </View>
        {/* Header */}


        {/* Points Total */}
        <View style={{ height: 150, width: "100%", backgroundColor: COLORS.orange, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "white" }}>
            {
              I18nManager.isRTL ? "رصيدك الحالي" : "YOUR CURRENT BALANCE"
            }
          </Text>

          <Text style={{ color: "white", fontSize: 30 }}>
            {totalPoints}
          </Text>
          <Text>
            {
              I18nManager.isRTL ? "نقاط" : "POINTS"
            }
          </Text>
        </View>
        {/* Points Total */}


        {/* Points History */}
        <View style={{ height: 30, width: "100%", backgroundColor: "#ccc", justifyContent: "center" }}>
          <Text style={{ color: "grey", marginLeft: "5%" }}>
            Points History
              </Text>
        </View>
        {/* Points History */}



        {/* Listing */}
        <FlatList
          data={MyPoints}
          renderItem={({ item }) => {
            return (
              <View style={{ borderBottomWidth: 0.3, height: 100, width: "100%", flexDirection: "row", }}>
                <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                  <Image
                    style={{ height: 66, width: 39 }}
                    source={require("../../../assests/badge.png")}
                  />
                </View>
                <View style={{ width: "58%", justifyContent: "center" }}>
                  <Text style={{ color: "grey", fontSize: 13 }}>
                    {
                      item.RefNo
                    }
                  </Text>
                  <Text style={{ fontSize: 16 }}>
                    {
                      item.Description
                    }
                  </Text>
                  <Text style={{ color: "grey", fontSize: 13 }}>
                    {
                      item.CreatedDate
                    }
                  </Text>
                </View>
                <View style={{ width: "22%", justifyContent: "center", alignItems: "center" }}>
                  <Text>
                    <Text style={{ fontSize: 20, color: item.LoyaltyPoints > 0 ? "green" : COLORS.orange }}>
                      {
                        item.LoyaltyPoints
                      }
                    </Text>
                    <Text style={{ color: "grey", fontSize: 10 }}>
                      PTS
                  </Text>
                  </Text>
                </View>
              </View>
            )
          }}
          keyExtractor={e => e.ID}
        />
        {/* Listing */}

        {/* Dialog */}
        <Search navigate={navigate} open={openSearch} close={() => setOpeneSearch(false)} />
        <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />
        {/* Dialog */}
      </View>
    )
}

export default PointsHistory

const styles = StyleSheet.create({

})
