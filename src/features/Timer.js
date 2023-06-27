import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Text, Vibration } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";
import { Countdown } from "../components/CountDown";
import { useKeepAwake } from "expo-keep-awake";
import { RoundedButton } from "../components/RoundedButton";
import { spacing } from "../utils/sizes";
import { colors } from "../utils/colors";
import { beats } from "../utils/beats";
import { Audio } from "expo-av";
import { uSymb } from "../utils/uSymb"; //unicode symbols

const ONE_SECOND_IN_MS = 1000;

//Vibration API pattern arg
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(1); //0.75 prod / 0.1 testing // 40 seconds
  const [sound, setSound] = useState(null);
  const soundRef = useRef(null); // Ref to store the sound reference
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentProducer, setCurrentProducer] = useState("");
  const [previousBeatIndex, setPreviousBeatIndex] = useState(null); // Keep track of the previous beat index


  useEffect(() => {
    return () => {
      stopSound(); // Cleanup function to stop the sound when unmounting the component
    };
  }, []);

  const playSound = async () => {
    try {
      stopSound(); // Stop any currently playing sound before playing a new one
      
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * beats.length);
      } while (randomIndex === previousBeatIndex); // Repeat the random selection until a different beat is chosen

      const selectedBeat = beats[randomIndex];

      setPreviousBeatIndex(randomIndex) // Update the previous beat index
      
      setCurrentSongIndex(selectedBeat);
      setCurrentProducer(selectedBeat.producer);

      const { sound: newSound } = await Audio.Sound.createAsync(
        selectedBeat.file,
        {
          shouldPlay: true,
          isLooping: true,
        }
      );

      soundRef.current = newSound; // Store the sound reference in the ref
      setSound(newSound);
    } catch (error) {
      console.warn("Failed to load and play the sound", error.type);
    }
  };

  const pauseSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
      }
    } catch (error) {
      console.error("Error during sound playback: ", error);
    }
  };

  const resumeSound = async () => {
    if (soundRef.current) {
      await soundRef.current.playAsync();
    } else {
      playSound();
    }
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null; // Clear the sound reference
      setSound(null);
    }
  };

  const skipToNextSong = () => {
    //!isStarted is added to check if the timer is started before allowing to skip to the next song. If the timer is not started, the function will return early without performing any action.
    if (!currentSongIndex || !isStarted) {
      return;
    }
    stopSound(); // Stop the current song
    const nextSongIndex = (currentSongIndex + 1) % beats.length; // Calculate the index of the next song
    setCurrentSongIndex(nextSongIndex); // Update the current song index
    playSound(); // Play the next song
  };

  const onEnd = () => {
    Vibration.vibrate(PATTERN); // Vibrate the device
    setIsStarted(false); // Set the timer as not started
    setProgress(1); // Reset the progress to 100%
    // reset(); // Reset the countdown timer
    onTimerEnd(focusSubject); // Call the callback function to notify the timer has ended
    pauseSound(); // Pause the sound before stopping it
    stopSound(); // Stop the sound not sure if needed, more testing!
    setTimeout(() => {
      clearSubject()
    }, 500)
  };

  const handlePlayPause = () => {
    setIsStarted((prevIsStarted) => {
      if (prevIsStarted) {
        pauseSound(); // Pause the sound if the timer is already started
      } else {
        resumeSound(); // Resume or start the sound if the timer is not started
      }
      return !prevIsStarted; // Toggle the timer state (started or paused)
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Rapping about:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.slateBlue}
          style={{ height: 12, marginHorizontal: 5 }}
        />
      </View>
      <View style={styles.clearSubjectWrapper}>
        {/* back btn */}
        <RoundedButton
          title={uSymb.backArrowSymb}
          size={65}
          onPress={() => {
            clearSubject();
            stopSound();
          }}
        />
        {currentProducer && (
          <LinearGradient
            colors={['#F7971E', '#FFD200', '#FFAA00']} // Define the colors for the gradient
            start={[1, 1]} // Define the start point of the gradient
            end={[0, 0]} // Define the end point of the gradient
            style={styles.gradient}
          >
            <Text style={styles.producerTag}>{currentProducer}</Text>
          </LinearGradient>
        )}
      </View>
      {/* play||pause */}
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={`${isStarted ? uSymb.pauseSymb : uSymb.startSymb}\n${
            isStarted ? "Pause" : "Play"
          }`}
          onPress={handlePlayPause}
          textStyle={{
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          style={{ marginLeft: 100 }}
        />
        {/* manipulate song */}
        <RoundedButton
          title={`${uSymb.nextArrowSymb}\nnext`}
          size={65}
          textStyle={{ textAlign: "center" }}
          style={{ marginLeft: 40 }}
          onPress={() => skipToNextSong()}
        />
      </View>
      <>
        <View style={styles.timingWrapper}>
          <Timing onChangeTime={setMinutes} />
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flex: 0.25,
    flexDirection: "row",
    // paddingTop: spacing.xs,
    justifyContent: "center",
    alignItems: "center",
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: "row",
    paddingTop: spacing.xxl,
  },
  clearSubjectWrapper: {
    marginTop: 20,
    marginLeft: 28,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    color: colors.wuYellow,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: spacing.lg,
  },
  task: {
    color: colors.slateBlue,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: spacing.lg,
  },
  producerTag: {
    fontSize: spacing.md,
    marginLeft: 20,
    color: colors.mediumOrchid,
    fontSize: 22,
  },
  gradient: {
    borderRadius: 20, 
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingRight:15,
    marginLeft: 20,
  }
});
