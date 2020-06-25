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

const MyOffers = ({ navigation, route }) => {

    const { navigate, openDrawer, goBack } = navigation;
    const dispatch = useDispatch();

    const [openSearch, setOpeneSearch] = useState(false);
    const [openNoti, setOpeneNoti] = useState(false);
    const [Switceher, setSwitceher] = useState(true);



    const isAuth = useSelector(({ auth }) => auth.isAuth);
    const MyPostedOffers = useSelector(({ offer }) => offer.MyPostedOffers);
    const OffersToOthers = useSelector(({ offer }) => offer.OffersToOthers);


    useEffect(() => {
        dispatch(Actions.GettingMyPostedOffers())
        dispatch(Actions.GettingMyOffersForOthers())
    }, [])

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
                        I18nManager.isRTL ? "عروضي" : "My Offers"
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

            <View style={{ height: 80, width: "100%", alignItems: "center", justifyContent: "center" }}>

                {/* Switcher */}

                <View
                    style={{
                        height: 40,
                        borderWidth: 1,
                        width: '74%',
                        borderRadius: 10,
                        overflow: 'hidden',
                        flexDirection: 'row',
                        borderColor: '#49A1C7',
                    }}>
                    <ClickAbleByAsim
                        onPress={() => setSwitceher(true)}
                        style={{
                            height: '100%',
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Switceher ? '#49A1C7' : 'white',
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: !Switceher ? '#49A1C7' : 'white',
                            }}>
                            {I18nManager.isRTL ? 'عروضي المنشورة' : 'My Posted Offers'}
                        </Text>
                    </ClickAbleByAsim>
                    <ClickAbleByAsim
                        onPress={() => setSwitceher(false)}
                        style={{
                            height: '100%',
                            width: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: !Switceher ? '#49A1C7' : 'white',
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                color: Switceher ? '#49A1C7' : 'white',
                            }}>
                            {I18nManager.isRTL ? 'عروض للآخرين' : 'Offers to Others'}
                        </Text>
                    </ClickAbleByAsim>
                </View>
                {/* Switcher */}
            </View>



            {
                Switceher ? MyPostedOffers ? (
                    <FlatList
                        data={MyPostedOffers}
                        keyExtractor={ITEM => ITEM.ID}
                        renderItem={({ item }) => {
                            return (
                                <ClickAbleByAsim
                                    onPress={() => {
                                        
                                        dispatch(Actions.GettingOfferByID(item.BarterID))
                                        navigate('OfferDetails');
                                    }}
                                    style={{
                                        height: 130,
                                        width: '100%',
                                        borderBottomWidth: 0.3,
                                        flexDirection: 'row',
                                        paddingBottom: 10,
                                        paddingTop: 10,
                                    }}>
                                    <View style={{ height: '100%', width: '30%',justifyContent:"center" }}>
                                        {item?.Image1 ? (
                                            <ImageBackground resizeMode="contain" source={require('../../../assests/no_picture.png')} style={{ height: '72%', width: '100%' }}>
                                                <Image
                                                    resizeMode="contain"
                                                    source={{ uri: item?.Image1 }}
                                                    style={{ height: '100%', width: '100%' }}
                                                />
                                            </ImageBackground>
                                        ) : (
                                                <Image
                                                    resizeMode="contain"
                                                    source={require('../../../assests/no_picture.png')}
                                                    style={{ height: '72%', width: '100%' }}
                                                />
                                            )}
                                        {
                                            item.Status != 1 ? (

                                                <View style={{ height: "28%", width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "flex-end", }}>
                                                    {
                                                        item.Status == 3 ? (
                                                            <ClickAbleByAsim onPress={() => { }} style={{ borderRadius: 100, height: 22, width: 22, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                                                <Image
                                                                    style={{ height: "100%", width: "100%" }}
                                                                    resizeMode="contain"
                                                                    source={require("../../../assests/delete.png")}
                                                                />
                                                            </ClickAbleByAsim>
                                                        ) : null
                                                    }
                                                    <ClickAbleByAsim onPress={() => { }} style={{ borderRadius: 100, height: 22, width: 22, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                                        <Image
                                                            style={{ height: "100%", width: "100%" }}
                                                            resizeMode="contain"
                                                            source={require("../../../assests/renew.png")}
                                                        />
                                                    </ClickAbleByAsim>
                                                    {
                                                        item.Status == 3 ? (
                                                            <ClickAbleByAsim onPress={() => { }} style={{ borderRadius: 100, height: 22, width: 22, justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
                                                                <Image
                                                                    style={{ height: "100%", width: "100%" }}
                                                                    resizeMode="contain"
                                                                    source={require("../../../assests/edit.png")}
                                                                />
                                                            </ClickAbleByAsim>
                                                        ) : null
                                                    }


                                                </View>

                                            ) : null
                                        }

                                    </View>
                                    <View
                                        style={{
                                            height: '100%',
                                            width: '70%',
                                            justifyContent: 'space-between',
                                            paddingLeft: 10,
                                        }}>
                                        <View>
                                            <Text style={{ fontWeight: 'bold' }}>{item.Title}</Text>
                                            <Text style={{ color: 'grey', fontSize: 13 }}>
                                                {item.Detail}
                                            </Text>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <View
                                                style={{
                                                    borderWidth: 0.3,
                                                    width: 70,
                                                    height: 20,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 20,
                                                    backgroundColor: 'white',
                                                    marginTop: 20,
                                                }}>
                                                <Text style={{ fontSize: 11, color: COLORS.blue }}>
                                                    {item.ItemsTotalOffers || 0} Offers
                              </Text>
                                            </View>
                                            <View
                                                style={{
                                                    marginLeft: 10,
                                                    borderWidth: 0.3,
                                                    minWidth: 150,
                                                    height: 20,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: 20,
                                                    backgroundColor: 'white',
                                                    marginTop: 20,
                                                }}>
                                                <Text style={{ fontSize: 11, color: COLORS.blue }}>
                                                    {item.Points} Loyalty Points
                              </Text>
                                            </View>
                                        </View>
                                    </View>
                                </ClickAbleByAsim>

                            )
                        }}
                    />
                ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={COLORS.orange} size={30} />
                        </View>
                    )
                    : OffersToOthers ? (
                        <FlatList
                            data={OffersToOthers}
                            keyExtractor={ITEM => ITEM.ID}
                            renderItem={({ item }) => {
                                return (
                                    <ClickAbleByAsim
                                        onPress={() => {
                                            dispatch(Actions.GettingOfferByID(item.ID))
                                            navigate('OfferDetails');
                                        }}
                                        style={{
                                            height: 130,
                                            width: '100%',
                                            borderBottomWidth: 0.3,
                                            flexDirection: 'row',
                                            paddingBottom: 10,
                                            paddingTop: 10,
                                        }}>
                                        <View style={{ height: '100%', width: '30%', }}>
                                            {item?.Images && item?.Images[0] ? (
                                                <Image
                                                    resizeMode="contain"
                                                    source={{ uri: item?.Images[0] }}
                                                    style={{ height: '100%', width: '100%' }}
                                                />
                                            ) : (
                                                    <Image
                                                        resizeMode="contain"
                                                        source={require('../../../assests/no_picture.png')}
                                                        style={{ height: '100%', width: '100%' }}
                                                    />
                                                )}
                                        </View>
                                        <View
                                            style={{
                                                height: '100%',
                                                width: '70%',
                                                justifyContent: 'space-between',
                                                paddingLeft: 10,
                                            }}>
                                            <View>
                                                <Text style={{ fontWeight: 'bold' }}>{item.Title}</Text>
                                                <Text style={{ color: 'grey', fontSize: 13 }}>
                                                    {item.Detail}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <ClickAbleByAsim
                                                    onPress={() => navigate("OffersToOthersDetails")}
                                                    style={{
                                                        width: 70,
                                                        height: 25,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        borderRadius: 20,
                                                        backgroundColor: COLORS.blue,
                                                        marginTop: 20,
                                                    }}>
                                                    <Text style={{ fontSize: 11, color: COLORS.blue, color: "white" }}>
                                                        {
                                                            I18nManager.isRTL ? "عرض" : "View Offer"
                                                        }
                                                    </Text>
                                                </ClickAbleByAsim>

                                            </View>
                                        </View>
                                    </ClickAbleByAsim>

                                )
                            }}
                        />
                    ) : (
                            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                                <ActivityIndicator color={COLORS.orange} size={30} />
                            </View>
                        )
            }



            <Search navigate={navigate} open={openSearch} close={() => setOpeneSearch(false)} />
            <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />
        </View>
    )
}

export default MyOffers

const styles = StyleSheet.create({})
