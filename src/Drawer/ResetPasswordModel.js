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
import { COLORS } from '../../colos/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ClickAbleByAsim from "../Common/ClickAbleByAsim";
import {
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native-gesture-handler';
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../store/Actions"
const ResetPasswordModel = ({ open, navigate, setModalOpen, userName }) => {


    const dispatch = useDispatch()
    const [FieldActve, setFieldActve] = useState("");
    const [OldPassword, setOldPassword] = useState('');
    const [NewPassword, setNewPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [ErrorMsg, setErrorMsg] = useState('');

    const ErrorMsgFromBackend = useSelector(({ auth }) => auth.forgetModalError)
    const [Loading, setLoading] = useState(false)


    useEffect(() => {
        if (ErrorMsgFromBackend) {
            setErrorMsg(ErrorMsgFromBackend)
        }

    }, [ErrorMsgFromBackend])
    function SubmitResetPass() {
        if (!OldPassword) return setErrorMsg("Please Enter your old password!")
        if (!NewPassword) return setErrorMsg("Please Enter your new password!")
        if (ConfirmPassword != NewPassword) return setErrorMsg("New Password and confirm password does not match")

        setErrorMsg("")
        setLoading(true)

        const body = {
            newPassword: NewPassword,
            _password: OldPassword,
            _userName: userName,
        }

        dispatch(Actions.ResetPassword(body)).then((err)=>{
            setLoading(false)
            if(err){
                setErrorMsg(err)
            }else{
                setModalOpen(false)
            }
        })
    }
    return (
        <Modal
            onModalHide={() => {
                setErrorMsg("")
                setNewPassword("")
                setOldPassword("")
                setConfirmPassword("");
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
                    height: 430,
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
                            source={require('../../assests/close.png')}
                        />
                    </ClickAbleByAsim>

                    <Text
                        style={{
                            color: COLORS.orange,
                            margin: 20,
                            fontSize: 23,
                            fontWeight: 'bold',
                        }}>
                        {I18nManager.isRTL ? 'نسيت كلمة المرور؟' : 'Reset Password'}
                    </Text>

                    <Text style={{ width: '75%', textAlign: 'center', fontSize: 15 }}>
                        {I18nManager.isRTL
                            ? 'مرحبا ، يمكنك تحديث كلمة المرور الخاصة بك بسهولة'
                            : 'Hello, you can update your password easily'}
                    </Text>

                    <View
                        style={{
                            margin: 5,
                            borderWidth: 0.5,
                            borderColor: FieldActve == "old" ? COLORS.orange : 'grey',
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
                            source={require('../../assests/password.png')}
                            resizeMode="contain"
                        />

                        <TextInput
                            secureTextEntry
                            onFocus={() => setFieldActve("old")}
                            onBlur={() => setFieldActve("")}
                            placeholder={I18nManager.isRTL ? 'كلمة سر قديمة' : 'Old Password'}
                            style={{
                                width: '75%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            onChangeText={e => setOldPassword(e)}
                            value={OldPassword}
                        />
                    </View>


                    <View
                        style={{
                            margin: 5,
                            borderWidth: 0.5,
                            borderColor: FieldActve == "new" ? COLORS.orange : 'grey',
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
                            source={require('../../assests/password.png')}
                            resizeMode="contain"
                        />

                        <TextInput
                            secureTextEntry
                            onFocus={() => setFieldActve("new")}
                            onBlur={() => setFieldActve("")}
                            placeholder={I18nManager.isRTL ? 'كلمة السر الجديدة' : 'New Password'}
                            style={{
                                width: '75%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            value={NewPassword}
                            onChangeText={e => setNewPassword(e)}
                        />
                    </View>
                    <View
                        style={{
                            margin: 5,
                            borderWidth: 0.5,
                            borderColor: FieldActve == "confirm" ? COLORS.orange : 'grey',
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
                            source={require('../../assests/password.png')}
                            resizeMode="contain"
                        />

                        <TextInput
                            secureTextEntry
                            onFocus={() => setFieldActve("confirm")}
                            onBlur={() => setFieldActve("")}
                            placeholder={I18nManager.isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                            style={{
                                width: '75%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            value={ConfirmPassword}
                            onChangeText={e => setConfirmPassword(e)}
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
                            SubmitResetPass()
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

                </KeyboardAwareScrollView>
            </View>
        </Modal>
    );
}

export default ResetPasswordModel

const styles = StyleSheet.create({})
