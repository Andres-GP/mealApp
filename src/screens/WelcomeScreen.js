import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  const navigation = useNavigation();

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;

    setTimeout(() => {
      ring1Padding.value = withSpring(ring1Padding.value + hp(5));
    }, 100);

    setTimeout(() => {
      ring2Padding.value = withSpring(ring2Padding.value + hp(5));
    }, 300);

    setTimeout(() => {
      navigation.navigate('Home');
    }, 2500);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: hp(2), backgroundColor: '#FFC107' }}>
      <StatusBar style="light" />
      {/* Logo images with rings */}
      <Animated.View style={{ marginTop: 130, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: hp(10), padding: ring1Padding }}>
        <Animated.View style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: hp(8), padding: ring2Padding }}>
          {/* Usa require directamente para cargar la imagen */}
          <Image
            source={require('../../assets/images/welcome.png')}
            style={{width: hp(20), height: hp(20) }}
          />
        </Animated.View>
      </Animated.View>

      {/* Title and punchline */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-y-2' }}>
        <Text style={{ fontSize: hp(7), fontWeight: 'bold', color: 'white', letterSpacing: wp(0.5) }}>
          Fooddy
        </Text>
        <Text style={{ fontSize: hp(2), fontWeight: 'medium', color: 'white', letterSpacing: wp(0.3) }}>
          Food is always right
        </Text>
      </View>
    </View>
  );
}
