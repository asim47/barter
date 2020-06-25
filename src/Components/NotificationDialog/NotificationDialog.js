import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    I18nManager,
    ScrollView,
    FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../../colos/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import {
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native-gesture-handler';
import { useSelector, useDispatch } from "react-redux"
import HTMLView from 'react-native-htmlview';
const NotificationDialog = ({ open, close }) => {
    const Noti = useSelector(({ home }) => home.Notifications)

    return (
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={open}
            hasBackdrop
            avoidKeyboard
            onBackButtonPress={() => close()}
            onBackdropPress={() => close()}>
            <View
                style={{
                    backgroundColor: 'white',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 400,
                    width: '90%',
                    alignSelf: 'center',
                    borderRadius: 20,
                    overflow: 'hidden',
                }}>
                <ScrollView >
                    <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 17, textAlign: "center" }}>
                        Notifications
                    </Text>

                    {/* <View style={{ width: "90%", marginTop: 10, }}>
                        <Text>An Offer Has been Placed Against  <Text style={{ fontWeight: "bold" }}>Test from Mobile</Text> </Text>
                        <Text>115/11/2001 8:03 AM</Text>

                    </View> */}

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        data={Noti}
                        renderItem={({ item, index }) => (
                            <View style={{ width: "90%", marginTop: 10, }}>
                                {/* <Text>An Offer Has been Placed Against  <Text style={{ fontWeight: "bold" }}>Test from Mobile</Text> </Text> */}
                                {/* <Text>
                                    {
                                        item.WebNotificationMessage
                                    }
                                </Text> */}
                                <HTMLView
                                // style={{flex:1, flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}
                                value={`<div>${item.WebNotificationMessage}</div>`}
                                />
                                
                                <Text>
                                    {
                                        item.WebNotificationCreatedDate
                                    }
                                </Text>

                            </View>
                        )}
                    keyExtractor={(e) => e.ModuleID}
                    />

                </ScrollView>
            </View>
        </Modal>
    );
};

export default NotificationDialog;

const styles = StyleSheet.create({
    div:{
        fontWeight:"bold"
    }
});
