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
    Share,
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from "../../../colos/colors"
import AntDesign from "react-native-vector-icons/AntDesign"
import EvilIcons from "react-native-vector-icons/EvilIcons"

import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Search from '../Search/Search';
import NotificationDialog from '../NotificationDialog/NotificationDialog';

import Offer from "../../../assests/offer.png"
import Comments from "../../../assests/ic_comment2.png"
import Friends from "../../../assests/share_friend.png"
import SharePic from "../../../assests/share.png"

import MapView, { Marker } from 'react-native-maps';
import InviteModal from './InviteModal';
import PlaceOffer from './PlaceOffer';
import CommentsDialog from './CommentsDialog';
import Axios from 'axios';
import { API_ENDPOINT, Headers } from '../../../Global-Variables';
const DummyData = [
    {
        heading1: 'get',
        Discount: 10,
        headinh2: 'Discount On',
        heading3: 'HONDA CIVIC',
        image: require('../../../assests/car.jpeg'),
    },
    {
        heading1: 'get',
        Discount: 10,
        headinh2: 'Discount On',
        heading3: 'HONDA CIVIC',
        image: require('../../../assests/car.jpeg'),
    },
    {
        heading1: 'get',
        Discount: 10,
        headinh2: 'Discount On',
        heading3: 'HONDA CIVIC',
        image: require('../../../assests/car.jpeg'),
    },
];



