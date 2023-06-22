import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../utils/colors";
import { TextInput } from "react-native-paper";
import { RoundedButton } from "../components/RoundedButton";

import { fontSizes } from "../utils/sizes";
import { spacing } from "../utils/sizes";

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null); //storing the subject
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="Subject to rap about?"
          onChangeText={setSubject}
          color={colors.wuYellow}
          outlineColor={colors.wuYellow}
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={65} onPress={() => addSubject(subject)}/> 
        </View>
      </View>
    </View>
  );
};

//tying the state value of the inputs to the button so we can store and make a change in our app making it reactive.

const styles = StyleSheet.create({
  container: {
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: "top",
    flexDirection: "row",
  },
  text: {
    color: colors.wuYellow,
  },
  textInput: {
    flex: 1,
    marginRight: spacing.md,
  },
  button: {
    justifyContent: "center",
  },
});
