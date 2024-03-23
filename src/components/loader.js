import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

const startRotationAnimation = (durationMs, rotationDegree) => {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  ).start();
};

const Loader = ({ durationMs = 1000 }) => {
  const rotationDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree);
  }, [durationMs, rotationDegree]);

  return (
    <View style={styles.spacer}>
      <View style={styles.container} accessibilityRole='progressbar'>
        <View style={[styles.background, { borderColor: '#FFC107' }]} />
        <Animated.View
          style={[
            styles.progress,
            { borderTopColor: '#FFC107' },
            {
              transform: [
                {
                  rotateZ: rotationDegree.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

const height = 60;

const styles = StyleSheet.create({
  spacer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: 'red !important',
    marginTop: 80,
  },
  container: {
    width: height,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderWidth: 4,
    opacity: 0.25,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: height / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 4,
    position: 'absolute',
  },
});

export default Loader;
