import { Dimensions } from 'react-native';

/**
 * Responsive width based on screen width.
 * Example: wp(50) => 50% of screen width
 */
export const wp = (percent: number): number => {
  return Dimensions.get('window').width * (percent / 100);
};

/**
 * Responsive height based on screen height.
 * Example: hp(50) => 50% of screen height
 */
export const hp = (percent: number): number => {
  return Dimensions.get('window').height * (percent / 100);
};
