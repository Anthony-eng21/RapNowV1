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
    // TouchableOpacity is used to create a pressable button
    <TouchableOpacity style={[styles(size).button, style]} activeOpacity={0.5} onPress={props.onPress}>
      {/* Display the text inside the button */}
      <Text style={[styles(size).text, textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

// Define the styles for the RoundedButton component
const styles = (size) => StyleSheet.create({
  // Style for the button container
  button: {
    borderRadius: size / 2,
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dimGrey, // Add a background color
    shadowColor: colors.white, // Add shadow color
    shadowOffset: { width: 2, height: 2 }, // Add shadow offset
    shadowOpacity: 0.2, // Add shadow opacity
    shadowRadius: 4, // Add shadow radius
    elevation: 10, // Add shadow for Android
  },
  // Style for the text inside the button
  text: {
    color: colors.white,
    fontSize: size / 4.5,
  },
});