const OfferDetails = ({ navigation }) => {
    const { navigate, openDrawer, goBack } = navigation;
    const dispatch = useDispatch()
    const [activeSlide, setActiveSlide] = useState();
    const [Switceher, setSwitceher] = useState(true);
    const [openSearch, setOpeneSearch] = useState(false);
    const [openNoti, setOpeneNoti] = useState(false);
    const [PlaceOfferOpen, setPlaceOfferOpen] = useState(false);
    const [InviteOpen, setInviteOpen] = useState(false);
    const [CommentsOpen, setCommentsOpen] = useState(false);


    const [CommentsData, setCommentsData] = useState([])


    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 2,
        longitudeDelta: 2,
    })
    const isAuth = useSelector(({ auth }) => auth.isAuth);
    const userData = useSelector(({ auth }) => auth.userData);
    const SelectedOffer = useSelector(({ home }) => home.SelectedOffer);




    useEffect(() => {
        isAuth && dispatch(Actions.GettingMyPostedOffers());
    }, [])

    useEffect(() => {

        if (SelectedOffer) {
            setRegion({
                latitude: +SelectedOffer.Lat,
                longitude: +SelectedOffer.Long,
                latitudeDelta: 0.3,
                longitudeDelta: 0.3,
            })
        }
    }, [SelectedOffer])




    async function getComments() {

        setCommentsData(null)
        try {
            let res = await Axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/LoadComments", {
                "LanguageID": I18nManager.isRTL ? 2 : 1,
                "WebsiteID": 1,
                "OfferUniqueName": SelectedOffer.UniqueName,
            }, Headers);


            if (res.data.LoadCommentsResult.result) {
                setCommentsData(res.data.LoadCommentsResult.ProductCommentsArray)
            }


        } catch (error) {
            console.log(error)
        }
    }



    async function postComment(e) {

        setCommentsData(null)
        // console.log(SelectedOffer.UniqueName)
        try {
            let res = await Axios.post(API_ENDPOINT + "/Plugins/WebUsers/BarterUserService.svc/PostComment", {
                "LanguageID": I18nManager.isRTL ? 2 : 1,
                "WebsiteID": 1,
                "OfferUniqueName": SelectedOffer.UniqueName,
                comment: e,
                nCurrentUserName: userData.UserName,
                nCurrentEmail: userData.UserEmail

            }, Headers);


            console.log(res.data)
            if (res.data.PostCommentResult.result) {
                return getComments()
            }

        } catch (error) {
            console.log(error)
        }
    }



    async function MakeOffer(e) {
        try {
            let res = await Axios.post(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/MakeOffer", {
                "LanguageID": I18nManager.isRTL ? 2 : 1,
                "WebsiteID": 1,
                "nProductUniqueName": SelectedOffer.UniqueName,
                nSeekerID: userData.ID,
                nSeekerProductUniqueName: "",
                OfferComments: "",
                points: ""

            }, Headers);
        } catch (error) {
            console.log(error)
        }
    }


    async function ShareIt() {
        const result = await Share.share({
            message:
                'https://www.muqayadat.com/en/offers/detail.page.aspx?nUniqueName=' + SelectedOffer.UniqueName,
        });
    }


    const _renderItem = ({ item, index }) => {
        return (
            <ImageBackground
                source={{ uri: item.url }}
                style={{ height: '100%', width: '100%', justifyContent: 'center' }}>

            </ImageBackground>
        );
    };
    return SelectedOffer == null ? <ActivityIndicator style={{ marginTop: 40 }} color={COLORS.orange} size={30} /> : (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ height: 60, width: "100%", backgroundColor: COLORS.blue, alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                <>
                    <ClickAbleByAsim onPress={() => goBack()} style={{ height: "100%", width: 50, justifyContent: "center", padding: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
                        <AntDesign
                            name="arrowleft"
                            color="white"
                            size={30}
                        />
                    </ClickAbleByAsim>
                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
                        {SelectedOffer.Title}
                    </Text>
                </>

                {
                    isAuth ? (
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", height: "100%", width: "40%" }}>
                            <ClickAbleByAsim
                                style={{ padding: 10, paddingTop: 20, paddingBottom: 20 }}
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


                        </View>
                    ) : null
                }
            </View>
            {/* Header */}

            {/* Slider */}
            <View style={styles.sliderContainer}>
                <Carousel
                    showsHorizontalScrollIndicator
                    indicator
                    autoplay
                    autoplayDelay={0}
                    autoplayInterval={3000}
                    // ref={(c) => { this._carousel = c; }}
                    data={SelectedOffer.RelatedItems}
                    renderItem={_renderItem}
                    sliderWidth={Dimensions.get('window').width}
                    itemWidth={Dimensions.get('window').width - 40}
                    onSnapToItem={index => setActiveSlide(index)}
                />
                <Pagination
                    dotsLength={SelectedOffer.RelatedItems.length}
                    activeDotIndex={activeSlide}
                    containerStyle={{
                        position: 'absolute',
                        width: Dimensions.get('window').width,
                        bottom: 0,
                    }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 0,
                        marginHorizontal: 2,
                        backgroundColor: COLORS.orange,
                    }}
                    inactiveDotStyle={
                        {
                            // Define styles for inactive dots here
                        }
                    }
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
            {/* Slider */}
            {/* INFO */}
            <View style={{ width: "100%", height: 70, backgroundColor: "#F7F3F2", flexDirection: "row" }}>
                <View style={{ flex: 1, borderBottomWidth: .3, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, margin: 10 }}>

                        {
                            I18nManager.isRTL ? "حالة" : "CONDITION"
                        }
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: COLORS.orange }}>
                        {
                            SelectedOffer.Condition
                        }
                    </Text>
                </View>
                <View style={{ flex: 1, borderWidth: .3, borderTopWidth: 0, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, margin: 10 }}>

                        {
                            I18nManager.isRTL ? "مطلوب السعر" : "PRICE REQUIRED"
                        }
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: COLORS.orange }}>
                        {
                            SelectedOffer.Points
                        }
                    </Text>
                </View>
                <View style={{ flex: 1, borderBottomWidth: .3, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 13, margin: 10 }}>

                        {
                            I18nManager.isRTL ? "عروض" : "OFFERS"
                        }
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: "bold", color: COLORS.orange }}>
                        {
                            SelectedOffer.TotalSeekers
                        }
                    </Text>
                </View>
            </View>

            {/* INFO */}

            {/* DESC AND MAP */}
            <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}>
                <View style={{ height: 100, width: "100%", paddingLeft: 10, paddingTop: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {
                            SelectedOffer.Title
                        }
                    </Text>
                    <Text style={{ color: "grey", fontSize: 13 }}>
                        {
                            SelectedOffer.Detail
                        }
                    </Text>
                </View>
                <View style={{ height: 130, width: "90%", margin: 10, elevation: 6, borderRadius: 20, backgroundColor: "white", overflow: "hidden" }}>
                    <MapView
                        style={{ height: "100%", width: "100%" }}
                        region={region}
                    >
                        {
                            SelectedOffer && (
                                <Marker

                                    coordinate={{
                                        latitude: +SelectedOffer.Lat,
                                        longitude: +SelectedOffer.Long,
                                        latitudeDelta: 2,
                                        longitudeDelta: 2,
                                    }}
                                    title={SelectedOffer.Title}
                                    description={SelectedOffer.Detail}
                                />
                            )
                        }
                    </MapView>
                </View>
            </View>
            {/* DESC AND MAP */}


            {/* Sharing Options */}
            {
                isAuth && (
                    <View style={{ height: 70, width: "100%", backgroundColor: COLORS.orange, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

                        <ClickAbleByAsim onPress={() => setPlaceOfferOpen(true)} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Image style={{ height: 20, width: 20 }} source={Offer} />
                            <Text style={{ color: "white", marginTop: 5 }}>
                                {
                                    I18nManager.isRTL ? "تقديم العرض" : "Place Offer"
                                }
                            </Text>
                        </ClickAbleByAsim>
                        <ClickAbleByAsim onPress={() => {
                            getComments()
                            setCommentsOpen(true)
                        }} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <EvilIcons
                                name="comment"
                                color="white"
                                size={29}
                            />
                            <Text style={{ color: "white", marginTop: 5 }}>
                                {
                                    I18nManager.isRTL ? "تعليقات" : "Comments"
                                }
                            </Text>
                        </ClickAbleByAsim>
                        <ClickAbleByAsim onPress={() => setInviteOpen(true)} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Image style={{ height: 20, width: 20 }} source={Friends} />
                            <Text style={{ color: "white", marginTop: 5 }}>
                                {
                                    I18nManager.isRTL ? "ادعو أصدقاء" : "Invite Friends"
                                }
                            </Text>
                        </ClickAbleByAsim>
                        <ClickAbleByAsim onPress={() => ShareIt()} style={{ flex: 1, height: "100%", justifyContent: "center", alignItems: "center" }} >
                            <Image style={{ height: 20, width: 20 }} source={SharePic} />
                            <Text style={{ color: "white", marginTop: 5 }}>
                                {
                                    I18nManager.isRTL ? "شارك" : "Share"
                                }
                            </Text>
                        </ClickAbleByAsim>
                    </View>
                )
            }
            {/* Sharing Options */}


            <Search
                navigate={navigate}
                open={openSearch}
                close={() => setOpeneSearch(false)}
            />
            <NotificationDialog
                open={openNoti}
                close={() => setOpeneNoti(false)}
            />
            <InviteModal
                open={InviteOpen}
                navigate={navigate}
                setModalOpen={setInviteOpen}
            />
            <PlaceOffer
                open={PlaceOfferOpen}
                navigate={navigate}
                setModalOpen={setPlaceOfferOpen}
            />

            <CommentsDialog
                open={CommentsOpen}
                navigate={navigate}
                setModalOpen={setCommentsOpen}
                CommentsData={CommentsData}
                postComment={postComment}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        height: 200,
        width: '100%',
    },
});

export default OfferDetails;
