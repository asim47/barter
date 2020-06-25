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
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Axios from 'axios';
import { API_ENDPOINT, Headers } from '../../../Global-Variables';
import ImagePicker from 'react-native-image-crop-picker';
import NotificationDialog from '../NotificationDialog/NotificationDialog';

const PostOffer1 = (props) => {

    const dispatch = useDispatch()
    const { navigate, openDrawer, goBack } = props.navigation;

    const [ChildrenCategories, setChildrenCategories] = useState([]);

    const [Title, setTitle] = useState("");
    const [ParentCategorySelected, setParentCategorySelected] = useState("");
    const [ChildSelected, setChildSelected] = useState("");
    const [Condition, setCondition] = useState("");
    const [Image1, setImage1] = useState("");
    const [Image2, setImage2] = useState("");
    const [Image3, setImage3] = useState("");
    const [openNoti, setOpeneNoti] = useState(false);

    const [ErrorMsg, setErrorMsg] = useState("");

    const CategoriesArray = useSelector(({ home }) => home.CategoriesArray);



    async function getChild(value) {


   
        setChildSelected("")
        if (value == "") {
            setParentCategorySelected("")

            setChildrenCategories([])
            return
        }
        try {

            // let filtered = CategoriesArray.filter(x => x.Name == value)[0]

            let res = await Axios.post(API_ENDPOINT + "/Plugins/Categories/Categories.svc/GetChildCategoriesByUniqueName", {
                nLanguageID: I18nManager.isRTL ? "2" : "1",
                "nWebsiteID": "1",
                "nModuleType": "BarterDAL.Model.Barter",
                nCategoryUniqueName: value,
            }, Headers);



            if (res.data.GetChildCategoriesByUniqueNameResult.result) {
                setChildrenCategories(res.data.GetChildCategoriesByUniqueNameResult.CategoryData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    function UploadImage(toSet) {
        ImagePicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            if (toSet == 1) {
                setImage1(image.data)
            }
            if (toSet == 2) {
                setImage2(image.data)
            }
            if (toSet == 3) {
                setImage3(image.data)
            }
        }).catch((error) => {
            console.log(error)
        })
    }

 
    function Next() {

        if (!Title) return setErrorMsg("Please enter a Title!")
        if (!ParentCategorySelected) return setErrorMsg("Please Select a Category!")
        if (!ChildSelected) return setErrorMsg("Please Select a Sub Category!")
        if (!Condition) return setErrorMsg("Please Select a Confition")
        if (!Image1 && !Image2 && !Image3) return setErrorMsg("Please Select Atleast One Image!")
        setErrorMsg("")
        const body = {
            Title,
            Category: ParentCategorySelected,
            SubCategory: ChildSelected,
            Condition,
            Image1,
            Image2,
            Image3,
        }
        dispatch({
            type: Actions.SAVING_AD_SAVE_DATA,
            payload: body
        })
        navigate("PostOffer2")
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
                            I18nManager.isRTL ? "نشر عرض" : "POST AN OFFER"
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

            <View style={{ flex: 1 }}>
                <KeyboardAwareScrollView style={{ width: "100%" }} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>

                    <View
                        style={{
                            marginTop: 40,
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
                            placeholder={I18nManager.isRTL ? 'عنوان العرض ...' : 'Offer Title...'}
                            style={{
                                width: '90%',
                                height: '95%',
                                textAlign: I18nManager.isRTL ? 'right' : 'left',
                            }}
                            onChangeText={e => setTitle(e)}
                            value={Title}
                        />
                    </View>

                    <View
                        style={{
                            marginTop: 10,
                            height: 45,
                            width: '80%',
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
                            placeholder={{ label: I18nManager.isRTL ? "اختر تصنيف" : 'Select A category', value: '' }}
                            style={{ width: '100%', height: 10, color: '#9E9E9E' }}
                            onValueChange={value => {
                                setParentCategorySelected(value)
                                getChild(value)
                            }}
                            value={ParentCategorySelected}
                            items={CategoriesArray?.map((value) => {
                                return { value: value.UniqueName, label: value.Name }
                            })}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            height: 45,
                            width: '80%',
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
                            placeholder={{
                                label: I18nManager.isRTL ? "لم يتم تحديد فئة" : 'No Category Selected',
                                value: '',
                            }}
                            style={{ width: '100%', height: 10, color: '#9E9E9E' }}
                            onValueChange={value => setChildSelected(value)}
                            value={ChildSelected}
                            items={ChildrenCategories?.map((value) => {
                                return { value: value.UniqueName, label: value.Name }
                            })}
                        />
                    </View>
                    <View
                        style={{
                            marginTop: 10,
                            height: 45,
                            width: '80%',
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
                            value={Condition}
                            style={{ width: '100%', height: 20, color: '#9E9E9E' }}
                            onValueChange={value => {
                                setCondition(value)
                            }}
                            placeholder={{
                                label: I18nManager.isRTL ? "حدد الشرط" : 'Select Condition',
                                value: '',
                            }}
                            items={[
                                
                                { label: I18nManager.isRTL ? "جديد" : 'New', value: '1' },
                                { label: I18nManager.isRTL ? "استخدام قليل" : 'Little Use', value: '2' },
                                { label: I18nManager.isRTL ? "بحالة جيدة" : 'Good Condition', value: '3' },
                            ]}
                        />
                    </View>

                    <View style={{
                        width: "80%",
                        height: 120,
                        marginTop: 10,
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <ClickAbleByAsim onPress={() => UploadImage(1)} style={{ width: "31%", justifyContent: "center", alignItems: "center", height: 90, borderWidth: .3, backgroundColor: "white", borderRadius: 20, overflow: "hidden" }}>
                            {
                                Image1 ? (
                                    <Image
                                        resizeMode="cover"
                                        style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `data:image/png;base64,${Image1}` }}

                                    />
                                ) : <Image
                                        resizeMode="contain"
                                        style={{ height: "70%", width: "90%" }}
                                        source={require("../../../assests/no_picture.png")}

                                    />
                            }
                        </ClickAbleByAsim>

                        <ClickAbleByAsim onPress={() => UploadImage(2)} style={{ width: "31%", justifyContent: "center", alignItems: "center", height: 90, borderWidth: .3, backgroundColor: "white", borderRadius: 20, overflow: "hidden" }}>
                            {
                                Image2 ? (
                                    <Image
                                        resizeMode="cover"
                                        style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `data:image/png;base64,${Image2}` }}

                                    />
                                ) : <Image
                                        resizeMode="contain"
                                        style={{ height: "70%", width: "90%" }}
                                        source={require("../../../assests/no_picture.png")}

                                    />
                            }
                        </ClickAbleByAsim>

                        <ClickAbleByAsim onPress={() => UploadImage(3)} style={{ width: "31%", justifyContent: "center", alignItems: "center", height: 90, borderWidth: .3, backgroundColor: "white", borderRadius: 20, overflow: "hidden" }}>
                            {
                                Image3 ? (
                                    <Image
                                        resizeMode="cover"
                                        style={{ height: "100%", width: "100%" }}
                                        source={{ uri: `data:image/png;base64,${Image3}` }}

                                    />
                                ) : <Image
                                        resizeMode="contain"
                                        style={{ height: "70%", width: "90%" }}
                                        source={require("../../../assests/no_picture.png")}

                                    />
                            }
                        </ClickAbleByAsim>
                    </View>
                    {
                        ErrorMsg ? (<Text style={{ marginTop: 10, color: "red" }}>
                            {ErrorMsg}
                        </Text>) : null
                    }
                    <ClickAbleByAsim style={styles.button1} onPress={() => Next()}>
                        <Text style={{ color: 'white', fontSize: 17 }}>
                            {I18nManager.isRTL ? 'التالى' : 'Next'}
                        </Text>
                    </ClickAbleByAsim>
                </KeyboardAwareScrollView>
            </View>
            <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />

        </View>
    )
}

export default PostOffer1

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
