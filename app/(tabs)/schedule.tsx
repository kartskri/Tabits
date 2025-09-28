import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Deadline = {
    id: string;
    title: string;
    date: string;
};

type ScheduleItem = {
    id: string;
    name: string;
    time: string;
};

const deadlines: Deadline[] = [
    { id: "1", title: "Math HW", date: "11/01" },
    { id: "2", title: "Chemistry Project", date: "11/04" },
    { id: "3", title: "English Test", date: "11/12" },
];

const schedule: ScheduleItem[] = [
    { id: "W", name: "Wake Up", time: "7:00 AM" },
    { id: "E", name: "Eat Breakfast", time: "7:30 AM" },
    { id: "S", name: "School", time: "8:00 AM" },
    { id: "P", name: "Project", time: "4:00 PM" },
    { id: "D", name: "Dinner", time: "6:30 PM" },
];

export default function ScheduleScreen() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="settings-sharp" size={26} color="#007AFF" />
                <Text style={styles.headerTitle}>Deadlines</Text>
                <Ionicons name="add" size={28} color="#007AFF" />
            </View>

            {/* Deadlines */}
            {deadlines.map((deadline) => (
                <View key={deadline.id} style={styles.deadlineCard}>
                    <Text style={styles.deadlineText}>{deadline.title}</Text>
                    <Text style={styles.deadlineDate}>{deadline.date}</Text>
                    <Ionicons name="checkmark" size={20} color="#007AFF" />
                </View>
            ))}

            {/* Schedule Header */}
            <View style={styles.scheduleHeader}>
                <Text style={styles.sectionTitle}>My Schedule</Text>
                <Ionicons name="add" size={22} color="#007AFF" />
            </View>
            <Text style={styles.dateText}>DD/MMM</Text>

            {/* Schedule List */}
            <FlatList
                data={schedule}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.scheduleRow}>
                        <View style={styles.scheduleAvatar}>
                            <Text style={styles.scheduleAvatarText}>{item.id}</Text>
                        </View>
                        <Text style={styles.scheduleName}>{item.name}</Text>
                        <Text style={styles.scheduleTime}>{item.time}</Text>
                    </View>
                )}
            />
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
        flex: 1,
    },
    deadlineDate: {
        marginRight: 10,
        color: "#555",
    },
    scheduleHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    dateText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 10,
    },
    scheduleRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    scheduleAvatar: {
        backgroundColor: "#E8F0FE",
        width: 45,
        height: 45,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    scheduleAvatarText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    scheduleName: {
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
    },
    scheduleTime: {
        fontWeight: "600",
    },
});
