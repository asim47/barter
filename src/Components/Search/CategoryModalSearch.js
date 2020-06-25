import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  I18nManager,
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
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Axios from 'axios';
import { API_ENDPOINT, Headers } from '../../../Global-Variables';

const CategoryModalSearch = ({ open, setModalOpen, type }) => {

  const dispatch = useDispatch()
  const [FieldOne, setFieldOne] = useState('');
  const [Search, setSearch] = useState('');
  // const [FieldThree, setFieldThree] = useState('');


  const [ChildrenCategories, setChildrenCategories] = useState([]);
  const [SelectedPicker1, setSelectedPicker1] = useState("");
  const [SelectedPicker2, setSelectedPicker2] = useState("");
  const [ConditionSelector, setConditionSelector] = useState("");
  const [SortBy, setSortBy] = useState("");

  const CategoriesArray = useSelector(({ home }) => home.CategoriesArray);
  const selectedCategoryID = useSelector(({ home }) => home.selectedCategoryID);
  const keyword = useSelector(({ home }) => home.keyword);
  const condition = useSelector(({ home }) => home.condition);
  const distance = useSelector(({ home }) => home.distance);
  const coordinates = useSelector(({ home }) => home.coordinates);



  useEffect(() => {
    setSelectedPicker1(selectedCategoryID)
    getChild(selectedCategoryID)
  }, [])
  async function getChild(value) {

    if (value == "") {
      setSelectedPicker1("")
      setSelectedPicker2("")
      setChildrenCategories([])
      return
    }
    try {

      let filtered = CategoriesArray.filter(x => x.ID == value)[0]

      let res = await Axios.post(API_ENDPOINT + "/Plugins/Categories/Categories.svc/GetChildCategoriesByUniqueName", {
        nLanguageID: I18nManager.isRTL ? "2" : "1",
        "nWebsiteID": "1",
        "nModuleType": "BarterDAL.Model.Barter",
        nCategoryUniqueName: filtered.UniqueName,
      }, Headers);



      if (res.data.GetChildCategoriesByUniqueNameResult.result) {
        setChildrenCategories(res.data.GetChildCategoriesByUniqueNameResult.CategoryData)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async function Search1() {

    if (!SelectedPicker1 && !SelectedPicker2 && !FieldOne) {
      dispatch(Actions.settingCategoryDatas("keywordSearch", "")),
        dispatch(Actions.settingCategoryDatas("selectedCategoryIDSearch", "")).then(() => {
          dispatch(Actions.GettingChildrenCategoriesSearch())
          setModalOpen(false)
        })

      return setModalOpen(false)
    }
    Promise.all([
      dispatch(Actions.settingCategoryDatas("keywordSearch", FieldOne)),
      dispatch(Actions.settingCategoryDatas("selectedCategoryIDSearch", `${SelectedPicker1}${SelectedPicker2 ? `,${SelectedPicker2}` : ""}`))
    ]).then(() => {
      dispatch(Actions.GettingChildrenCategoriesSearch())
      setModalOpen(false)
    })
  }
  return (
    <Modal
    onModalHide={() => {
      setFieldOne("");
      setSearch("");
      setChildrenCategories([]);
      setSelectedPicker1("");
      setSelectedPicker2("");
      setConditionSelector("");
      setSortBy("");
      

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
          height: type == 1 ? 400 : 200,
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
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
            }}>
            <Image
              style={{
                width: 28,
                height: 28,
              }}
              source={require('../../../assests/close.png')}
            />
          </ClickAbleByAsim>
          {type == 1 ? (
            <View style={{ height: '100%', width: '80%' }}>
              <Text
                style={{
                  color: COLORS.orange,
                  marginTop: 70,
                  textAlign: I18nManager.isRTL ? 'left' : 'left',
                }}>
                {I18nManager.isRTL ? 'اختر الفئة' : 'Select Category'}
              </Text>

              {/* <View
                style={{
                  marginBottom: 10,
                  paddingLeft: 10,
                  height: 45,
                  width: '100%',
                  borderWidth: 0.3,
                  marginTop: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TextInput
                  placeholder={I18nManager.isRTL ? 'بحث' : 'Search'}
                  value={FieldOne}
                  style={{ width: '90%' }}
                  onChangeText={e => setFieldOne(e)}
                />
              </View> */}
              <View
                style={{
                  marginBottom: 10,
                  paddingLeft: 10,
                  height: 50,
                  width: '100%',
                  borderWidth: 0.3,
                  marginTop: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <RNPickerSelect
                  placeholder={{ label: 'Select A category', value: '' }}
                  style={{ width: '100%', height: 10, color: '#9E9E9E' }}
                  onValueChange={value => {
                    setSelectedPicker1(value)
                    getChild(value)
                  }}
                  value={SelectedPicker1}
                  items={CategoriesArray?.map((value) => {
                    return { value: value.ID, label: value.Name }
                  })}
                />
              </View>
              <View
                style={{
                  marginBottom: 10,
                  paddingLeft: 10,
                  height: 50,
                  width: '100%',
                  borderWidth: 0.3,
                  marginTop: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <RNPickerSelect
                  placeholder={{
                    label: 'No Category Selected',
                    value: '',
                  }}
                  style={{ width: '100%', height: 10, color: '#9E9E9E' }}
                  onValueChange={value => setSelectedPicker2(value)}
                  value={SelectedPicker2}
                  items={ChildrenCategories?.map((value) => {
                    return { value: value.ID, label: value.Name }
                  })}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ClickAbleByAsim
                  onPress={() => Search1()}
                  style={{
                    backgroundColor: COLORS.blue,
                    height: 45,
                    marginTop: 20,
                    width: '80%',
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 6,
                    overflow: 'hidden',
                    marginBottom: 10,
                  }}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    {I18nManager.isRTL ? 'بحث' : 'SEARCH'}
                  </Text>
                </ClickAbleByAsim>
              </View>
            </View>
          ) : type == 2 ? (
            <View style={{ height: '100%', width: '80%' }}>
              <Text
                style={{
                  color: COLORS.orange,
                  marginTop: 20,
                  textAlign: I18nManager.isRTL ? 'left' : 'left',
                }}>
                {I18nManager.isRTL ? 'أدخل المسافة' : 'Enter Distance'}
              </Text>

              <View
                style={{
                  marginBottom: 10,
                  paddingLeft: 10,
                  height: 45,
                  width: '100%',
                  borderWidth: 0.3,
                  marginTop: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  keyboardType="numeric"
                  placeholder={
                    I18nManager.isRTL
                      ? 'أدخل المسافة (كم)'
                      : 'Enter Distance (KM)'
                  }
                  value={Search}
                  onChangeText={e => setSearch(e)}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ClickAbleByAsim
                  onPress={() => {
                    if (Search) {
                      dispatch(Actions.settingCategoryDatas("distanceSearch", parseInt(Search))).then(() => {
                        dispatch(Actions.GettingChildrenCategoriesSearch())
                      })
                      setModalOpen(false)
                    } else {
                      dispatch(Actions.settingCategoryDatas("distanceSearch", parseInt(0))).then(() => {
                        dispatch(Actions.GettingChildrenCategoriesSearch())
                        setModalOpen(false)
                      })
                    }
                  }}
                  style={{
                    backgroundColor: COLORS.blue,
                    height: 45,
                    marginTop: 20,
                    width: '80%',
                    borderRadius: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 6,
                    overflow: 'hidden',
                    marginBottom: 10,
                  }}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>
                    {I18nManager.isRTL ? 'بحث' : 'SEARCH'}
                  </Text>
                </ClickAbleByAsim>
              </View>
            </View>
          ) : type == 3 ? (
            <View style={{ height: '100%', width: '80%' }}>
              <Text
                style={{
                  color: COLORS.orange,
                  marginTop: 60,
                  textAlign: I18nManager.isRTL ? 'left' : 'left',
                }}>
                {I18nManager.isRTL ? 'حدد الشرط' : 'Select Condition'}
              </Text>

              <View
                style={{
                  marginBottom: 10,
                  paddingLeft: 10,
                  height: 55,
                  width: '100%',
                  borderWidth: 0.3,
                  marginTop: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <RNPickerSelect
                  value={ConditionSelector}
                  style={{ width: '100%', height: 20, color: '#9E9E9E' }}
                  onValueChange={value => {
                    setConditionSelector(value)
                    dispatch(Actions.settingCategoryDatas("conditionSearch", value)).then(() => {
                      dispatch(Actions.GettingChildrenCategoriesSearch())
                      setModalOpen(false)
                    })
                  }}
                  items={[
                    {
                      label: I18nManager.isRTL ? "حدد الشرط" : 'Select Condition',
                      value: '',
                    },
                    { label: I18nManager.isRTL ? "جديد" : 'New', value: '1' },
                    { label: I18nManager.isRTL ? "استخدام قليل" : 'Little Use', value: '2' },
                    { label: I18nManager.isRTL ? "بحالة جيدة" : 'Good Condition', value: '3' },
                    { label: I18nManager.isRTL ? "الكل" : 'All', value: '' },
                  ]}
                />
              </View>
            </View>
          ) : type == 4 ? (
            <View
              style={{
                height: '100%',
                width: '80%',
                // textAlign: I18nManager.isRTL ? 'right' : 'left',
              }}>
              <Text
                style={{
                  color: COLORS.orange,
                  marginTop: 60,
                  textAlign: I18nManager.isRTL ? 'left' : 'left',
                }}>
                {I18nManager.isRTL ? 'ترتيب حسب' : 'Sort By'}
              </Text>

              <View
                style={{
                  marginBottom: 10,
                  paddingLeft: 10,
                  height: 55,
                  width: '100%',
                  borderWidth: 0.3,
                  marginTop: 10,
                  borderRadius: 20,
                  justifyContent: 'center',
                }}>
                <RNPickerSelect
                  placeholder={{ label: 'Select Sort Option', value: '' }}
                  style={{ width: '100%', height: 10, color: '#9E9E9E' }}
                  onValueChange={value => {
                    setSortBy(value)
                    dispatch(Actions.settingCategoryDatas("sortBySearch", value)).then(() => {
                      dispatch(Actions.GettingChildrenCategoriesSearch())
                      setModalOpen(false)
                    })
                  }}
                  value={SortBy}
                  items={[
                    { label: 'Latest Added', value: 1 },
                    { label: 'Ending Soon', value: 2 },
                    { label: 'Any Order', value: -1 },
                  ]}
                />
              </View>
            </View>
          ) : null}
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default CategoryModalSearch;

const styles = StyleSheet.create({});
