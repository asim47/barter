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
const ForgetModal = ({ open, navigate, setModalOpen, setModalLoginOpen }) => {


  const dispatch = useDispatch()
  const [UsernameActive, setUsernameActive] = useState(false);
  const [UsernameText, setUsernameText] = useState('');
  const [ErrorMsg, setErrorMsg] = useState('');

  const ErrorMsgFromBackend = useSelector(({ auth }) => auth.forgetModalError)
  const Loading = useSelector(({ auth }) => auth.loading)
  useEffect(() => {
    if (ErrorMsgFromBackend) {
      setErrorMsg(ErrorMsgFromBackend)
    }

  }, [ErrorMsgFromBackend])
  return (
    <Modal
    onModalHide={() => {
      setUsernameText("")
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
          justifyContent: 'center',
          alignItems: 'center',
          height: 330,
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
              color: COLORS.orange,
              margin: 20,
              fontSize: 23,
              fontWeight: 'bold',
            }}>
            {I18nManager.isRTL ? 'نسيت كلمة المرور؟' : 'Forget Password?'}
          </Text>

          <Text style={{ width: '75%', textAlign: 'center', fontSize: 15 }}>
            {I18nManager.isRTL
              ? 'يرجى إدخال بريدك الإلكتروني أدناه ، وسوف نرسل لك رابطًا لاستعادة كلمة المرور الخاصة بك!'
              : 'Please enter your email below , We will send you a link to recover your password!'}
          </Text>

          <View
            style={{
              margin: 5,
              borderWidth: 0.5,
              borderColor: UsernameActive ? COLORS.orange : 'grey',
              height: 45,
              width: '80%',
              borderRadius: 40,
              marginTop: 20,
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
          {
            ErrorMsg ? (
              <Text style={{ color: "red", width: "80%", textAlign: "center" }}>
                {ErrorMsg}
              </Text>
            ) : null
          }
          <ClickAbleByAsim
            onPress={() => {
              if (!UsernameText) return setErrorMsg("Enter a Username")
              setErrorMsg("")
              dispatch(Actions.ForgotPassword(UsernameText))
            }

            }
            style={{
              backgroundColor: COLORS.blue,
              height: 45,
              marginTop: 5,
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
                  {I18nManager.isRTL ? 'خضع' : 'Submit'}
                </Text>
              )
            }

          </ClickAbleByAsim>

          <ClickAbleByAsim
            onPress={() => {
              setModalOpen(false);

              setTimeout(() => {
                setModalLoginOpen(true);
              }, 1000);
            }}
            style={{ padding: 10, margin: 10 }}>
            <Text style={{ color: COLORS.blue, fontSize: 23 }}>
              {I18nManager.isRTL ? 'تسجيل الدخول' : 'Login'}
            </Text>
          </ClickAbleByAsim>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default ForgetModal;

const styles = StyleSheet.create({});
