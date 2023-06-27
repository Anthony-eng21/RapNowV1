import { StatusBar } from "expo-status-bar";
// import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  SafeAreaView,
  ImageBackground,
} from "react-native";
//safe area view allows all components to be safely rendered based off the bounds of the screen. only available on ios 11+
//on android it falls back onto a
import React, { useState } from "react";

import { colors } from "./src/utils/colors";
//Features 
import { FocusHistory } from "./src/features/FocusHistory";
import { Focus } from "./src/features/Focus";
import { Timer } from "./src/features/Timer";

import { fontSizes } from "./src/utils/sizes";
import { spacing } from "./src/utils/sizes";

export default function App() {
  const [currentSubject, setCurrentSubject] = useState();
  const [history, setHistory] = useState([]);
  return (
    <>
      <StatusBar style="light" />

      <SafeAreaView style={styles.container}>
        {!currentSubject ? (
          <ImageBackground
            source={require('./assets/fishmicsplash.jpg')}
            resizeMode="cover"
            style={styles.img}
          >
            <Focus addSubject={setCurrentSubject} />
            <FocusHistory history={history} />
          </ImageBackground>
        ) : (
          <Timer
            focusSubject={currentSubject}
            onTimerEnd={(subject) => {
              setHistory([...history, subject]) //includes the incoming focusSubject and the shows all the items before
            }}
            clearSubject={() => setCurrentSubject(null)}
          />
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.dimGrey,
  },
  img: {
    flex: 1,
  },
});
