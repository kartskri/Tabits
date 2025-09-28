// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Deadline = {
  id: string;
  title: string;
  date: string;
};

type Task = {
  id: string;
  name: string;
  time: string;
};

const deadlines: Deadline[] = [
  { id: "1", title: "Math HW", date: "11/01" },
  { id: "2", title: "Chemistry Project", date: "11/04" },
];

const tasks: Task[] = [
  { id: "P", name: "Project", time: "4:00 PM" },
  { id: "D", name: "Dinner", time: "6:30 PM" },
];

export default function HomeScreen() {
  return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="settings-sharp" size={26} color="#007AFF" />
          <Text style={styles.headerTitle}>Hi, (username)</Text>
          <View style={{ width: 26 }} /> {/* spacer for symmetry */}
        </View>

        {/* Deadlines */}
        <Text style={styles.sectionTitle}>Important Deadlines</Text>
        {deadlines.map((deadline) => (
            <View key={deadline.id} style={styles.deadlineCard}>
              <View>
                <Text style={styles.deadlineText}>{deadline.title}</Text>
                <Text style={styles.deadlineDate}>{deadline.date}</Text>
              </View>
              <Ionicons name="checkmark" size={20} color="#007AFF" />
            </View>
        ))}

        {/* Upcoming Tasks */}
        <Text style={styles.sectionTitle}>Upcoming Tasks</Text>
        <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.taskRow}>
                  <View style={styles.taskAvatar}>
                    <Text style={styles.taskAvatarText}>{item.id}</Text>
                  </View>
                  <Text style={styles.taskName}>{item.name}</Text>
                  <Text style={styles.taskTime}>{item.time}</Text>
                </View>
            )}
        />

        {/* Priority Habit */}
        <Text style={styles.sectionTitle}>Priority Habit</Text>
        <View style={styles.habitCard}>
          <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/2904/2904972.png",
              }}
              style={styles.habitImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.habitTitle}>Meditate</Text>
            <Text style={styles.habitStatus}>
              Status: <Text style={{ fontWeight: "600" }}>Complete</Text>
            </Text>
            <Text style={styles.habitXP}>+10 XP</Text>
          </View>
          <Ionicons name="star" size={24} color="#007AFF" />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  deadlineCard: {
    backgroundColor: "#E8F0FE",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deadlineText: {
    fontSize: 16,
    fontWeight: "500",
  },
  deadlineDate: {
    fontSize: 14,
    color: "#555",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  taskAvatar: {
    backgroundColor: "#E8F0FE",
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  taskAvatarText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  taskTime: {
    fontWeight: "600",
  },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  habitImage: {
    width: 70,
    height: 70,
    marginRight: 12,
    borderRadius: 12,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  habitStatus: {
    fontSize: 14,
    marginVertical: 2,
  },
  habitXP: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
});
