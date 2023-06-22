import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';

/**
 * RoundedButton component that displays a rounded button with text.
 *
 * @param {Object} props - Component props
 * @param {Object} props.style - Custom styles to be applied to the button
 * @param {Object} props.textStyle - Custom styles to be applied to the button text
 * @param {number} props.size - Size of the button (diameter of the circle)
 * @param {string} props.title - Text to be displayed on the button
 * @param {Function} props.onPress - Callback function when the button is pressed
 * @returns {JSX.Element} RoundedButton component
 */
export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} onPress={props.onPress}>
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

// Styles for the RoundedButton component
const styles = (size) => ({
  radius: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: "center",
    borderColor: colors.wuYellow,
    borderWidth: 2
  },
  text: {
    color: colors.wuYellow,
    fontSize: size / 4
  },
});
