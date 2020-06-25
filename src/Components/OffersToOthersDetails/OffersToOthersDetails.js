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
    FlatList
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { COLORS } from '../../../colos/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //list-alt //sort
import Entypo from 'react-native-vector-icons/Entypo'; // location-pin
import Ionicons from 'react-native-vector-icons/Ionicons'; // md-paper
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Search from '../Search/Search';
import NotificationDialog from '../NotificationDialog/NotificationDialog';

const OffersToOthersDetails = ({ navigation, route }) => {

    const { navigate, openDrawer, goBack } = navigation;
    const dispatch = useDispatch();

    const [openSearch, setOpeneSearch] = useState(false);
    const [openNoti, setOpeneNoti] = useState(false);

    const isAuth = useSelector(({ auth }) => auth.isAuth);

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View
                style={{
                    height: 60,
                    width: '100%',
                    backgroundColor: COLORS.blue,
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                <ClickAbleByAsim
                    onPress={() => goBack()}
                    style={{
                        height: '100%',
                        width: 50,
                        justifyContent: 'center',
                        padding: 10,
                        transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
                    }}>
                    <AntDesign name="arrowleft" color="white" size={30} />
                </ClickAbleByAsim>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
                    {
                        I18nManager.isRTL ? "كل العروض" : "All Offers"
                    }
                </Text>

                <View
                    style={{
                        flex: 1,

                        justifyContent: isAuth ? 'space-around' : 'flex-end',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                    <ClickAbleByAsim
                        style={{ paddingTop: 20, paddingBottom: 20, marginRight: 20, marginLeft: 30 }}
                        onPress={() => {
                            setOpeneSearch(true);
                        }}>
                        <Image
                            style={{ height: 18, width: 18 }}
                            source={require('../../../assests/search.png')}
                        />
                    </ClickAbleByAsim>
                    {isAuth ? (
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
                                    Platform.OS == 'ios'
                                        ? {}
                                        : { paddingTop: 20, paddingBottom: 20 }
                                }
                                onPress={() => navigate('PostOffer1')}>
                                <Text style={{ color: 'white', fontSize: 30 }}> + </Text>
                            </ClickAbleByAsim>

                            <ClickAbleByAsim
                                style={
                                    Platform.OS == 'ios'
                                        ? {}
                                        : { paddingTop: 20, paddingBottom: 20 }
                                }
                                onPress={() => navigate('BartarPoints')}>
                                <Text style={{ color: 'white', fontSize: 20 }}> $ </Text>
                            </ClickAbleByAsim>
                        </>
                    ) : null}
                </View>
            </View>
            {/* Header */}


            {/* Main Product Info */}
            <View style={{ height: 150, width: "100%", flexDirection: "row" }}>
                <View style={{ height: "100%", width: "40%", justifyContent: "center", alignItems: "center" }}>
                    <Image
                        resizeMode="center"
                        source={require('../../../assests/no_picture.png')}
                        style={{ height: '70%', width: '70%' }}
                    />
                </View>
                <View style={{ height: "100%", width: "60%", paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {"item.Title"}
                    </Text>
                    <Text style={{ color: 'grey', fontSize: 13 }}>
                        {"item.Detail"}
                    </Text>
                </View>
            </View>
            {/* Main Product Info */}

            {/*Offered Products list  */}

            <View style={{ width: "100%", height: 120, padding: 4, }}>
                <Text style={{ marginLeft: 20, marginRight: 20 }}>
                    {
                        I18nManager.isRTL ? "المنتجات المعروضة:" : "Offered Products:"
                    }
                </Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ width: "20%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <ImageBackground
                            resizeMode="center"
                            source={require('../../../assests/no_picture.png')}
                            style={{ height: '100%', width: '100%' }}
                        >

                        </ImageBackground>
                    </View>
                    <View style={{ width: "80%", height: "100%", paddingLeft: 10, paddingTop: 10 }}>
                        <Text style={{ fontSize: 20 }}>
                            Wonder Full Image
                        </Text>

                        <Text style={{ color: "grey", fontSize: 12 }}>
                            10 Points
                        </Text>
                        <View style={{ flex: 1, flexDirection: "row" }}>
                            <ClickAbleByAsim
                                onPress={() => { }}
                                style={{
                                    borderWidth: 0.3,
                                    borderWidth: 0.3,

                                    width: 70,
                                    height: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    backgroundColor: COLORS.orange,
                                }}>
                                <Text style={{ fontSize: 11, color: COLORS.blue, color: "white" }}>
                                    {
                                        I18nManager.isRTL ? "انخفاض" : "Decline"
                                    }
                                </Text>
                            </ClickAbleByAsim>

                            <ClickAbleByAsim
                                onPress={() => { }}
                                style={{
                                    borderWidth: 0.3,
                                    borderWidth: 0.3,

                                    width: 70,
                                    height: 25,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                    backgroundColor: COLORS.blue,
                                    marginLeft: 10
                                }}>
                                <Text style={{ fontSize: 11, color: COLORS.blue, color: "white" }}>
                                    {
                                        I18nManager.isRTL ? "تعديل" : "Edit"
                                    }
                                </Text>
                            </ClickAbleByAsim>
                        </View>
                    </View>
                </View>
            </View>
            {/*Offered Products list  */}
        </View>
    )
}

export default OffersToOthersDetails

const styles = StyleSheet.create({})
