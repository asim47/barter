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
import CodeInput from 'react-native-confirmation-code-input';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../../store/Actions"

const VerifyCode = ({ open, navigate, setModalOpen, EmailToRemember }) => {


  const dispatch = useDispatch();


  const [code, setCode] = useState("")
  const [ErrorMsg, setErrorMsg] = useState("")

  const ErrorMsgFromBackend = useSelector(({ auth }) => auth.VerifyError)
  const Loading = useSelector(({ auth }) => auth.loading)


  useEffect(() => {
    if (ErrorMsgFromBackend) {
      setErrorMsg(ErrorMsgFromBackend)
    }

  }, [ErrorMsgFromBackend])



  function VerifyCodeSubmit() {
    if (!code) return setErrorMsg("Please Enter a 4 digit Code")
    setErrorMsg("")

    const body = {
      "nEmail": EmailToRemember,
      "nCode": code
    }

    dispatch(Actions.VerifyAccountCodeSubmit(body)).then((bool) => {
      if(bool){
        setModalOpen(false)
        navigate("SignInLogin")
      }
    })

  }
  return (
    <Modal
    onModalHide={() => {
     setCode("")
     setErrorMsg("")
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
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: 400,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <Text style={{ fontSize: 23, color: COLORS.orange, marginTop: 20 }}>
          {I18nManager.isRTL ? 'تحقق من حسابك' : 'Verify Your Account'}
        </Text>
        <Text
          style={{
            width: '75%',
            fontSize: 16,
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          {I18nManager.isRTL
            ? 'يرجى إدخال الرمز على رقم هاتفك المرسل على هاتفك المحمول'
            : 'Please enter the code on your phone number sent on your mobile'}
        </Text>
        <Text
          style={{
            color: 'grey',
            textAlign: 'center',
            fontSize: 12,
            width: '75%',
          }}>
          {I18nManager.isRTL
            ? 'يرجى إدخال الرمز المرسل على بريدك الإلكتروني المسجل'
            : 'PLEASE ENTER THE CODE SENT ON YOUR REGISTERED EMAIL'}
        </Text>

        <View style={{ height: 90 }}>
          <CodeInput
            secureTextEntry
            keyboardType="numeric"
            codeLength={4}
            // compareWithCode='AsDW'
            activeColor={COLORS.orange}
            inactiveColor="grey"
            autoFocus={false}
            ignoreCase={true}
            inputPosition="center"
            // className='border-circle'
            size={50}
            onFulfill={(isValid, code) => setCode(isValid)}
            containerStyle={{ borderRadius: 10 }}
            codeInputStyle={{ borderWidth: 1.5, borderRadius: 10 }}
          />
        </View>
        {
          ErrorMsg ? (
            <Text style={{ color: "red", width: "80%", textAlign: "center", marginBottom: 10 }}>
              {ErrorMsg}
            </Text>
          ) : null
        }
        <ClickAbleByAsim
          onPress={() => VerifyCodeSubmit()}
          style={{
            backgroundColor: COLORS.blue,
            height: 45,
            // marginTop: -40,
            // marginBottom: 20,
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
                {I18nManager.isRTL ? 'التحقق' : 'Verify'}
              </Text>
            )
          }
        </ClickAbleByAsim>

        <ClickAbleByAsim style={{}} onPress={() => {
          dispatch(Actions.GenerateNewCode(EmailToRemember))
        }} >
          <Text style={{ color: 'grey', marginTop: 20 }}>
            {I18nManager.isRTL ? 'لم تستلم الرمز؟' : "Didn't Recieved code ?"}
            <Text style={{ fontWeight: 'bold' }}>
              {' '}
              {I18nManager.isRTL ? 'أعد الإرسال؟' : 'Send Again?'}
            </Text>
          </Text>
        </ClickAbleByAsim>
      </View>
    </Modal>
  );
};

export default VerifyCode;

const styles = StyleSheet.create({});
