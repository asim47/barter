import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  I18nManager,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
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
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../store/Actions';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Slider } from 'react-native-elements';
const DummyData = [
  {
    heading1: 'get',
    Discount: 12,
    headinh2: 'Discount On',
    heading3: 'HONDA CIVIC',
    image: require('../../../assests/car.jpeg'),
  },
  {
    heading1: 'get',
    Discount: 14,
    headinh2: 'Discount On',
    heading3: 'HONDA CIVIC',
    image: require('../../../assests/car.jpeg'),
  },
  {
    heading1: 'get',
    Discount: 121,
    headinh2: 'Discount On',
    heading3: 'HONDA CIVIC',
    image: require('../../../assests/car.jpeg'),
  },
];

const PlaceOffer = ({ open, navigate, setModalOpen }) => {
  const [Selected, setSelected] = useState('');
  const [PointsSelected, setPointsSelected] = useState('0');


  const MyPostedOffers = useSelector(({ offer }) => offer.MyPostedOffers);


  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            borderWidth: 1,
            borderColor: item.BarterID == Selected ? COLORS.orange : "grey",
            borderRadius: 30,
            alignItems: 'center',
            backgroundColor: 'white',
            elevation: 6,
          }}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              width: '80%',
              marginTop: 10,
            }}>
            {
              item.Detail
            }
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: 'center',
              width: '80%',
              marginTop: 10,
              color: COLORS.orange,
            }}>
            Required Points 500
          </Text>

          <ImageBackground imageStyle={{height:60,marginTop:30}}  resizeMode="center" source={require('../../../assests/no_picture.png')}  style={{ width: 200, height: 120, borderRadius: 5 }} >
            <Image
              resizeMode="contain"
              source={{ uri: item.Image1 }}
              style={{ width: 200, height: 120, borderRadius: 5 }}
            />
          </ImageBackground>
          <ClickAbleByAsim
            style={item.BarterID == Selected ? styles.button2 : styles.button1}
            onPress={() => {
              if (Selected == item.BarterID) {
                setSelected('');
              } else {
                setSelected(item.BarterID);
              }
            }}>
            <Text
              style={{
                color: item.BarterID == Selected ? COLORS.blue : 'white',
                fontSize: 17,
              }}>
              {/* {I18nManager.isRTL ? 'تحديد' : 'Select'} */}

              {item.BarterID == Selected
                ? I18nManager.isRTL
                  ? 'إلغاء التحديد'
                  : 'Unselect'
                : I18nManager.isRTL
                  ? 'تحديد'
                  : 'Select'}
            </Text>
          </ClickAbleByAsim>
        </View>
      </View>
    );
  };

  return (
    <Modal
      onModalHide={() => { }}
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
          height: 530,
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

          <Text
            style={{
              fontSize: 20,
              color: COLORS.orange,
              alignSelf: 'flex-start',
              marginLeft: '10%',
              marginTop: 10,
            }}>
            Make an Offer
          </Text>

          <View style={styles.sliderContainer}>
            <Carousel
              // showsHorizontalScrollIndicator
              // indicator
              // autoplay
              // autoplayDelay={0}
              // autoplayInterval={3000}
              // ref={(c) => { this._carousel = c; }}
              loop
              data={MyPostedOffers}
              renderItem={_renderItem}
              sliderWidth={(80 / 100) * Dimensions.get('window').width}
              itemWidth={250}
            />
          </View>

          <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 5 }}>
            {PointsSelected}{' '}
            <Text
              style={{ fontWeight: '100', fontSize: 12, color: COLORS.orange }}>
              Points
            </Text>
          </Text>

          <View style={{ width: '80%' }}>
            <Slider
              // value={this.state.value}
              // onValueChange={value => this.setState({ value })}
              minimumValue={0}
              minimumTrackTintColor={COLORS.orange}
              maximumValue={50000}
              thumbTintColor={COLORS.orange}
              value={parseInt(PointsSelected.replace(',', ''))}
              step={10}
              onValueChange={e => {
                setPointsSelected(
                  e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'),
                );
              }}
            />
          </View>
          <TextInput
            placeholder="Description"
            multiline
            // numberOfLines={6}
            style={{
              height: 75,
              width: '80%',
              backgroundColor: 'white',
              borderWidth: 0.3,
              borderRadius: 20,
              textAlignVertical: 'top',
              padding: 10,
              // justifyContent: "flex-start",
              // alignItems: "flex-start"
            }}
          // value={Description}
          // onChangeText={e => setDescription(e)}
          />

          <ClickAbleByAsim style={styles.button3} onPress={() => { }}>
            <Text style={{ color: 'white', fontSize: 15 }}>
              {I18nManager.isRTL ? 'تقديم عرض' : 'Make Offer'}
            </Text>
          </ClickAbleByAsim>
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default PlaceOffer;

const styles = StyleSheet.create({
  sliderContainer: {
    height: 240,
    width: '100%',
    marginTop: 20,
  },
  button1: {
    backgroundColor: COLORS.blue,
    height: 40,
    width: 100,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: 'darkgrey',
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    overflow: 'hidden',
    marginTop: 10,
  },
  button2: {
    backgroundColor: 'white',
    height: 40,
    width: 100,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: 'darkgrey',
    shadowRadius: 4,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    overflow: 'hidden',
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.blue,
  },
  button3: {
    backgroundColor: COLORS.orange,
    height: 40,
    width: 130,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: 'darkgrey',
    shadowRadius: 10,
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 1,
    overflow: 'hidden',
    marginTop: 10,
  },
});
