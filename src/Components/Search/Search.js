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
  Modal,
  ActivityIndicator,
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { COLORS } from '../../../colos/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //list-alt //sort
import Entypo from 'react-native-vector-icons/Entypo'; // location-pin
import Ionicons from 'react-native-vector-icons/Ionicons'; // md-paper
import CategoryModal from './CategoryModalSearch';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import MapView, { Marker } from 'react-native-maps';

const Search = ({ open, close,navigate }) => {
  const dispatch = useDispatch();
  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalType, setModalType] = useState(1);
  const [SearchText, setSearchText] = useState('');
  const [Switceher, setSwitceher] = useState(true);
  const CategoryListing = useSelector(({ home }) => home.CategoryListingSearch);
  const [region, setRegion] = useState({
    latitude: 25.0923463,
    longitude: 55.38518290000002,
    latitudeDelta: 2.2,
    longitudeDelta: 2.2,
  });
  return (
    <Modal
      visible={open}
      onRequestClose={() => {
        close();
        dispatch(Actions.settingCategoryDatas('CategoryListingSearch', []));
        dispatch(
          Actions.settingCategoryDatas('selectedCategoryIDSearch', null),
        );
        dispatch(Actions.settingCategoryDatas('keywordSearch', ''));
        dispatch(Actions.settingCategoryDatas('conditionSearch', ''));
        dispatch(Actions.settingCategoryDatas('distanceSearch', 0));
        dispatch(Actions.settingCategoryDatas('coordinatesSearch', ''));
        dispatch(Actions.settingCategoryDatas('sortBySearch', -1));
        setSwitceher(true);
        setSearchText('');
      }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ width: '100%', backgroundColor: 'blue' }}>
          {/* Search Type area */}
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: COLORS.orange,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <ClickAbleByAsim
              onPress={() => {
                dispatch(
                  Actions.settingCategoryDatas('keywordSearch', SearchText),
                ).then(() => {
                  dispatch(Actions.GettingChildrenCategoriesSearch());
                  // setModalOpen(false)
                });
              }}
              style={{
                height: '100%',
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="search" color="black" size={20} />
            </ClickAbleByAsim>
            <TextInput
              keyboardType="web-search"
              placeholder="Search"
              placeholderTextColor="white"
              style={{ fontSize: 20, color: 'white', width: '70%' }}
              value={SearchText}
              onChangeText={e => setSearchText(e)}
            />
            <ClickAbleByAsim
              style={{
                height: '100%',
                width: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                close();
                dispatch(
                  Actions.settingCategoryDatas('CategoryListingSearch', []),
                );
                dispatch(
                  Actions.settingCategoryDatas(
                    'selectedCategoryIDSearch',
                    null,
                  ),
                );
                dispatch(Actions.settingCategoryDatas('keywordSearch', ''));
                dispatch(Actions.settingCategoryDatas('conditionSearch', ''));
                dispatch(Actions.settingCategoryDatas('distanceSearch', 0));
                dispatch(Actions.settingCategoryDatas('coordinatesSearch', ''));
                dispatch(Actions.settingCategoryDatas('sortBySearch', -1));
                setSwitceher(true);
                setSearchText('');
              }}>
              <Entypo name="cross" color="white" size={30} />
              {/* {
                            SearchText.length > 0 ? (
                                <Entypo
                                    name="cross"
                                    color="white"
                                    size={30}

                                />
                            ):null
                      } */}
              {/* <Entypo
                                    name="cross"
                                    color="white"
                                    size={30}

                                />  */}
            </ClickAbleByAsim>
          </View>
          {/* Search Type area */}
          {/* ICONS */}
          <View
            style={{
              height: 60,
              width: '100%',
              backgroundColor: '#F7F3F2',
              borderBottomWidth: 0.3,
              flexDirection: 'row',
            }}>
            <ClickAbleByAsim
              onPress={() => {
                setModalType(1);
                setModalOpen(true);
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="list-alt" size={24} color="grey" />
              <Text style={{ color: 'grey', marginTop: 2, fontSize: 11 }}>
                Categories
              </Text>
            </ClickAbleByAsim>
            <ClickAbleByAsim
              onPress={() => {
                setModalType(2);
                setModalOpen(true);
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="location-pin" size={24} color="grey" />
              <Text style={{ color: 'grey', marginTop: 2, fontSize: 11 }}>
                Location
              </Text>
            </ClickAbleByAsim>
            <ClickAbleByAsim
              onPress={() => {
                setModalType(3);
                setModalOpen(true);
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="md-paper" size={24} color="grey" />
              <Text style={{ color: 'grey', marginTop: 2, fontSize: 11 }}>
                Condition
              </Text>
            </ClickAbleByAsim>
            <ClickAbleByAsim
              onPress={() => {
                setModalType(4);
                setModalOpen(true);
              }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="sort" size={24} color="grey" />
              <Text style={{ color: 'grey', marginTop: 2, fontSize: 11 }}>
                Sort By
              </Text>
            </ClickAbleByAsim>
          </View>
          {/* ICONS */}
        </View>

        {!CategoryListing ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={COLORS.orange} size={30} />
          </View>
        ) : (
            <>
              {Switceher ? (
                <>
                  {/* LISTING */}
                  {CategoryListing.length == 0 ? (
                    <>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text style={{ color: 'grey' }}>No Results Found</Text>
                      </View>
                    </>
                  ) : (
                      <View style={{ flex: 1 }}>
                        <FlatList
                          // style={{marginBottom:700}}
                          data={CategoryListing}
                          renderItem={({ item }) => (
                            <ClickAbleByAsim
                              onPress={() => {
                                close();
                                navigate('OfferDetails');
                                dispatch({
                                  type: Actions.SELECTING_OFFER,
                                  payload: item,
                                });
                              }}
                              style={{
                                height: 140,
                                width: '100%',
                                borderBottomWidth: 0.3,
                                flexDirection: 'row',
                                paddingBottom: 10,
                                paddingTop: 10,
                              }}>
                              <View style={{ height: '100%', width: '30%' }}>

                                <ImageBackground style={{ width: "100%", height: "100%" }} resizeMode="center" source={require('../../../assests/no_picture.png')}>
                                  {item?.RelatedItems && item?.RelatedItems[0]?.url ? (
                                    <Image
                                      source={{ uri: item?.RelatedItems[0]?.url }}
                                      style={{ height: '100%', width: '100%' }}
                                    />
                                  ) : null}
                                </ImageBackground>
                              </View>
                              <View
                                style={{
                                  height: '100%',
                                  width: '70%',
                                  justifyContent: 'center',
                                  paddingLeft: 10,
                                }}>
                                <Text style={{ fontWeight: 'bold' }}>
                                  {item.Title}
                                </Text>
                                <Text style={{ color: 'grey', fontSize: 13 }}>
                                  {item.Detail}
                                </Text>

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
                                    <Text
                                      style={{ fontSize: 11, color: COLORS.blue }}>
                                      {item.TotalSeekers} Offers
                                </Text>
                                  </View>
                                  <View
                                    style={{
                                      marginLeft: 10,
                                      borderWidth: 0.3,
                                      width: 150,
                                      height: 20,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      borderRadius: 20,
                                      backgroundColor: 'white',
                                      marginTop: 20,
                                    }}>
                                    <Text
                                      style={{ fontSize: 11, color: COLORS.blue }}>
                                      {item.Points} Loyalty Points
                                </Text>
                                  </View>
                                </View>
                              </View>
                            </ClickAbleByAsim>
                          )}
                          keyExtractor={item => item.Offers}
                        />
                      </View>
                    )}

                  {/* LISTING */}
                </>
              ) : (
                  <View style={{ flex: 1 }}>
                    <MapView
                      style={{ height: '100%', width: '100%' }}
                      region={region}>
                      {CategoryListing &&
                        CategoryListing.map(value => {
                          return (
                            <Marker
                              coordinate={{
                                latitude: +value.Lat,
                                longitude: +value.Long,
                                latitudeDelta: 2,
                                longitudeDelta: 2,
                              }}
                              title={value.Title}
                              description={value.Detail}
                            />
                          );
                        })}
                    </MapView>
                  </View>
                )}
            </>
          )}

        {/* FLOATING BUTTON */}
        <View
          style={{
            position: 'absolute',
            height: 60,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 50,
          }}>
          <View
            style={{
              width: 150,
              height: 40,
              borderRadius: 50,
              overflow: 'hidden',
              flexDirection: 'row',
            }}>
            <ClickAbleByAsim
              onPress={() => setSwitceher(true)}
              style={{
                flex: 1,
                backgroundColor: COLORS.blue,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FontAwesome name="list" size={22} color="white" />
            </ClickAbleByAsim>
            <ClickAbleByAsim
              onPress={() => setSwitceher(false)}
              style={{
                borderLeftWidth: 1,
                borderColor: 'white',
                flex: 1,
                backgroundColor: COLORS.blue,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.8,
              }}>
              <FontAwesome name="map" size={22} color="white" />
            </ClickAbleByAsim>
          </View>
        </View>
        {/* FLOATING BUTTON */}
        <CategoryModal
          open={ModalOpen}
          setModalOpen={setModalOpen}
          type={ModalType}
        />
      </SafeAreaView>
    </Modal>
  );
};

export default Search;

const styles = StyleSheet.create({});
