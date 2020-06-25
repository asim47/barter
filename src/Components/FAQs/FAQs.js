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
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../../../colos/colors';
import Search from '../Search/Search';
import NotificationDialog from '../NotificationDialog/NotificationDialog';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import AntDesign from "react-native-vector-icons/AntDesign"
import Axios from 'axios';
import { API_ENDPOINT, Headers } from '../../../Global-Variables';
import Entypo from "react-native-vector-icons/Entypo"

const Faqs = ({ navigation }) => {
    const { navigate, goBack } = navigation
    const [openSearch, setOpeneSearch] = useState(false);
    const [openNoti, setOpeneNoti] = useState(false);
    const [FaqData, setFaqData] = useState(null);
    const [ToOpen, setToOpen] = useState([]);


    const isAuth = useSelector(({ auth }) => auth.isAuth);


    useEffect(() => {
        GetFaqs()
    }, [])


    async function GetFaqs() {
        try {
            if (!FaqData) {
                let res = await Axios.post(API_ENDPOINT + "/Plugins/faq/FAQServices.svc/GetListing", {
                    nLanguageID: I18nManager.isRTL ? "2" : "1",
                    nPageKey: 1,
                    nPageSize: 20,
                    nWebsiteID: 1
                }, Headers)
                if (res.data.GetListingResult.result) {
                    setFaqData(res.data.GetListingResult.FAQAray)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }


    function Clicker(id) {
        // if (ToOpen.includes(id)) {
        //     setToOpen(ToOpen.filter(x => x != id))
        // } else {
        //     setToOpen([...ToOpen, id])
        // }


         if (ToOpen.includes(id)) {
            setToOpen([])
        } else {
            setToOpen([ id])
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View
                style={{
                    height: 50,
                    width: '100%',
                    zIndex: 100,
                    flexDirection: 'row',
                    backgroundColor: COLORS.blue
                }}>
                <View
                    style={{
                        flex: 0.3,

                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                    <ClickAbleByAsim
                        style={{ padding: 20, paddingLeft: 10 }}
                        onPress={() => goBack()}>
                        <AntDesign
                            name="arrowleft"
                            color="white"
                            size={30}
                        />
                    </ClickAbleByAsim>
                </View>
                <View
                    style={{
                        flex: 1,

                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                    <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 14 }}>
                        FAQ's
                    </Text>
                </View>
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
            <View style={{ flex: 1, alignItems: "center" }}>
                <ScrollView style={{width:"100%"}} contentContainerStyle={{alignItems:"center"}}>
                    {
                        !FaqData ? <ActivityIndicator color={COLORS.orange} style={{ marginTop: 30 }} /> : FaqData?.map((value) => {
                            return (
                                <View key={value.ID} style={{ width: "80%", marginTop: 10, borderWidth: 1, borderColor: "grey", borderRadius: 10, }}>
                                    <ClickAbleByAsim onPress={() => Clicker(value.ID)} style={{ height: 60, width: "100%", flexDirection: "row" }}>
                                        <View style={{ width: "20%", height: 60, justifyContent: "center", alignItems: "center" }}>
                                            <Entypo
                                                name={ToOpen.includes(value.ID) ? "minus" : "plus"}
                                                color={COLORS.blue}
                                                size={25}
                                            />
                                        </View>
                                        <View style={{ width: "80%", height: 60, justifyContent: "center", alignItems: "flex-start" }}>
                                            <Text style={{ color: "grey", fontSize: 13 }}>
                                                {
                                                    value.Question
                                                }
                                            </Text>
                                        </View>
                                    </ClickAbleByAsim>
                                    <Text style={{ color: "grey", margin: 10, marginTop: 0, display: ToOpen.includes(value.ID) ? "flex" : "none" }}>
                                        {
                                            value.Answer
                                        }
                                    </Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>


            <Search navigate={navigate} open={openSearch} close={() => setOpeneSearch(false)} />
            <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />
        </View>
    )
}

export default Faqs

const styles = StyleSheet.create({})
