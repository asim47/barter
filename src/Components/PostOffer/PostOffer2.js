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
import NotificationDialog from '../NotificationDialog/NotificationDialog';
import CalculatorModal from './CalculatorModal';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Axios from 'axios';
import { API_ENDPOINT, Headers } from '../../../Global-Variables';
import ConfirmModal from "./ConfirmModal"

const PostOffer2 = ({ navigation }) => {
    const { navigate, openDrawer, goBack } = navigation;
    const dispatch = useDispatch()

    const [openNoti, setOpeneNoti] = useState(false);
    const [CalcOpen, setCalcOpen] = useState(false);
    const [Confirm, setConfirm] = useState(false);

    const [PointsArray, setPointsArray] = useState([]);
    const [PointsSelected, setPointsSelected] = useState([]);


    const [Description, setDescription] = useState("");
    const [Points, setPoints] = useState("");
    const [Location, setLocation] = useState("");
    const [Lat, setLat] = useState(25.2048493);
    const [Long, setLong] = useState(55.270782800000006);

    const [ErrorMsg, setErrorMsg] = useState("");
    const [Loading, setLoading] = useState(false);


    const [region, setRegion] = useState({
        latitude: 25.276987,
        longitude: 55.296249,
        latitudeDelta: 2.2,
        longitudeDelta: 2.2,
    })

    const UserData = useSelector(({ auth }) => auth.userData);

    useEffect(() => {
        getPoints()

        setLocation(UserData.Address1)
    }, [])


    async function getPoints() {
        try {
            let res = await Axios.get(API_ENDPOINT + "/Plugins/Barter/BarterService.svc/GetPointsList", Headers);

            setPointsArray(res.data.LoyalPointArray)
        } catch (error) {
            console.log(error);

        }
    }


    async function Finish() {
        if (!Description) return setErrorMsg("Please Enter a description!");
        if (!Points) return setErrorMsg("Please Select Loyality Points");
        if (!Location) return setErrorMsg("Please Search a Location!");

        setErrorMsg("");

        const body = {
            Description,
            Points,
            Location,
            Lat,
            Long
        };


        setLoading(true);
        dispatch(Actions.SaveAnAd(body)).then((bool) => {
            setLoading(false);

            setConfirm(true)

        })

    }
    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={{ height: 60, width: "100%", backgroundColor: COLORS.blue, alignItems: "center", flexDirection: "row" }}>
                <ClickAbleByAsim onPress={() => goBack()} style={{ height: "100%", width: 50, justifyContent: "center", padding: 10, transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}>
                    <AntDesign
                        name="arrowleft"
                        color="white"
                        size={30}
                    />
                </ClickAbleByAsim>
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>

                    {
                        I18nManager.isRTL ? "نشر عرض" : "POST AN OFFER"
                    }
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", flex: 1 }}>
                    <ClickAbleByAsim
                        style={{ padding: 10, paddingTop: 20, paddingBottom: 20 }}
                        onPress={() => setOpeneNoti(true)}>
                        <Image
                            style={{ height: 18, width: 18 }}
                            source={require('../../../assests/bell.png')}
                        />
                    </ClickAbleByAsim>
                </View>
            </View>
            {/* Header */}

            <KeyboardAwareScrollView style={{ width: Dimensions.get("window").width }} contentContainerStyle={{ justifyContent: "flex-start", alignItems: "center" }}>

                <TextInput
                    placeholder="Description"
                    multiline
                    // numberOfLines={6}
                    style={{
                        minHeight: 130,
                        width: "80%",
                        backgroundColor: "white",
                        borderWidth: 0.3,
                        borderRadius: 20,
                        marginTop: 30,
                        textAlignVertical: 'top'
                        // justifyContent: "flex-start",
                        // alignItems: "flex-start"
                    }}
                    value={Description}
                    onChangeText={e => setDescription(e)}
                />

                <Text style={{ color: "grey", marginTop: 10 }}>
                    Select Loyalty Points
                    </Text>
                <View style={{
                    width: "80%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 10
                }}>

                    <View
                        style={{
                            height: 45,
                            width: '85%',
                            borderWidth: .3,
                            borderRadius: 40,
                            // flexDirection: 'row',
                            padding: 5,
                            justifyContent: 'center',
                            // alignItems: 'center',
                            // marginBottom: 10,
                            borderColor: "grey",
                            backgroundColor: "white"
                        }}>
                        <RNPickerSelect

                            placeholder={{ label: I18nManager.isRTL ? "حدد نقاط الولاء" : 'Select Loyality Points', value: '' }}
                            style={{ width: '90%', height: "100%", color: '#9E9E9E' }}
                            onValueChange={value => setPoints(value)}
                            value={Points}
                            items={
                                PointsArray.length > 0 ? PointsArray.map((value) => { return { label: value.Name, value: value.ID } }) : []
                            }
                        />
                    </View>

                    <ClickAbleByAsim onPress={() => setCalcOpen(true)} style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                        <Image
                            source={require("../../../assests/icon_calculator_24.png")}
                        />
                    </ClickAbleByAsim>

                </View>

                <View style={{
                    height: 180,
                    width: "80%",
                    backgroundColor: "white",
                    borderWidth: 0.3,
                    borderRadius: 20,
                    marginTop: 20,
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflow: "hidden"
                }}>


                    <MapView
                        style={{ height: "100%", width: "100%" }}
                        region={region}
                    >
                        <Marker

                            coordinate={{
                                latitude: +Lat,
                                longitude: +Long,
                                latitudeDelta: 2,
                                longitudeDelta: 2,
                            }}
                        />
                    </MapView>



                    <View style={{
                        width: "80%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 40,
                        borderWidth: 0.3,
                        borderRadius: 20,
                        paddingLeft: 10,
                        position: "absolute",
                        backgroundColor: "white",
                        marginTop: 10
                    }}>
                        <TextInput
                            style={{ width: "80%" }}
                            value={Location}
                            onChangeText={(e) => setLocation(e)}
                        />


                        <ClickAbleByAsim onPress={() => { }} style={{ paddingRight: 10, flex: 1, height: "100%", justifyContent: "center", alignItems: "flex-end" }}>
                            <AntDesign
                                name="search1"
                                color="grey"
                                size={20}

                            />
                        </ClickAbleByAsim>

                    </View>

                </View>

                {
                    ErrorMsg ? (<Text style={{ marginTop: 10, color: "red" }}>
                        {ErrorMsg}
                    </Text>) : null
                }
                <ClickAbleByAsim style={styles.button1} onPress={() => Finish()}>
                    {
                        Loading ? (<ActivityIndicator color="white" />) : (<Text style={{ color: 'white', fontSize: 17 }}>
                            {I18nManager.isRTL ? 'إنهاء' : 'Finish'}
                        </Text>)
                    }
                </ClickAbleByAsim>
            </KeyboardAwareScrollView>


            <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />

            <CalculatorModal
                open={CalcOpen}
                setModalOpen={setCalcOpen}
            />

            <ConfirmModal
                open={Confirm}
                setModalOpen={setConfirm}
                navigate={navigate}
            />

        </View>
    )
}

export default PostOffer2

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
