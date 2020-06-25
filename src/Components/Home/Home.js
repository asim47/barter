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
  FlatList,
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import Carousel, { Pagination } from 'react-native-snap-carousel';
// import { FlatList } from 'react-native-gesture-handler';
import { COLORS } from '../../../colos/colors';
import Search from '../Search/Search';
import NotificationDialog from '../NotificationDialog/NotificationDialog';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
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

const Home = ({ navigation }) => {
  const { navigate, openDrawer } = navigation;
  const dispatch = useDispatch();

  const [activeSlide, setActiveSlide] = useState();
  const [Switceher, setSwitceher] = useState(true);
  const [openSearch, setOpeneSearch] = useState(false);
  const [openNoti, setOpeneNoti] = useState(false);
  const [Page, setPage] = useState(1);

  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const loadingCategories = useSelector(({ home }) => home.loadingCategories);
  const CategoriesArray = useSelector(({ home }) => home.CategoriesArray);
  const TotalPage = useSelector(({ home }) => home.TotalPage);
  const OffersArray = useSelector(({ home }) => home.OffersArray);

  useEffect(() => {
    dispatch(Actions.KeepLogin());
    dispatch(Actions.getParentCategoriesPagged(Page));
    dispatch(Actions.GettingOffersHome());
  }, []);

  const _renderItem = ({ item, index }) => {
    return (
      <ImageBackground
        source={item.image}
        style={{ height: '100%', width: '100%', justifyContent: 'center' }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <Text>
            <Text style={{ color: 'white', fontSize: 32 }}>{item.heading1} </Text>
            <Text style={{ fontSize: 37, color: '#FF6412' }}>
              {item.Discount}%
            </Text>
          </Text>
          <Text style={{ fontSize: 22, color: 'white' }}>{item.headinh2}</Text>
          <Text style={{ fontSize: 42, color: 'white' }}>{item.heading3}</Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          height: 50,
          width: '100%',
          zIndex: 100,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 0.3,

            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <ClickAbleByAsim
            style={{ padding: 20, paddingLeft: 10 }}
            onPress={() => openDrawer()}>
            <Image source={require('../../../assests/menu.png')} />
          </ClickAbleByAsim>
        </View>
        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 14 }}>
            BARTER SYSTEM
          </Text>
        </View>
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

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Carousel
          showsHorizontalScrollIndicator
          indicator
          autoplay
          autoplayDelay={0}
          autoplayInterval={3000}
          // ref={(c) => { this._carousel = c; }}
          data={DummyData}
          renderItem={_renderItem}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width}
          onSnapToItem={index => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={DummyData.length}
          activeDotIndex={activeSlide}
          containerStyle={{
            position: 'absolute',
            width: Dimensions.get('window').width,
            bottom: 0,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
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

      {/* Switcher */}
      <View
        style={{
          height: 90,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: 40,
            borderWidth: 1,
            width: '65%',
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
              {I18nManager.isRTL ? 'الاقسام' : 'Categories'}
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
              {I18nManager.isRTL ? 'عروض' : 'Offers'}
            </Text>
          </ClickAbleByAsim>
        </View>
      </View>
      {/* Switcher */}

      {Switceher ? (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {CategoriesArray.length == 0 ? (
              <ActivityIndicator color={COLORS.orange} size={30} />
            ) : (
                CategoriesArray?.map((Value, index) => {
                  return (
                    <ClickAbleByAsim
                      onPress={() => {
                        dispatch(
                          Actions.settingCategoryDatas(
                            'selectedCategoryID',
                            Value.ID,
                          ),
                        ).then(() => {
                          dispatch(Actions.GettingChildrenCategories());
                        });
                        navigate('CategoryList', { Name: Value.Name });
                      }}
                      style={{
                        height: 120,
                        width: '90%',
                        marginBottom: 10,
                        borderRadius: 20,
                        elevation: 6,
                        backgroundColor: 'white',
                        shadowColor: 'darkgrey',
                        shadowRadius: 4,
                        shadowOffset: { height: 0, width: 0 },
                        shadowOpacity: 1,
                        // overflow: 'hidden',
                      }}>
                      <>
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 20,
                          }}
                          source={{ uri: Value.Image }}
                        />
                      </>
                    </ClickAbleByAsim>
                  );
                })
              )}
            {TotalPage != Page && (
              <ClickAbleByAsim
                style={styles.button1}
                onPress={() => {
                  dispatch(Actions.getParentCategoriesPagged(Page + 1));
                  setPage(Page + 1);
                }}>
                {loadingCategories ? (
                  <ActivityIndicator color="white" />
                ) : (
                    <Text style={{ color: 'white', fontSize: 17 }}>
                      {I18nManager.isRTL ? 'تحميل المزيد' : 'Load More'}
                    </Text>
                  )}
              </ClickAbleByAsim>
            )}
          </ScrollView>
        </View>
      ) : OffersArray.length == 0 ? (
        <ActivityIndicator color={COLORS.orange} size={30} />
      ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                // style={{marginBottom:700}}
                data={OffersArray}
                renderItem={({ item, index }) => (
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
                    <View style={{ height: '100%', width: '30%', }}>

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

                )}
                keyExtractor={item => item.BarterID}
              />
            </View>
          )}
      <Search navigate={navigate} open={openSearch} close={() => setOpeneSearch(false)} />
      <NotificationDialog open={openNoti} close={() => setOpeneNoti(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    height: 250,
    width: '100%',
  },
  button1: {
    backgroundColor: '#FF6412',
    height: 50,
    width: 180,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    marginBottom: 20,
    overflow: 'hidden',
  },
});

export default Home;
