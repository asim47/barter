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
    ActivityIndicator,
    Linking,
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from "../../../colos/colors"
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome";  //list-alt //sort
import Entypo from "react-native-vector-icons/Entypo"; // location-pin
import Ionicons from "react-native-vector-icons/Ionicons"; // md-paper
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Search from '../Search/Search';
import NotificationDialog from '../NotificationDialog/NotificationDialog';


const ContactUs = ({ navigation, route }) => {
    const { navigate, openDrawer, goBack } = navigation;

    const [openSearch, setOpeneSearch] = useState(false);
    const [openNoti, setOpeneNoti] = useState(false);

    const isAuth = useSelector(({ auth }) => auth.isAuth);

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ height: 60, width: "100%", backgroundColor: COLORS.blue, alignItems: "center", flexDirection: "row", }}>
                <ClickAbleByAsim onPress={() => goBack()} style={{ height: "100%", width: 50, justifyContent: "center", padding: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
                    <AntDesign
                        name="arrowleft"
                        color="white"
                        size={30}
                    />
                </ClickAbleByAsim>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", marginRight: 20 }}>
                    CONTACT US
                </Text>

                <View
                    style={{
                        flex: 1,

                        justifyContent: isAuth ? 'space-around' : "flex-end",
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <ClickAbleByAsim
                        style={{ paddingTop: 20, paddingBottom: 20, marginRight: 20 }}
                        onPress={() => {
                            setOpeneSearch(true);
                        }}>
                        <Image
                            style={{ height: 18, width: 18 }}
                            source={require('../../../assests/search.png')}
                        />
                    </ClickAbleByAsim>
                    {
                        isAuth ? (
                            <>
                                <ClickAbleByAsim
                                    style={{ paddingTop: 20, paddingBottom: 20 }}
                                    onPress={() => setOpeneNoti(true)}>
                                    <Image
                                        style={{ height: 18, width: 18 }}
                                        source={require('../../../assests/bell.png')}
                                    />
                                </ClickAbleByAsim>

                                <ClickAbleByAsim
                                    style={
                                        Platform.OS == 'ios' ? {} : { paddingTop: 20, paddingBottom: 20 }
                                    }
                                    onPress={() => navigate('PostOffer1')}>
                                    <Text style={{ color: 'white', fontSize: 30 }}> + </Text>
                                </ClickAbleByAsim>

                                <ClickAbleByAsim
                                    style={
                                        Platform.OS == 'ios' ? {} : { paddingTop: 20, paddingBottom: 20 }
                                    }
                                    onPress={() => navigate('BartarPoints')}>
                                    <Text style={{ color: 'white', fontSize: 20 }}> $ </Text>
                                </ClickAbleByAsim>


                            </>
                        ) : null
                    }
                </View>

            </View>
            {/* Header */}

            <View style={{ flex: 1, padding: 20 }}>
                <Text style={{ fontSize: 20, }}>

                    {
                        I18nManager.isRTL ? "نظام المقايدات للمقايضة" : "Muqayadat-Bartering System"
                    }
                </Text>

                <ClickAbleByAsim style={styles.button1} onPress={() =>{
                     Linking.openURL(`tel:090078609`);
                }}>
                    <Image
                        source={require("../../../assests/toll_free.png")}
                    />
                    <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>
                        {I18nManager.isRTL ? 'الرقم المجاني' : 'Toll Free'} 090078609
                    </Text>
                </ClickAbleByAsim>







                <View style={{ width: "100%", height: 45, marginBottom: 5, flexDirection: "row" }}>
                    <View style={{ height: "100%", width: 50, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 30 }}
                            source={require("../../../assests/address.png")}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ color: COLORS.blue, fontSize: 13 }}>
                            {I18nManager.isRTL ? "عنوان" : "Address"}
                        </Text>
                        <Text style={{ fontSize: 13 }}>Dubai Dubai Dubai</Text>
                    </View>
                </View>


                <View style={{ width: "100%", height: 45, marginBottom: 5, flexDirection: "row" }}>
                    <View style={{ height: "100%", width: 50, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 25 }}
                            source={require("../../../assests/po_box.png")}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ color: COLORS.blue, fontSize: 13 }}>
                            {I18nManager.isRTL ? "صندوق بريد" : "PO Box"}
                        </Text>
                        <Text style={{ fontSize: 13 }}>5465</Text>
                    </View>
                </View>


                <View style={{ width: "100%", height: 45, marginBottom: 5, flexDirection: "row" }}>
                    <View style={{ height: "100%", width: 50, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 20 }}
                            source={require("../../../assests/email.png")}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ color: COLORS.blue, fontSize: 13 }}>
                            {I18nManager.isRTL ? "عنوان بريد الكتروني" : "Email Address"}
                        </Text>
                        <Text style={{ fontSize: 13 }}>hamza@zmail.com</Text>
                    </View>
                </View>


                <View style={{ width: "100%", height: 45, marginBottom: 5, flexDirection: "row" }}>
                    <View style={{ height: "100%", width: 50, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 30 }}
                            source={require("../../../assests/mob_no.png")}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ color: COLORS.blue, fontSize: 13 }}>
                            {I18nManager.isRTL ? "التليفون المحمول" : "Mobile"}
                        </Text>
                        <Text style={{ fontSize: 13 }}>090078601</Text>
                    </View>
                </View>

                <View style={{ width: "100%", height: 45, marginBottom: 5, flexDirection: "row" }}>
                    <View style={{ height: "100%", width: 50, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            resizeMode="contain"
                            style={{ height: 25 }}
                            source={require("../../../assests/fax.png")}
                        />
                    </View>
                    <View style={{ flex: 1, justifyContent: "center" }}>
                        <Text style={{ color: COLORS.blue, fontSize: 13 }}>
                            {I18nManager.isRTL ? "رقم الفاكس" : "Fax Number"}
                        </Text>
                        <Text style={{ fontSize: 13 }}>090078601</Text>
                    </View>
                </View>

                <View style={{ marginTop: 20, width: "100%", justifyContent: "center", alignItems: "center" }}>
                    <ClickAbleByAsim style={styles.button2} onPress={() => navigate("SuggestionScreem")}>
                        <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>
                            {I18nManager.isRTL ? 'أرسل اقتراحاتك' : 'Send Your Suggestions'} 
                    </Text>
                    </ClickAbleByAsim>
                </View>
            </View>
            {/* Dialog */}
            <Search navigate={navigate} open={openSearch} close={() => setOpeneSearch(false)} />
            <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />
            {/* Dialog */}
        </View>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    button1: {
        backgroundColor: '#59AF34',
        height: 40,
        width: 200,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        marginTop: 20,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: "row",
        marginTop: 40,
        marginBottom: 40
    },
    button2: {
        backgroundColor: COLORS.blue,
        height: 50,
        width: 230,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        marginTop: 20,
        marginBottom: 10,
        overflow: 'hidden',
        flexDirection: "row",
        marginTop: 40,
        marginBottom: 40
    },
})
