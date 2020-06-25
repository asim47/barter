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
const CalculatorModal = ({ open, setModalOpen, }) => {

    const [Price, setPrice] = useState(0)
    const [Points, setPoints] = useState(0)



    function Calculate() {
        if (Price <= 190) {
            setPoints(Price * 6.16)
        } else if (Price >= 191 && Price <= 2638) {
            setPoints(Price * 6.93)
        } else if (Price >= 2639 && Price <= 5333) {
            setPoints(Price * 7.41)
        } else if (Price >= 5334 && Price <= 12493) {
            setPoints(Price * 8.27)
        } else if (Price >= 12494 && Price <= 88145) {
            setPoints(Price * 8.88)
        } else if (Price >= 88146 && Price <= 255520) {
            setPoints(Price * 9.3)
        } else if (Price >= 255521 && Price <= 4816596) {
            setPoints(Price * 10.11)
        } else if (Price > 4816597) {
            setPoints(Price * 10.56)
        } else if (Price == 0) {
            setPoints(Price * 0)
        }
    }
    return (
        <Modal
            onModalHide={() => {
                setPoints(0)
                setPrice("")
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
                    height: 290,
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
                    <Text style={{ marginTop: 50, color: COLORS.orange }}>
                        Points Calculator
                            </Text>

                    <View style={{
                        width: "80%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 10,
                        height: 40,
                        borderWidth: 0.3,
                        borderRadius: 20,
                        paddingLeft: 10,
                    }}>
                        <TextInput
                            style={{ width: "100%" }}
                            placeholder="Enter AED"
                            keyboardType="numeric"
                            value={Price}
                            onChangeText={(e) => setPrice(e)}
                        />
                    </View>

                    <Text style={{ color: "grey", alignSelf: "flex-start", marginLeft: "10%", marginTop: 20 }}>
                        = {Math.floor(Points)} Points
                    </Text>

                    <ClickAbleByAsim style={styles.button1} onPress={() => Calculate()}>
                        <Text style={{ color: 'white', fontSize: 17 }}>
                            {I18nManager.isRTL ? 'احسب' : 'CALCULATE'}
                        </Text>
                    </ClickAbleByAsim>

                </KeyboardAwareScrollView>
            </View>
        </Modal >
    );
}

export default CalculatorModal

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
