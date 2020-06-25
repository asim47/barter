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
  TextInput,
  Dimensions,
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
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ResetPasswordModel from './ResetPasswordModel';

const EditAbleDrawerComponent = ({setIsEditable, UserData, navigate}) => {
  const dispatch = useDispatch();
  const [ImageToShow, setImageToShow] = useState('');
  const [ImageData, setImageData] = useState('');
  const [Fullname, setFullname] = useState('');
  const [Mobile, setMobile] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [POBox, setPOBox] = useState('');
  const [Address, setAddress] = useState('');
  const [PasswordOpen, setPasswordOpen] = useState('');
  const [DatePickerOpen, setDatePickerOpen] = useState(false);

  const Loading = useSelector(({auth}) => auth.loading);

  useEffect(() => {
    setImageToShow(UserData.UserImage);
    setFullname(`${UserData?.UserFirstName}`);
    setMobile(UserData.PhoneNumber);
    setDateOfBirth(UserData.DateOfBirth);
    setPOBox(UserData.PostalCode);
    setAddress(UserData.Address1);
  }, []);

  function UploadImage() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        setImageData(image.data);
        setImageToShow(`data:image/png;base64,${image.data}`);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function CleanUp() {}

  function Update() {
    const body = {
      nUserName: UserData.UserName,
      nPassword: '',
      nEmail: UserData.UserEmail,
      nFirstName: Fullname,
      nLastName: Fullname,
      nGender: '1',
      nNewsletter: 'true',
      nDob: DateOfBirth,
      nNationality: '3',
      nIsdeleted: 'false',
      nIsPublished: 'true',
      nCreatedBy: 'mobile app',
      nImage: ImageData,
      nUserType: '1',
      nDetails: 'Registered From mobile App',
      nIsNew: false,
      nPhoto: ImageData,
      nCurrentID: UserData.ID,
      nState: UserData.Country,
      nCity: UserData.City,
      nAddress: Address,
      nAddress2: UserData.Address2,
      nPostalCode: POBox,
      nPhone: Mobile,
      nWebsite: 'www.google.com',
      nPoints: UserData.TotalPoints,
    };
    dispatch(Actions.RegisterUser(body, true));
  }
  return (
    <View style={styles.DrawerComponent}>
      <KeyboardAwareScrollView
        style={{height: Dimensions.get('window').height}}>
        <TouchableHighlight
          onPress={() => setIsEditable(false)}
          style={{
            position: 'absolute',
            top: 15,
            right: 5,
            padding: 10,
            zIndex: 100,
          }}>
          <Image
            style={{
              height: 25,
              width: 25,
            }}
            source={require('../../assests/crossing.png')}
          />
        </TouchableHighlight>

        <View style={styles.box1}>
          <ClickAbleByAsim
            onPress={() => UploadImage()}
            style={styles.imageBox}>
            {ImageToShow ? (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{uri: ImageToShow}}
              />
            ) : (
              <Image
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../../assests/empty.png')}
              />
            )}
          </ClickAbleByAsim>
          <Text style={{color: 'grey', marginTop: 15, fontSize: 12}}>
            {I18nManager.isRTL ? 'الاسم الكامل' : 'Full Name'}
          </Text>
          <TextInput
            style={{
              color: 'white',
              fontSize: 15,
              padding: 0,
              textAlign: 'center',
            }}
            value={Fullname}
            onChangeText={e => setFullname(e)}
          />
        </View>
        <ClickAbleByAsim
          onPress={() => setPasswordOpen(true)}
          style={styles.box2}>
          <Text style={{color: 'grey', marginTop: 15, fontSize: 12}}>
            {I18nManager.isRTL ? 'كلمه السر' : 'Password'}
          </Text>
          <Text style={{color: 'grey', color: 'white', fontSize: 16}}>
            *********
          </Text>
        </ClickAbleByAsim>
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
              {/* <Text style={styles.heading2}>
                                {
                                    UserData?.PhoneNumber
                                }
                            </Text> */}
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 15,
                  padding: 0,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                }}
                value={Mobile}
                onChangeText={e => setMobile(e)}
              />
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
            <ClickAbleByAsim
              onPress={() => setDatePickerOpen(!DatePickerOpen)}
              style={styles.infoBoxInfo}>
              <Text style={styles.heading}>
                {I18nManager.isRTL ? 'تاريخ الميلاد' : 'Date Of Birth'}
              </Text>
              <Text style={styles.heading2}>{DateOfBirth}</Text>
            </ClickAbleByAsim>
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
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 15,
                  padding: 0,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                }}
                value={POBox}
                onChangeText={e => setPOBox(e)}
              />
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
              <TextInput
                style={{
                  color: 'white',
                  fontSize: 15,
                  padding: 0,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                }}
                value={Address}
                onChangeText={e => setAddress(e)}
              />
            </View>
          </View>
        </View>
        <View style={styles.box4}>
          <ClickAbleByAsim
            style={styles.button1}
            onPress={() => {
              Update();
            }}>
            {Loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={{color: 'white', fontSize: 17}}>
                {I18nManager.isRTL ? 'تحديث' : 'Update'}
              </Text>
            )}
          </ClickAbleByAsim>
        </View>
      </KeyboardAwareScrollView>
      {DatePickerOpen && (
        <View style={{backgroundColor: 'white', width: '100%'}}>
          <DateTimePicker
            style={{width: '100%'}}
            maximumDate={new Date()}
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode={'date'}
            // is24Hour={true}
            display="default"
            onChange={(e, date) => {
              setDatePickerOpen(Platform.OS == 'ios');
              setDateOfBirth(moment(date).format('YYYY-MM-DD'));
            }}
          />
        </View>
      )}

      <ResetPasswordModel
        open={PasswordOpen}
        navigate={navigate}
        setModalOpen={setPasswordOpen}
        userName={UserData.UserName}
      />
    </View>
  );
};

export default EditAbleDrawerComponent;
const styles = StyleSheet.create({
  DrawerComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#2E2D32',
    width: '100%',
    paddingTop: 10,
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
    marginTop: 70,
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
