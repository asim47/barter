import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
  I18nManager,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';
import LoginModal from './LoginModal';
import ForgetModal from './ForgetModal';
import VerifyCode from '../VerifyCode/VerifyCode';
const DummyData = [
  {
    image: require('../../../assests/bg.png'),
  },
  {
    image: require('../../../assests/bg.png'),
  },
  {
    image: require('../../../assests/bg.png'),
  },
];

const SignInLogin = props => {
  const { navigate, openDrawer } = props.navigation;

  const [activeSlide, setActiveSlide] = useState();
  const [ModalOpen, setModalOpen] = useState(false);
  const [ForgetModalOpen, setForgetModalOpen] = useState(false);

  const [VerifyMOpen, setVerifyMOpen] = useState(false);
  const [EmailToRemember, setEmailToRemember] = useState("");

  const _renderItem = ({ item, index }) => {
    return (
      <ImageBackground
        source={item.image}
        style={{ height: '100%', width: '100%', justifyContent: 'center' }}
      />
    );
  };

  return (
    <>
      <View style={{ height: '100%', width: '100%' }}>
        <Carousel
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
            marginHorizontal: 1,
            backgroundColor: '#FF6412',
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
      <View
        style={{
          position: 'absolute',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 100,
        }}>
        <Image
          style={{ height: 70, width: 155, margin: 'auto' }}
          source={require('../../../assests/logo.png')}
        />
      </View>

      <View
        style={{
          height: 200,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
        }}>
        <ClickAbleByAsim
          onPress={() => setModalOpen(true)}
          style={{
            backgroundColor: '#49A1C7',
            height: 50,
            width: '80%',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 6,
            overflow: 'hidden',
          }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>

            {
              I18nManager.isRTL ? "مسجل بالفعل؟" : " Already Registered?"
            }
          </Text>
        </ClickAbleByAsim>

        <ClickAbleByAsim
          onPress={() => navigate('Signup')}
          style={{
            backgroundColor: '#FF6412',
            height: 50,
            marginTop: 10,
            width: '80%',
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 6,
            overflow: 'hidden',
          }}>
          <Text style={{ fontWeight: 'bold', color: 'white' }}>

            {
              I18nManager.isRTL ? "انشئ حساب" : "Create An Account"
            }
          </Text>
        </ClickAbleByAsim>
      </View>
      <LoginModal
        setVerifyMOpen={setVerifyMOpen}
        EmailToRemember={EmailToRemember}
        navigate={navigate}
        open={ModalOpen}
        setModalOpen={setModalOpen}
        setForgetModalOpen={setForgetModalOpen}
      />
      <ForgetModal
        navigate={navigate}
        open={ForgetModalOpen}
        setModalOpen={setForgetModalOpen}
        setModalLoginOpen={setModalOpen}
      />
      <VerifyCode
        open={VerifyMOpen}
        navigate={navigate}
        setModalOpen={setVerifyMOpen}
        EmailToRemember={EmailToRemember}
      />
    </>
  );
};

export default SignInLogin;

const styles = StyleSheet.create({});
