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
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from "../../../colos/colors"
import AntDesign from "react-native-vector-icons/AntDesign" //youtube
import Ionicons from "react-native-vector-icons/Ionicons" //ios-people
import MaterialIcons from "react-native-vector-icons/MaterialIcons" //sms
import BarterIcon from "../../../assests/b_bartering.png"
import NotificationDialog from '../NotificationDialog/NotificationDialog';

const BartarPoints = (props) => {
    const { navigate, openDrawer, goBack } = props.navigation;
    const [openNoti, setOpeneNoti] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ height: 60, width: "100%", backgroundColor: COLORS.blue, alignItems: "center", flexDirection: "row",justifyContent:"space-between" }}>
                <ClickAbleByAsim onPress={() => goBack()} style={{ height: "100%", width: 50, justifyContent: "center", padding: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
                    <AntDesign
                        name="arrowleft"
                        color="white"
                        size={30}
                    />
                </ClickAbleByAsim>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>

                    {
                        I18nManager.isRTL ? "نقطة المقايضة" : "BARTERING POINT"
                    }
                </Text>


                <ClickAbleByAsim
                    style={{ paddingTop: 20, paddingBottom: 20 ,marginRight:10}}
                    onPress={() => setOpeneNoti(true)}>
                    <Image
                        style={{ height: 18, width: 18 }}
                        source={require('../../../assests/bell.png')}
                    />
                </ClickAbleByAsim>
            </View>
            {/* Header */}
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ClickAbleByAsim onPress={() => { }} style={{ height: 90, width: "70%", marginTop: 10, borderRadius: 10, overflow: "hidden" }} >
                    <ImageBackground source={require("../../../assests/b_bg.png")} style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <AntDesign
                            name="youtube"
                            color="white"
                            size={30}
                        />
                        <Text style={{ marginTop: 5, color: "white", fontWeight: "bold" }}>

                            {
                                I18nManager.isRTL ? "شاهد الفيديو" : "Watch Video"
                            }
                        </Text>
                    </ImageBackground>
                </ClickAbleByAsim>

                <ClickAbleByAsim onPress={() => navigate("InviteFriends")} style={{ height: 90, width: "70%", marginTop: 10, borderRadius: 10, overflow: "hidden" }} >
                    <ImageBackground source={require("../../../assests/b_bg.png")} style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Ionicons
                            name="ios-people"
                            color="white"
                            size={30}
                        />
                        <Text style={{ marginTop: 5, color: "white", fontWeight: "bold" }}>

                            {
                                I18nManager.isRTL ? "دعوة صديق" : "Invite Friend"
                            }
                        </Text>
                    </ImageBackground>
                </ClickAbleByAsim>

                <ClickAbleByAsim onPress={() => { }} style={{ height: 90, width: "70%", marginTop: 10, borderRadius: 10, overflow: "hidden" }} >
                    <ImageBackground source={require("../../../assests/b_bg.png")} style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <MaterialIcons
                            name="sms"
                            color="white"
                            size={30}
                        />
                        <Text style={{ marginTop: 5, color: "white", fontWeight: "bold" }}>

                            {
                                I18nManager.isRTL ? "عن طريق الرسائل القصيرة" : "By Sms"
                            }
                        </Text>
                    </ImageBackground>
                </ClickAbleByAsim>

                <ClickAbleByAsim onPress={() => navigate("PostOffer1")} style={{ height: 90, width: "70%", marginTop: 10, borderRadius: 10, overflow: "hidden" }} >
                    <ImageBackground source={require("../../../assests/b_bg.png")} style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <Image
                            style={{ width: 50, height: 20 }}
                            source={BarterIcon}
                        />
                        <Text style={{ marginTop: 5, color: "white", fontWeight: "bold" }}>


                            {
                                I18nManager.isRTL ? "عن طريق الرسائل القصيرة" : "Barter with us"
                            }
                        </Text>
                    </ImageBackground>
                </ClickAbleByAsim>
            </View>
          
            <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />

        </View>
    )
}

export default BartarPoints

const styles = StyleSheet.create({})
