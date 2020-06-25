import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    I18nManager,
    ActivityIndicator,
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
import { useDispatch, useSelector } from "react-redux"
import * as Actions from "../../../store/Actions"
import Feather from "react-native-vector-icons/Feather"


const CommentsDialog = ({ open, navigate, setModalOpen, CommentsData,postComment }) => {


    const dispatch = useDispatch()

    const [CommentText, setCommentText] = useState(false);
    const [ErrorMsg, setErrorMsg] = useState('');


    return (
        <Modal
            onModalHide={() => {
            }}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            isVisible={open}
            hasBackdrop
            avoidKeyboard
            onBackButtonPress={() => setModalOpen(false)}
            onBackdropPress={() => setModalOpen(false)}>
            <View
                style={{
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 500,
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 20,
                    overflow: 'hidden',
                }}>
                <KeyboardAwareScrollView
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="always"
                    style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ClickAbleByAsim
                        onPress={() => setModalOpen(false)}
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            padding: 10,
                            zIndex: 9000
                        }}>
                        <Image
                            style={{
                                width: 28,
                                height: 28,
                            }}
                            source={require('../../../assests/close.png')}
                        />
                    </ClickAbleByAsim>
                    {/* Heading View */}
                    <View style={{ height: 70, width: "100%" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.orange, marginTop: 30 }}>
                            Comments {  CommentsData &&  `(${CommentsData.length})`}
                            </Text>
                    </View>
                    {/* Heading View */}
                    {/* Comments View */}
                    <View style={{ height: 350, width: "100%" }}>

                        {
                            CommentsData ? CommentsData.length > 0 ? (
                                <FlatList
                                    initialScrollIndex={CommentsData ? CommentsData?.length -1 : 0 }
                                    
                                    data={CommentsData}
                                    keyExtractor={item => item}
                                    renderItem={({ item, index, }) => {
                                        return (
                                            <View style={{ width: "100%", minHeight: 85, borderBottomWidth: 0.3, borderColor: "grey", flexDirection: "row" }}>
                                                <View style={{ height: 85, width: "25%", justifyContent: "center", alignItems: "center", padding: 10, paddingTop: 0 }}>
                                                    <Image
                                                        style={{ height: "100%", borderRadius: 100, width: "100%", }}
                                                        source={require("../../../assests/empty.png")}
                                                        resizeMode="contain"
                                                    />

                                                </View>
                                                <View style={{ height: "100%", width: "75%", paddingTop: 10, paddingBottom: 10 }}>
                                                    <Text style={{ fontWeight: "bold" }}>
                                                        {item.UserName}
                                                </Text>
                                                    <Text style={{ color: "grey", fontSize: 12, }}>
                                                    {
                                                        item.Comments
                                                    }
                                                </Text>

                                                    <Text style={{ color: "grey", fontSize: 12, marginTop: 5, fontWeight: "bold" }}>
                                                        {
                                                            item.CreatedDate || "No Date"
                                                        }
                                                </Text>
                                                </View>

                                            </View>
                                        )
                                    }}
                                />
                            ) : (
                                    <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{color:"grey"}}>No Comments</Text>
                                    </View>
                                ) : (
                                    <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
                                        <ActivityIndicator color={COLORS.orange} />
                                    </View>
                                )
                        }

                    </View>
                    {/* Comments View */}
                    {/* Post Comment view */}
                    <View style={{ height: 80, width: "100%", justifyContent: "center", alignItems: "center" }}>
                        <View
                            style={{
                                height: 50,
                                width: '100%',
                                borderWidth: 1,
                                borderRadius: 40,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                borderColor: "grey",
                            }}>

                            <View style={{ backgroundColor: "white", padding: 3, borderRadius: 100, marginRight: 10, }}>
                                <Feather
                                    name="smile"
                                    size={27}
                                    color={COLORS.orange}
                                />
                            </View>
                            <TextInput
                                placeholder={I18nManager.isRTL ? 'قل شيئا حسنا!' : 'Say Something nice!'}
                                style={{
                                    width: '60%',
                                    height: '95%',
                                    textAlign: I18nManager.isRTL ? 'right' : 'left',
                                }}
                                onChangeText={e => { setCommentText(e) }}
                                multiline
                                value={CommentText}
                            />
                            <ClickAbleByAsim onPress={() => {
                                if(CommentText.length > 1){
                                    postComment(CommentText).then(()=>{
                                        setCommentText("")

                                    })
                                }
                             }} style={{ height: "95%", width: "25%", backgroundColor: COLORS.blue, borderRadius: 30, justifyContent: "center", alignItems: "center", }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>
                                    Post
                                </Text>
                            </ClickAbleByAsim>
                        </View>
                    </View>
                    {/* Post Comment view */}
                </KeyboardAwareScrollView>
            </View>
        </Modal>
    );
};

export default CommentsDialog;

const styles = StyleSheet.create({});
