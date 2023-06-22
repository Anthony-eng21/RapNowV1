import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { colors } from "../utils/colors";
import { spacing } from "../utils/sizes";
import { fontSizes } from "../utils/sizes";

export const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return (
      <View style={styles.beebee}>
        <Text style={styles.title}>No Freestyles!</Text>
      </View>
    );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item}</Text>
    </View>
  );

  return (
    <>
      <View style={styles.beebee}>
        <Text style={styles.title}>Freestyle List</Text>
      </View>
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
    backgroundColor: colors.dimGrey,
    marginHorizontal: spacing.xl,
    marginVertical: spacing.md,
    padding: spacing.md,
    borderRadius: "50%",
    opacity: 0.9,
  },
  item: {
    color: colors.wuYellow,
    fontSize: fontSizes.mmd,
    fontWeight: "bold",
    textAlign: "center",
  },
  beebee: {
    justifyContent: "flex-start",
    backgroundColor: colors.dimGrey,
    marginHorizontal: 30,
    borderRadius: "25%",
    opacity: 0.9,
  },
});
