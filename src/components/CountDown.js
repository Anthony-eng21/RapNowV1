import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { fontSizes, spacing } from "../utils/sizes";
import { colors } from "../utils/colors";

//utils
const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

/**
 * Countdown component that displays a countdown timer.
 *
 * @param {Object} props - Component props
 * @param {number} props.minutes - Initial number of minutes for the countdown (default is 0.1)
 * @param {boolean} props.isPaused - Flag indicating whether the countdown is paused
 * @param {Function} props.onProgress - Callback function that receives the progress value (0 to 1) of the countdown
 * @param {Function} props.onEnd - Callback function called when the countdown ends
 * @returns {JSX.Element} Countdown component
 */
export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);

  const initialMillis = minutesToMillis(minutes);

  // const reset = () => {
  //   setMillis(initialMillis);
  // }; // Resets our timer to the last inputted time for another app state round

  const countDown = () => {
    // Every time we countdown, it ensures the time we pass in is the time that was previously given in milliseconds
    setMillis((time) => {
      if (time <= 0) {
        // End time, return 0
        clearInterval(interval.current);
        onEnd(); // Passed up to the component timer function with the reset logic as well
        return time;
      }
      const timeLeft = time - 1000; // Counts down by the second and shows us the second we are currently at
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(initialMillis);
  }, [initialMillis]);

  // Negative progression of the bar starts
  useEffect(() => {
    onProgress(millis / initialMillis);
  }, [millis, initialMillis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    // If we aren't paused and there is no current interval, we will set the interval
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <LinearGradient
      colors={["#F7971E", "#FFD200", "#FFAA00"]} // Define the colors for the gradient
      start={[1, 1]} // Define the start point of the gradient
      end={[0, 0]} // Define the end point of the gradient
      style={styles.container}
    >
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: "bold",
    color: colors.dimGrey,
    padding: spacing.lg,
  },
  container: {
    borderRadius: "55%",
    backgroundColor: colors.wuYellow,
  },
});
