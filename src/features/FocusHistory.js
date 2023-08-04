import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";
import { fontSizes } from "../utils/sizes";
import { LinearGradient } from "expo-linear-gradient";

export const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return <Text style={styles.title}>😔No Freestyles!😔</Text>;

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={["#F7971E", "#FFD200", "#FFAA00"]} // Define the colors for the gradient
      start={[1, 1]} // Define the start point of the gradient
      end={[0, 0]} // Define the end point of the gradient
      style={styles.itemContainer}
    >
      <Text style={styles.item}>{`${item}`}</Text>
    </LinearGradient>
  );

  return (
    <>
      <Text style={styles.title}>🔥Freestyle List🔥</Text>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={history}
            renderItem={renderItem}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.wuYellow,
    fontSize: fontSizes.lg,
    fontWeight: "bold",
    padding: spacing.md,
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    // backgroundColor: colors.dimGrey,
    marginHorizontal: spacing.xxxl,
    marginVertical: spacing.md,
    padding: spacing.md,
    borderRadius: "50%",
    opacity: 0.9,
  },
  item: {
    color: colors.white,
    fontSize: fontSizes.mmd,
    fontWeight: "bold",
    textAlign: "center",
  },
  beebee: {
    justifyContent: "flex-start",
    backgroundColor: colors.dimGrey,
    marginHorizontal: 20,
    borderRadius: "25%",
    opacity: 0.9,
  },
});
