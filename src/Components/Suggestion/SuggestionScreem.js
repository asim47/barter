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
import Axios from 'axios';
import { API_ENDPOINT, Headers } from '../../../Global-Variables';

const SuggestionScreen = props => {
    const { navigate, openDrawer,goBack } = props.navigation;
    const dispatch = useDispatch();
    const [Active, setActive] = useState('');

    const [FirstName, setFirstName] = useState('');
    const [Subject, setSubject] = useState('');
    const [Message, setMessage] = useState('');
    const [Email, setEmail] = useState('');



    const [ErrorMsg, setErrorMsg] = useState('');
    const [Loading, setLoading] = useState(false)


    // const Loading = useSelector(({ auth }) => auth.loading)
    const ErrorMsgFromBackend = useSelector(({ auth }) => auth.signUpErrorMsg)


    useEffect(() => {
        if (ErrorMsgFromBackend) {
            setErrorMsg(ErrorMsgFromBackend)
        }

    }, [ErrorMsgFromBackend])


    async function SendSuggestion() {

        if (!FirstName) return setErrorMsg("Please Enter Your Name")
        if (!Email) return setErrorMsg("Please Enter a Email")
        if (!Email.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)) return setErrorMsg("Please Enter a valid Email")
        if (!Subject) return setErrorMsg("Please Enter Your Subject")
        if (!Message) return setErrorMsg("Please Enter Your Message")
        

        setErrorMsg("")
        setLoading(true)


        let res = await Axios.post(API_ENDPOINT + "/Plugins/Feedback/FeedBackService.svc/PostContactForm", {
            nEmail: Email,
            nMsg: Message,
            nName: FirstName,
            nSubject: Subject,
        }, Headers);

        setLoading(false)
        goBack()
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

                    <View style={{ backgroundColor: "white", padding: 3, borderRadius: 100, marginRight: 10, }}>
                        <Image
                            style={{ height: 18, width: 18, }}
                            resizeMode="contain"
                            source={require('../../../assests/icon_account.png')}
                        />
                    </View>
                    <TextInput
                        onFocus={() => setActive('firstName')}
                        onBlur={() => setActive('')}
                        placeholder={I18nManager.isRTL ? 'الاسم الاول' : 'Your name'}
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
                        borderColor: Active == 'Email' ? COLORS.orange : 'white',
                    }}>
                    <View style={{ backgroundColor: "white", padding: 3, borderRadius: 100, marginRight: 10, }}>
                        <Image
                            style={{ height: 18, width: 18, }}
                            resizeMode="contain"
                            source={require('../../../assests/new_email.png')}
                        />
                    </View>

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
                        borderColor: Active == 'Subject' ? COLORS.orange : 'white',
                    }}>
                    <Image
                        style={{ height: 23, width: 23, marginRight: 10 }}
                        source={require('../../../assests/p_sub.png')}
                    />

                    <TextInput
                        onFocus={() => setActive('Subject')}
                        onBlur={() => setActive('')}
                        placeholder={I18nManager.isRTL ? 'موضوعك' : 'Your Subject'}
                        style={{
                            width: '75%',
                            height: '95%',
                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                        }}
                        onChangeText={e => setSubject(e)}
                        value={Subject}
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
                        borderColor: Active == 'Message' ? COLORS.orange : 'white',
                    }}>
                    <Image
                        style={{ height: 23, width: 23, marginRight: 10 }}
                        source={require('../../../assests/p_msg.png')}
                    />

                    <TextInput
                        onFocus={() => setActive('Message')}
                        onBlur={() => setActive('')}
                        placeholder={I18nManager.isRTL ? 'رسالتك' : 'Your Message'}
                        style={{
                            width: '75%',
                            height: '95%',
                            textAlign: I18nManager.isRTL ? 'right' : 'left',
                        }}
                        onChangeText={e => setMessage(e)}
                        value={Message}
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
                        SendSuggestion()
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
                                {I18nManager.isRTL ? "إرسال" : 'Submit'}
                            </Text>
                        )
                    }
                </ClickAbleByAsim>
            </KeyboardAwareScrollView>

        </ImageBackground>
    );
};

export default SuggestionScreen;

const styles = StyleSheet.create({});
