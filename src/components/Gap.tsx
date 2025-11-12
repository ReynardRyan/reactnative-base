import React from 'react';
import { View } from 'react-native';

type GapProps = {
  width?: number | string;
  height?: number | string;
};

const Gap: React.FC<GapProps> = ({ width = 0, height = 0 }) => {
  return <View style={{ width, height }} />;
};

export default Gap;
