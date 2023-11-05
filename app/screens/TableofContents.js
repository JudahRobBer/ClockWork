import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableOfContents = () => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <Text style={styles.header}>Events</Text>
        <Text>Event 1</Text>
        <Text>Event 2</Text>
        {/* Add more events here */}
      </View>

      <View style={styles.column}>
        <Text style={styles.header}>Scheduled Time</Text>
        <Text>9:00 AM</Text>
        <Text>10:30 AM</Text>
        {/* Add corresponding scheduled times here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Arrange the columns horizontally
  },
  column: {
    flex: 1, // Make each column take an equal amount of space
    padding: 10,
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default TableOfContents;
