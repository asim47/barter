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
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; //list-alt //sort
import Entypo from 'react-native-vector-icons/Entypo'; // location-pin
import Ionicons from 'react-native-vector-icons/Ionicons'; // md-paper
import CategoryModal from './CategoryModal';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Search from '../Search/Search';
import NotificationDialog from '../NotificationDialog/NotificationDialog';

const CategoryList = ({ navigation, route }) => {
  const { navigate, openDrawer, goBack } = navigation;
  const { Name } = route.params;
  const dispatch = useDispatch();

  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalType, setModalType] = useState(1);
  const [activeSlide, setActiveSlide] = useState();
  const [Switceher, setSwitceher] = useState(true);
  const [openSearch, setOpeneSearch] = useState(false);
  const [openNoti, setOpeneNoti] = useState(false);
  const [region, setRegion] = useState({
    latitude: 25.0923463,
    longitude: 55.38518290000002,
    latitudeDelta: 2.2,
    longitudeDelta: 2.2,
  });

  const isAuth = useSelector(({ auth }) => auth.isAuth);

  const CategoryListing = useSelector(({ home }) => home.CategoryListing);
  const selectedCategoryID = useSelector(({ home }) => home.selectedCategoryID);
  const keyword = useSelector(({ home }) => home.keyword);
  const condition = useSelector(({ home }) => home.condition);
  const distance = useSelector(({ home }) => home.distance);
  const coordinates = useSelector(({ home }) => home.coordinates);
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
          {Name}
        </Text>

        <View
          style={{
            flex: 1,

            justifyContent: isAuth ? 'space-around' : 'flex-end',
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

      {!CategoryListing ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color={COLORS.orange} size={30} />
        </View>
      ) : (
          <>
            {Switceher ? (
              <>
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
                      {I18nManager.isRTL ? 'التصنيفات' : 'Categories'}
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
                      {I18nManager.isRTL ? 'موقعك' : 'Location'}
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
                      {I18nManager.isRTL ? 'حالة' : 'Condition'}
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
                      {I18nManager.isRTL ? 'ترتيب حسب' : 'Sort By'}
                    </Text>
                  </ClickAbleByAsim>
                </View>
                {/* ICONS */}
                {/* LISTING */}

                {CategoryListing.length == 0 ? (
                  <>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{ color: 'grey' }}>No Data Found</Text>
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
                                ) :null}
                              </ImageBackground>
                            </View>
                            <View
                              style={{
                                height: '100%',
                                width: '70%',
                                justifyContent: 'center',
                                paddingLeft: 10,
                              }}>
                              <Text style={{ fontWeight: 'bold' }}>{item.Title}</Text>
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
                                  <Text style={{ fontSize: 11, color: COLORS.blue }}>
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
                                  <Text style={{ fontSize: 11, color: COLORS.blue }}>
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
                  <MapView style={{ height: '100%', width: '100%' }} region={region}>
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
              opacity: Switceher ? 1 : 0.8,
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
              opacity: !Switceher ? 1 : 0.8,
            }}>
            <FontAwesome name="map" size={22} color="white" />
          </ClickAbleByAsim>
        </View>
      </View>
      {/* FLOATING BUTTON */}

      {/* Dialog */}
      <CategoryModal
        open={ModalOpen}
        setModalOpen={setModalOpen}
        type={ModalType}
      />
      <Search navigate={navigate} open={openSearch} close={() => setOpeneSearch(false)} />
      <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />
      {/* Dialog */}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    width: '100%',
  },
});

export default CategoryList;
