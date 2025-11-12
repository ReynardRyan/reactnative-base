import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import colors from '../constants/colors';
import { hp } from '../utils/responsive';

export type AppButtonProps = React.ComponentProps<typeof Button>;

export default function AppButton(props: AppButtonProps) {
  const { style, mode, buttonColor, textColor, children, contentStyle, labelStyle, ...rest } = props;
  return (
    <Button
      mode={mode ?? 'contained'}
      buttonColor={buttonColor ?? colors.primary}
      textColor={textColor ?? colors.white}
      style={[styles.button, style]}
      contentStyle={[styles.content, contentStyle]}
      labelStyle={[styles.label, labelStyle]}
      {...rest}
    >
      {children}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: hp(5.5),
  },
  content: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
});