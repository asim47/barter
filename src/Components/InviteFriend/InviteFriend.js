import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    Image,
    Dimensions,
    ImageBackground,
    Platform,
    I18nManager,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from "../../../colos/colors"
import FontAwesome from "react-native-vector-icons/FontAwesome" //youtube
import AntDesign from "react-native-vector-icons/AntDesign" //youtube
import Ionicons from "react-native-vector-icons/Ionicons" //ios-people
import MaterialIcons from "react-native-vector-icons/MaterialIcons" //sms
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import Axios from 'axios';
import { API_ENDPOINT, Headers } from "../../../Global-Variables"
import { useSelector, useDispatch } from 'react-redux';
import NotificationDialog from '../NotificationDialog/NotificationDialog';

const InviteFriend = (props) => {

    const { navigate, openDrawer, goBack } = props.navigation;

    const [FriendOne, setFriendOne] = useState("")
    const [FriendTwo, setFriendTwo] = useState("")
    const [FriendThree, setFriendThree] = useState("")
    const [FriendFour, setFriendFour] = useState("")
    const [FriendFive, setFriendFive] = useState("")
    const [Loading, setLoading] = useState("")
    const [SuccessMsg, setSuccessMsg] = useState("")
    const [ErrorMsg, setErrorMsg] = useState("")
    const [openNoti, setOpeneNoti] = useState(false);

    const UserData = useSelector(({ auth }) => auth.userData);



    useEffect(() => {

        return () => {
            setSuccessMsg("")
            setErrorMsg("");
        }
    }, [])

    async function Inviter() {
        try {
            if (!FriendFive || !FriendFour || !FriendThree || !FriendTwo || !FriendOne) {
                return setErrorMsg("Please Invite 5 friends!")
            }
            setErrorMsg("")

            setLoading(true)
            let res = await Axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/InviteFriendsPoints", {
                userId: UserData.ID,
                friends: [
                    FriendFive, FriendFour, FriendThree, FriendTwo, FriendOne
                ]
            }, Headers)

            setLoading(false)
            setSuccessMsg("Friends Invited")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ height: 60, width: "100%", backgroundColor: COLORS.blue, alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <ClickAbleByAsim onPress={() => goBack()} style={{ height: "100%", width: 50, justifyContent: "center", padding: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
                        <AntDesign
                            name="arrowleft"
                            color="white"
                            size={30}
                        />
                    </ClickAbleByAsim>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>

                        {
                            I18nManager.isRTL ? "ادعو أصدقاء" : "INVITE FRIENDS"
                        }
                    </Text>
                </View>
                <ClickAbleByAsim onPress={() => setOpeneNoti(true)} style={{ height: "100%", width: 50, justifyContent: "center", padding: 10 }}>
                    <FontAwesome
                        name="bell"
                        color="white"
                        size={25}
                    />
                </ClickAbleByAsim>
            </View>
            {/* Header */}

            <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
                <KeyboardAwareScrollView style={{ width: "100%" }} contentContainerStyle={{ justifyContent: "flex-start", alignItems: "center" }}>
                    <Text style={{ fontSize: 17, marginTop: 20 }}>
                        {
                            I18nManager.isRTL ? "يرجى دعوة 5 أصدقاء على الأقل" : "Please invite 5 friends minimum"
                        }
                    </Text>

                    <Text style={{
                        alignSelf: "flex-start",
                        marginLeft: "10%",
                        marginTop: 20,
                        marginBottom: 10,
                    }}>
                        1- {I18nManager.isRTL ? "البريد الإليكترونى للأصدقاء" : "Friend's Email"}
                    </Text>


                    <View
                        style={{
                            height: 45,
                            width: '80%',
                            borderWidth: .3,
                            borderRadius: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "grey",
                            backgroundColor: "white"
                        }}>
                        <TextInput
                            placeholder={"name@example.com"}
                            style={{
                                width: '90%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            value={FriendOne}
                            onChangeText={e => setFriendOne(e)}
                        />
                    </View>


                    <Text style={{
                        alignSelf: "flex-start",
                        marginLeft: "10%",
                        marginTop: 20,
                        marginBottom: 10,
                    }}>
                        2- {I18nManager.isRTL ? "البريد الإليكترونى للأصدقاء" : "Friend's Email"}
                    </Text>


                    <View
                        style={{
                            height: 45,
                            width: '80%',
                            borderWidth: .3,
                            borderRadius: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "grey",
                            backgroundColor: "white"
                        }}>
                        <TextInput
                            placeholder={"name@example.com"}
                            style={{
                                width: '90%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            value={FriendTwo}
                            onChangeText={e => setFriendTwo(e)}
                        />
                    </View>


                    <Text style={{
                        alignSelf: "flex-start",
                        marginLeft: "10%",
                        marginTop: 20,
                        marginBottom: 10,
                    }}>
                        3- {I18nManager.isRTL ? "البريد الإليكترونى للأصدقاء" : "Friend's Email"}
                    </Text>


                    <View
                        style={{
                            height: 45,
                            width: '80%',
                            borderWidth: .3,
                            borderRadius: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "grey",
                            backgroundColor: "white"
                        }}>
                        <TextInput
                            placeholder={"name@example.com"}
                            style={{
                                width: '90%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            value={FriendThree}
                            onChangeText={e => setFriendThree(e)}
                        />
                    </View>


                    <Text style={{
                        alignSelf: "flex-start",
                        marginLeft: "10%",
                        marginTop: 20,
                        marginBottom: 10,
                    }}>
                        4- {I18nManager.isRTL ? "البريد الإليكترونى للأصدقاء" : "Friend's Email"}
                    </Text>


                    <View
                        style={{
                            height: 45,
                            width: '80%',
                            borderWidth: .3,
                            borderRadius: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "grey",
                            backgroundColor: "white"
                        }}>
                        <TextInput
                            placeholder={"name@example.com"}
                            style={{
                                width: '90%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            value={FriendFour}
                            onChangeText={e => setFriendFour(e)}
                        />
                    </View>



                    <Text style={{
                        alignSelf: "flex-start",
                        marginLeft: "10%",
                        marginTop: 20,
                        marginBottom: 10,
                    }}>
                        5- {I18nManager.isRTL ? "البريد الإليكترونى للأصدقاء" : "Friend's Email"}
                    </Text>


                    <View
                        style={{
                            height: 45,
                            width: '80%',
                            borderWidth: .3,
                            borderRadius: 40,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: "grey",
                            backgroundColor: "white"
                        }}>
                        <TextInput
                            placeholder={"name@example.com"}
                            style={{
                                width: '90%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            value={FriendFive}
                            onChangeText={e => setFriendFive(e)}
                        />
                    </View>
                    {
                        SuccessMsg ? (<Text style={{ marginTop: 10, color: "green" }}>
                            {SuccessMsg}
                        </Text>) : null
                    }
                    {
                        ErrorMsg ? (<Text style={{ marginTop: 10, color: "red" }}>
                            {ErrorMsg}
                        </Text>) : null
                    }
                    <ClickAbleByAsim style={styles.button1} onPress={() => Inviter()}>
                        {
                            Loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                    <Text style={{ color: 'white', fontSize: 17 }}>
                                        {I18nManager.isRTL ? 'ارسل دعوة' : 'Send Invite'}
                                    </Text>
                                )
                        }
                    </ClickAbleByAsim>


                </KeyboardAwareScrollView>
            </View>
            <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />

        </View >
    )
}

export default InviteFriend

const styles = StyleSheet.create({
    button1: {
        backgroundColor: '#FF6412',
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
