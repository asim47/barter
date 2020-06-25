import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import { COLORS } from '../../../colos/colors';
import { TextInput } from 'react-native-gesture-handler';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import VerifyCode from '../VerifyCode/VerifyCode';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../../store/Actions"

const SignUp = props => {
  const { navigate, openDrawer } = props.navigation;
  const dispatch = useDispatch();
  const [Active, setActive] = useState('');

  const [IndividualOrCompany, setIndividualOrCompany] = useState(true);
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [EmailToRemember, setEmailToRemember] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [POBox, setPOBox] = useState('');
  const [Address, setAddress] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState(new Date());
  const [ContactNumber, setContactNumber] = useState('');
  const [ImageToUpload, setImageToUpload] = useState('');

  const [show, setShow] = useState(false);

  const [ModelOpen, setModelOpen] = useState(false);

  const [ErrorMsg, setErrorMsg] = useState('');


  const Loading = useSelector(({ auth }) => auth.loading)
  const ErrorMsgFromBackend = useSelector(({ auth }) => auth.signUpErrorMsg)


  useEffect(() => {
    if (ErrorMsgFromBackend) {
      setErrorMsg(ErrorMsgFromBackend)
    }

  }, [ErrorMsgFromBackend])

  function UploadImage() {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setImageToUpload(image.data)
    }).catch((error) => {
      console.log(error)
    })
  }


  function registerWithUs() {
    if (!FirstName) return setErrorMsg("Please Enter a First Name")
    if (!LastName) return setErrorMsg("Please Enter a Last Name")
    if (!Username) return setErrorMsg("Please Enter a Username")
    if (!Email) return setErrorMsg("Please Enter a Email")
    if (!Email.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)) return setErrorMsg("Please Enter a valid Email")
    if (!Password) return setErrorMsg("Please Enter a Password")
    if (ConfirmPassword != Password) return setErrorMsg("Confirm Password and Password does Not match!")
    if (!ContactNumber) return setErrorMsg("PLease Enter a contact Number!")

    setErrorMsg("")
    const body = {
      "nUserName": Username,
      "nPassword": Password,
      "nEmail": Email,
      "nFirstName": FirstName,
      "nLastName": LastName,
      "nGender": "1",
      "nNewsletter": "true",
      "nDob": moment(DateOfBirth).format('YYYY-MM-DD'),
      "nNationality": "3",
      "nIsdeleted": "false",
      "nIsPublished": "true",
      "nCreatedBy": "mobile app",
      "nImage": ImageToUpload,
      "nUserType": IndividualOrCompany ? "1" : "2",
      "nDetails": "Registered From mobile App",
      "nIsNew": true,
      "nPhoto": ImageToUpload,
      "nCurrentID": -1,
      "nState": "Dubai",
      "nCity": "Dubai",
      "nAddress": Address,
      "nAddress2": Address,
      "nPostalCode": "87310",
      "nPhone": ContactNumber,
      "nWebsite": "www.google.com",
      "nPoints": 1000
    }
    dispatch(Actions.RegisterUser(body)).then((bool) => {

      if (bool) {
        setModelOpen(true)

        setIndividualOrCompany(true)
        setFirstName("")
        setLastName("")
        setUsername("")
        setEmailToRemember(Email)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setPOBox("")
        setAddress("")
        setDateOfBirth(new Date())
        setContactNumber("")
        setImageToUpload("")
        setErrorMsg("")
      }
    })

  }
  return (
    <ImageBackground
      style={{
        flex: 1,
        height: Dimensions.get('screen').height,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      source={require('../../../assests/user_registration.png')}>
      <KeyboardAwareScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 23, fontWeight: 'bold', margin: 20 }}>
          {I18nManager.isRTL ? 'سجل معنا' : 'Register with us'}
        </Text>

        <ClickAbleByAsim
          onPress={() => {
            UploadImage()
          }}
          style={{
            height: 70,
            width: 70,
            borderRadius: 100,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 6,
          }}>
          {
            ImageToUpload ? (
              <Image
                style={{
                  height: 70,
                  width: 70,
                }}
                source={{ uri: `data:image/png;base64,${ImageToUpload}` }}
              />
            ) : (
                <Image
                  style={{
                    height: 70,
                    width: 70,
                  }}
                  source={require('../../../assests/empty.png')}
                />
              )
          }

        </ClickAbleByAsim>
        <View style={{ width: '70%', height: 60, flexDirection: 'row' }}>
          <View
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <CheckBox
              center
              title={I18nManager.isRTL ? 'فرد' : 'Individual'}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={IndividualOrCompany}
              iconRight
              onPress={() => setIndividualOrCompany(true)}
              checkedColor={COLORS.orange}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
            />
          </View>
          <View
            style={{
              height: '100%',
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <CheckBox
              center
              title={I18nManager.isRTL ? 'شركة' : 'Company'}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={!IndividualOrCompany}
              iconRight
              onPress={() => setIndividualOrCompany(false)}
              checkedColor={COLORS.orange}
              containerStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
              }}
            />
          </View>
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'firstName' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 23, width: 23, marginRight: 10 }}
            source={require('../../../assests/icon_account.png')}
          />

          <TextInput
            onFocus={() => setActive('firstName')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'الاسم الاول' : 'First Name'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setFirstName(e)}
            value={FirstName}
          />
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'LastName' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 23, width: 23, marginRight: 10 }}
            source={require('../../../assests/icon_account.png')}
          />

          <TextInput
            onFocus={() => setActive('LastName')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'الكنية' : 'Last Name'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setLastName(e)}
            value={LastName}
          />
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'Username' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 23, width: 23, marginRight: 10 }}
            source={require('../../../assests/icon_account.png')}
          />

          <TextInput
            onFocus={() => setActive('Username')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'اسم المستخدم' : 'Username'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setUsername(e)}
            value={Username}
          />
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'Email' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 20, width: 19, marginRight: 10 }}
            source={require('../../../assests/new_email.png')}
          />

          <TextInput
            onFocus={() => setActive('Email')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'البريد الإلكتروني' : 'Email'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setEmail(e)}
            value={Email}
          />
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'Password' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 22, width: 16, marginRight: 10 }}
            source={require('../../../assests/password.png')}
          />

          <TextInput
            onFocus={() => setActive('Password')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'كلمه السر' : 'Password'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setPassword(e)}
            value={Password}
            secureTextEntry
          />
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'ConfirmPassword' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 22, width: 16, marginRight: 10 }}
            source={require('../../../assests/password.png')}
          />

          <TextInput
            onFocus={() => setActive('ConfirmPassword')}
            onBlur={() => setActive('')}
            placeholder={
              I18nManager.isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'
            }
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setConfirmPassword(e)}
            value={ConfirmPassword}
            secureTextEntry
          />
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'POBox' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 22, width: 22, marginRight: 10 }}
            source={require('../../../assests/red_pobox.png')}
          />

          <TextInput
            onFocus={() => setActive('POBox')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'صندوق بريد' : 'PO Box'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setPOBox(e)}
            value={POBox}
          />
        </View>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'Address' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 28, width: 15, marginRight: 10 }}
            source={require('../../../assests/red_address.png')}
          />

          <TextInput
            onFocus={() => setActive('Address')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'عنوان' : 'Address'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setAddress(e)}
            value={Address}
          />
        </View>

        <ClickAbleByAsim
          onPress={() => setShow(!show)}
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'DateOfBirth' ? COLORS.orange : 'white',
          }}>
          <>
            <Image
              style={{ height: 20, width: 18, marginRight: 10 }}
              source={require('../../../assests/red_calendar.png')}
            />

            <TextInput
              editable={false}
              onFocus={() => setActive('DateOfBirth')}
              onBlur={() => setActive('')}
              placeholder={
                I18nManager.isRTL ? 'تاريخ الولادة' : 'Date Of Birth'
              }
              style={{
                width: '75%',
                height: '95%',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
              // onChangeText={e => setDateOfBirth(e)}
              value={moment(DateOfBirth).format('DD-MM-YYYY')}
            />
          </>
        </ClickAbleByAsim>

        <View
          style={{
            height: 50,
            width: '85%',
            borderWidth: 1,
            borderRadius: 40,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            borderColor: Active == 'ContactNumber' ? COLORS.orange : 'white',
          }}>
          <Image
            style={{ height: 20, width: 18, marginRight: 10 }}
            source={require('../../../assests/red_calendar.png')}
          />

          <TextInput
            onFocus={() => setActive('ContactNumber')}
            onBlur={() => setActive('')}
            placeholder={I18nManager.isRTL ? 'رقم الاتصال' : 'Contact Number'}
            style={{
              width: '75%',
              height: '95%',
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}
            onChangeText={e => setContactNumber(e)}
            value={ContactNumber}
          />
        </View>


        {
          ErrorMsg ? (
            <Text style={{ color: "red", width: "80%", textAlign: "center" }}>
              {ErrorMsg}
            </Text>
          ) : null
        }

        <ClickAbleByAsim
          onPress={() => {
            // setModelOpen(true)
            registerWithUs()
          }}
          style={{
            backgroundColor: COLORS.orange,
            height: 45,
            marginTop: 20,
            marginBottom: 20,
            width: '80%',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 6,
            overflow: 'hidden',
          }}>

          {
            Loading ? <ActivityIndicator color="white" /> : (
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                {I18nManager.isRTL ? 'سجل معنا' : 'Register With Us'}
              </Text>
            )
          }
        </ClickAbleByAsim>
      </KeyboardAwareScrollView>
      {show && (
        <View style={{ backgroundColor: 'white', width: '100%' }}>
          <DateTimePicker
            style={{ width: '100%' }}
            maximumDate={new Date()}
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={DateOfBirth}
            mode={'date'}
            // is24Hour={true}
            display="default"
            onChange={(e, date) => {
              setShow(Platform.OS == 'ios');
              setDateOfBirth(new Date(date));
            }}
          />
        </View>
      )}
      <VerifyCode
        open={ModelOpen}
        navigate={navigate}
        setModalOpen={setModelOpen}
        EmailToRemember={EmailToRemember}
      />
    </ImageBackground>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
