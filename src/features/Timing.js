import React from "react";
import { View, StyleSheet } from "react-native";
import { RoundedButton } from "../components/RoundedButton";

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="1min"
          onPress={() => onChangeTime(1)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="2min"
          onPress={() => onChangeTime(2)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="3min"
          onPress={() => onChangeTime(3)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
