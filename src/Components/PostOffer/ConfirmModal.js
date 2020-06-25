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
import { set } from 'react-native-reanimated';

const ConfirmModal = ({ open, setModalOpen, navigate }) => {

    return (
        <Modal
            onModalHide={() => {
                setModalOpen(false)
            }}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={open}
            hasBackdrop
            avoidKeyboard
            onBackButtonPress={() => {
                navigate("Home")
                setModalOpen(false)
            }}
            onBackdropPress={() => {
                navigate("Home")
                setModalOpen(false)
            }}>
            <View
                style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 290,
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 20,
                    overflow: 'hidden',
                }}>
                <View 
                style={{
                    height:70,
                    width:70,
                    borderWidth:3,
                    borderColor:"green",
                    borderRadius:100,
                    justifyContent:"center",
                    alignItems:"center"
                }}
                >
                    <AntDesign
                    name="check"
                    color="green"
                    size={40}
                    />
                </View>

                <Text style={{fontSize:26,color:COLORS.orange,marginTop:10}}>
                    {
                        I18nManager.isRTL ? "التأكيد" : "Confirmation"
                    }
                </Text>

                <Text style={{width:"80%",textAlign:"center",color:"grey"}}>
                    {
                        I18nManager.isRTL ? "تم نشر عرضك بنجاح ، وسوف نرسل لك رسالة تأكيد بالبريد الإلكتروني بعد المراجعة." : "Your offer has been successfully posted, we will send you confirmation email after review."
                    }
                </Text>


                <ClickAbleByAsim style={styles.button1} onPress={() => {
                    navigate("Home")
                setModalOpen(false)

                }}>
                    {
                      <Text style={{ color: 'white', fontSize: 17 }}>
                            {I18nManager.isRTL ? 'عودة' : 'Back'}
                        </Text>
                    }
                </ClickAbleByAsim>
            </View>
        </Modal >
    );
}

export default ConfirmModal

const styles = StyleSheet.create({
    button1: {
        backgroundColor: COLORS.blue,
        height: 50,
        width: 180,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        marginTop: 20,
        marginBottom: 10,
        overflow: 'hidden',
    },
})
