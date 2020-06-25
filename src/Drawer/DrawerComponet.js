import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
  I18nManager,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Phone from '../../assests/p_mobile.png';
import Calender from '../../assests/p_calendar.png';
import POBOX from '../../assests/p_po_box.png';
import Location from '../../assests/p_location.png';
import Email from '../../assests/p_email.png';
import ClickAbleByAsim from '../Common/ClickAbleByAsim';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart';
import SplashScreen from 'react-native-splash-screen';
import {useSelector, useDispatch} from 'react-redux';
import * as Actions from '../../store/Actions';
import EditAbleDrawerComponent from './EditAbleDrawerComponent';

const DrawerComponent = ({navigation}) => {
  const {navigate, openDrawer} = navigation;
  const dispatch = useDispatch();

  const [IsEditable, setIsEditable] = useState(false);

  const isAuth = useSelector(({auth}) => auth.isAuth);
  const UserData = useSelector(({auth}) => auth.userData);

  if (!isAuth) {
    return (
      <>
        <View style={styles.DrawerComponent}>
          <ClickAbleByAsim
            onPress={() => navigate('SignInLogin')}
            style={styles.box1}>
            <>
              <View style={styles.imageBox}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../../assests/empty.png')}
                />
              </View>

              <Text style={{color: 'white', marginTop: 2, fontSize: 16}}>
                {I18nManager.isRTL ? 'تسجيل الدخول' : 'Sign In'}
              </Text>
            </>
          </ClickAbleByAsim>
          <View style={{flex: 3.4}} />

          <ClickAbleByAsim
            onPress={() => {
              I18nManager.forceRTL(!I18nManager.isRTL);
              SplashScreen.show();
              RNRestart.Restart();
            }}
            style={styles.languageSwitch}>
            <>
              <View
                style={
                  I18nManager.isRTL ? styles.notSelected : styles.selected
                }>
                <Text
                  style={
                    I18nManager.isRTL
                      ? styles.notSelectedText
                      : styles.SelectedText
                  }>
                  En
                </Text>
              </View>
              <View
                style={
                  I18nManager.isRTL ? styles.selected : styles.notSelected
                }>
                <Text
                  style={
                    I18nManager.isRTL
                      ? styles.SelectedText
                      : styles.notSelectedText
                  }>
                  Ar
                </Text>
              </View>
            </>
          </ClickAbleByAsim>

          <View
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              flexDirection: 'row',
            }}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'grey', fontSize: 13, paddingTop: 40}}>
                {I18nManager.isRTL ? 'أسئلة وأجوبة' : "FAQ's"}
              </Text>
            </TouchableOpacity>
            <Text style={{color: 'grey', fontSize: 13, paddingTop: 40}}>
              {'  '} | {'  '}
            </Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{color: 'grey', fontSize: 13, paddingTop: 40}}>
                {I18nManager.isRTL ? 'اتصل بنا' : 'Contact Us'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }

  if (IsEditable) {
    return (
      <EditAbleDrawerComponent
        setIsEditable={setIsEditable}
        UserData={UserData}
        navigate={navigate}
      />
    );
  }
  return (
    <>
      <View style={styles.DrawerComponent}>
        <TouchableHighlight
          onPress={() => {
            setIsEditable(true);
          }}
          style={{
            position: 'absolute',
            top: 25,
            right: 10,
            padding: 10,
            zIndex: 100,
            // backgroundColor: 'blue',
          }}>
          <Image
            style={{
              height: 25,
              width: 25,
            }}
            source={require('../../assests/p_edit_icons.png')}
          />
        </TouchableHighlight>

        <View style={styles.box1}>
          <View style={styles.imageBox}>
            <Image
              style={{
                height: '100%',
                width: '100%',
              }}
              source={require('../../assests/empty.png')}
            />
          </View>
          <Text style={{color: 'grey', marginTop: 15, fontSize: 11}}>
            {I18nManager.isRTL ? 'أهلا بك' : 'WELCOME'}
          </Text>
          <Text style={{color: 'white', marginTop: 2, fontSize: 16}}>
            {`${UserData?.UserFirstName}`}
          </Text>
        </View>
        <View style={styles.box2}>
          <View style={styles.PointsBox}>
            <ClickAbleByAsim
              onPress={() =>
                navigate('PointsHistory', {totalPoints: UserData?.TotalPoints})
              }
              style={styles.PointBoxInside}>
              <Text style={styles.insideTexttop}>
                {I18nManager.isRTL ? 'مجمل النقاط' : 'TOTAL POINTS'}
              </Text>
              <Text style={styles.num}>{UserData?.TotalPoints}</Text>
            </ClickAbleByAsim>
            <ClickAbleByAsim
              onPress={() => navigate('MyOffers')}
              style={{
                ...styles.PointBoxInside,
                borderLeftWidth: 0.3,
                borderRightWidth: 0.3,
              }}>
              <Text style={styles.insideTexttop}>
                {I18nManager.isRTL ? 'نشر العروض' : 'POSTED OFFERS'}
              </Text>
              <Text style={styles.num}>{UserData?.TotalOffers}</Text>
            </ClickAbleByAsim>
            <ClickAbleByAsim
              onPress={() => navigate('MyOffers')}
              style={styles.PointBoxInside}>
              <Text style={styles.insideTexttop}>
                {I18nManager.isRTL ? 'عروضي' : 'MY OFFERS'}
              </Text>

              <Text style={styles.num}>{UserData?.TotalOffersToOthers}</Text>
            </ClickAbleByAsim>
          </View>
        </View>
        <View style={styles.box3}>
          <View style={styles.infoBox}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Image
                resizeMode="center"
                style={{height: '63%', width: '53%'}}
                source={Phone}
              />
            </View>
            <View style={styles.infoBoxInfo}>
              <Text style={styles.heading}>
                {I18nManager.isRTL ? 'التليفون المحمول' : 'Mobile'}
              </Text>
              <Text style={styles.heading2}>{UserData?.PhoneNumber}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Image
                resizeMode="center"
                style={{height: '45%', width: '59%'}}
                source={Calender}
              />
            </View>
            <View style={styles.infoBoxInfo}>
              <Text style={styles.heading}>
                {I18nManager.isRTL ? 'تاريخ الميلاد' : 'Date Of Birth'}
              </Text>
              <Text style={styles.heading2}>{UserData?.DateOfBirth}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Image style={{height: '45%', width: '59%'}} source={Email} />
            </View>
            <View style={styles.infoBoxInfo}>
              <Text style={styles.heading}>
                {I18nManager.isRTL ? 'عنوان البريد الإلكتروني' : 'Email'}
              </Text>
              <Text style={styles.heading2}>{UserData?.UserEmail}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Image
                resizeMode="center"
                style={{height: '48%', width: '70%'}}
                source={POBOX}
              />
            </View>
            <View style={styles.infoBoxInfo}>
              <Text style={styles.heading}>
                {I18nManager.isRTL ? 'صندوق بريد' : 'PO BOX'}
              </Text>
              <Text style={styles.heading2}>{UserData?.PostalCode}</Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <View
              style={{
                height: '100%',
                width: '15%',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
              <Image
                resizeMode="center"
                style={{height: '52%', width: '40%'}}
                source={Location}
              />
            </View>
            <View style={styles.infoBoxInfo}>
              <Text style={styles.heading}>
                {I18nManager.isRTL ? 'عنوان' : 'Address'}
              </Text>
              <Text style={styles.heading2}>{UserData?.Address1}</Text>
            </View>
          </View>
        </View>
        <View style={styles.box4}>
          <ClickAbleByAsim
            style={styles.button1}
            onPress={() => {
              dispatch(Actions.Logout());
              navigate('Home');
            }}>
            <Text style={{color: 'white', fontSize: 17}}>
              {I18nManager.isRTL ? 'خروج' : 'Sign Out'}
            </Text>
          </ClickAbleByAsim>
        </View>

        <ClickAbleByAsim
          onPress={() => {
            I18nManager.forceRTL(!I18nManager.isRTL);
            SplashScreen.show();
            RNRestart.Restart();
          }}
          style={styles.languageSwitch}>
          <>
            <View
              style={I18nManager.isRTL ? styles.notSelected : styles.selected}>
              <Text
                style={
                  I18nManager.isRTL
                    ? styles.notSelectedText
                    : styles.SelectedText
                }>
                En
              </Text>
            </View>
            <View
              style={I18nManager.isRTL ? styles.selected : styles.notSelected}>
              <Text
                style={
                  I18nManager.isRTL
                    ? styles.SelectedText
                    : styles.notSelectedText
                }>
                Ar
              </Text>
            </View>
          </>
        </ClickAbleByAsim>

        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={() => navigate('Faqs')}>
            <Text style={{color: 'grey', fontSize: 13, paddingTop: 40}}>
              {I18nManager.isRTL ? 'أسئلة وأجوبة' : "FAQ's"}
            </Text>
          </TouchableOpacity>
          <Text style={{color: 'grey', fontSize: 13, paddingTop: 40}}>
            {'  '} | {'  '}
          </Text>
          <TouchableOpacity onPress={() => navigate('ContactUs')}>
            <Text style={{color: 'grey', fontSize: 13, paddingTop: 40}}>
              {I18nManager.isRTL ? 'اتصل بنا' : 'Contact Us'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  DrawerComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#2E2D32',
  },
  box1: {
    paddingTop: 10,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box2: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box3: {
    flex: 2,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box4: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  imageBox: {
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 1000,
    borderColor: 'grey',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PointsBox: {
    borderWidth: 0.3,
    borderColor: 'grey',
    height: 60,
    width: '90%',
    borderRadius: 6,
    flexDirection: 'row',
  },
  PointBoxInside: {
    flex: 1,
    borderColor: 'grey',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  insideTexttop: {
    fontSize: 9.8,
    color: 'silver',
  },
  num: {
    color: '#FF6412',
    marginTop: 5,
    fontWeight: 'bold',
  },
  infoBox: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
  },
  infoBoxInfo: {
    height: '100%',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  heading: {
    color: 'grey',
    fontSize: 13,
  },
  heading2: {
    color: 'white',
    fontSize: 16,
    marginTop: 4,
  },
  button1: {
    backgroundColor: '#FF6412',
    height: 50,
    width: 180,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    marginTop: -70,
    overflow: 'hidden',
  },
  languageSwitch: {
    borderWidth: 1,
    borderColor: 'white',
    height: 35,
    width: 70,
    position: 'absolute',
    bottom: 10,
    left: 20,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  selected: {
    backgroundColor: 'white',
    color: '#FF6412',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  SelectedText: {
    color: '#FF6412',
    fontWeight: 'bold',
  },
  notSelected: {
    backgroundColor: 'transparent',
    color: '#FF6412',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  notSelectedText: {
    color: 'white',
  },
});

export default DrawerComponent;
