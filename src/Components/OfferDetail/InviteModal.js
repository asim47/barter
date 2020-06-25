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


const InviteModal = ({ open, navigate, setModalOpen, }) => {


    const [Email, setEmail] = useState("")
    return (
        <Modal
            onModalHide={() => {

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
                    height: 260,
                    width: '80%',
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

                    <Text style={{ color: "grey", marginTop: 35, alignSelf: "flex-start", marginLeft: "10%" }}>
                        {
                            !I18nManager.isRTL ? "Share this ad with your friend" : "شارك هذا الإعلان مع صديقك"
                        }
                    </Text>


                    <Text style={{ color: COLORS.orange, alignSelf: "flex-start", marginLeft: "10%", marginTop: 30 }}>
                        {
                            I18nManager.isRTL ? "أدخل البريد الإلكتروني" : "Enter Email"
                        }
                    </Text>

                    {/* Email Text Field */}
                    <View
                        style={{
                            margin: 5,
                            borderWidth: 0.5,
                            borderColor: 'grey',
                            height: 45,
                            width: '80%',
                            borderRadius: 40,
                            marginTop: 20,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TextInput
                            //   onFocus={() => setUsernameActive(true)}
                            //   onBlur={() => setUsernameActive(false)}
                            placeholder={I18nManager.isRTL ? 'البريد الإلكتروني' : 'Email'}
                            style={{
                                width: '95%',
                                height: "95%",
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            onChangeText={e => setEmail(e)}
                            value={Email}
                        />
                    </View>
                    {/* Email Text Field */}



          <ClickAbleByAsim
            onPress={() => {
                setEmail("")
                setModalOpen(false)
            }}
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
                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                  {I18nManager.isRTL ? "إرسال": 'Submit'}
                </Text>
            }

          </ClickAbleByAsim>
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    )
}

export default InviteModal

const styles = StyleSheet.create({})
