import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  I18nManager,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../../colos/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import {
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../../store/Actions"
const LoginModal = ({ setVerifyMOpen, EmailToRemember, navigate, open, setModalOpen, setForgetModalOpen, }) => {

  const dispatch = useDispatch()


  const [UsernameActive, setUsernameActive] = useState(false);
  const [PasswordActive, setPasswordActive] = useState(false);
  const [UsernameText, setUsernameText] = useState('');
  const [PasswordText, setPasswordText] = useState('');
  const [ErrorMsg, setErrorMsg] = useState('');


  const Loading = useSelector(({ auth }) => auth.loading)
  const ErrorMsgFromBackend = useSelector(({ auth }) => auth.errorMsg)


  useEffect(() => {
    if (ErrorMsgFromBackend) {
      setErrorMsg(ErrorMsgFromBackend)
    }

  }, [ErrorMsgFromBackend])
  function LoginPress() {
    if (!UsernameText) return setErrorMsg("Please Enter a Username")
    if (!PasswordText) return setErrorMsg("Please Enter a Password")
    setErrorMsg("");
    let body = {
      password: PasswordText,
      username: UsernameText,
    }
    dispatch(Actions.LoginAttempt(body, navigate, setModalOpen, setVerifyMOpen,
      EmailToRemember,
    )).then((bool => {
      if (bool) {
        setModalOpen(false);
        dispatch(Actions.GenerateNewCode(EmailToRemember))
        setTimeout(() => {
          setVerifyMOpen(true);
        }, 1000);
      }
    }))
  }
  return (
    <Modal
      onModalHide={() => {
        setUsernameText()
        setPasswordText()
        setErrorMsg()
      }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      isVisible={open}
      hasBackdrop
      avoidKeyboard
      onBackButtonPress={() => setModalOpen(false)}
      onBackdropPress={() => setModalOpen(false)}>
      <View
        style={{
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ClickAbleByAsim
            onPress={() => setModalOpen(false)}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              padding: 10,
            }}>
            <Image
              style={{
                width: 28,
                height: 28,
              }}
              source={require('../../../assests/close.png')}
            />
          </ClickAbleByAsim>

          <Text
            style={{
              margin: 15,
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.orange,
            }}>
            {I18nManager.isRTL ? 'تسجيل الدخول' : 'Login'}
          </Text>
          <ClickAbleByAsim
            onPress={() => { }}
            style={{
              height: 45,
              minWidth: '60%',
              borderRadius: 5,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#3761B0',
              padding: 5,
            }}>
            <>
              <AntDesign name="facebook-square" color="white" size={16} />
              <Text
                style={{
                  marginLeft: 5,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 13,
                }}>
                {I18nManager.isRTL
                  ? 'تواصل مع الفيسبوك'
                  : 'Continue with Facebook'}
              </Text>
            </>
          </ClickAbleByAsim>

          <Text style={{ margin: 10, fontSize: 12 }}>
            {I18nManager.isRTL
              ? 'يرجى إدخال معلومات تسجيل الدخول'
              : 'Please enter login information'}
          </Text>

          <View
            style={{
              margin: 5,
              borderWidth: 0.5,
              borderColor: UsernameActive ? COLORS.orange : 'grey',
              height: 45,
              width: '80%',
              borderRadius: 40,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ height: 23, width: 23, marginRight: 10 }}
              source={require('../../../assests/icon_account.png')}
            />

            <TextInput
              onFocus={() => setUsernameActive(true)}
              onBlur={() => setUsernameActive(false)}
              placeholder={I18nManager.isRTL ? 'اسم المستخدم' : 'Username'}
              style={{
                width: '75%',
                height: '95%',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
              onChangeText={e => setUsernameText(e)}
              value={UsernameText}
            />
          </View>

          <View
            style={{
              margin: 5,
              borderWidth: 0.5,
              borderColor: PasswordActive ? COLORS.orange : 'grey',
              height: 45,
              width: '80%',
              borderRadius: 40,
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{ height: 23, width: 16, marginRight: 10 }}
              source={require('../../../assests/password.png')}
            />

            <TextInput
              onFocus={() => setPasswordActive(true)}
              onBlur={() => setPasswordActive(false)}
              placeholder={I18nManager.isRTL ? 'كلمه السر' : 'Password'}
              style={{
                width: '75%',
                height: '95%',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}
              secureTextEntry
              onChangeText={e => setPasswordText(e)}
              value={PasswordText}
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
            onPress={() => LoginPress()}
            style={{
              backgroundColor: COLORS.blue,
              height: 45,
              marginTop: 15,
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
                  {I18nManager.isRTL ? 'تسجيل الدخول' : 'Login'}
                </Text>
              )
            }

          </ClickAbleByAsim>

          <ClickAbleByAsim
            style={{ padding: 10 }}
            onPress={() => {
              setModalOpen(false);
              setTimeout(() => {
                setForgetModalOpen(true);
              }, 1000);
            }}>
            <Text style={{ color: COLORS.blue }}>
              {I18nManager.isRTL ? 'نسيت كلمة المرور؟' : 'Forget Password?'}
            </Text>
          </ClickAbleByAsim>

          <ClickAbleByAsim
            style={{ padding: 10, paddingTop: 4 }}
            onPress={() => {
              setModalOpen(false);
              navigate('Signup');
            }}>
            <Text style={{ color: COLORS.orange }}>
              {I18nManager.isRTL ? 'لا تملك حساب؟' : "Don't have an account?"}
            </Text>
          </ClickAbleByAsim>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default LoginModal;

const styles = StyleSheet.create({});
