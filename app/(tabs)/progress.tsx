import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';

type WeeklyProgress = {
    day: string;
    value: number; // percentage (0–1)
};

const mockWeeklyProgressApiCall = (): Promise<WeeklyProgress[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { day: "Mon", value: 0 },
                { day: "Tue", value: 0.2 },
                { day: "Wed", value: 0.5 },
                { day: "Thu", value: 0.7 },
                { day: "Fri", value: 1 },
            ]);
        }, 900);
    });
};

const ProgressScreen = () => {
    const [weeklyData, setWeeklyData] = useState<WeeklyProgress[]>([]);

    useEffect(() => {
        mockWeeklyProgressApiCall().then(setWeeklyData);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="settings-sharp" size={26} color="#007AFF" />
                <Text style={styles.headerTitle}>My Progress</Text>
                <View style={{ width: 26 }} />
            </View>

            {/* Profile & Stats */}
            <View style={styles.profileRow}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>P</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text>Streak: 100 days</Text>
                    <Text>Level 3</Text>
                    <Text>Badges: 3</Text>
                    {/* Custom XP Progress Bar */}
                    <View style={styles.xpBarBackground}>
                        <View style={[styles.xpBarFill, { flex: 0.8 }]} />
                        <View style={{ flex: 0.2 }} />
                    </View>
                    <Text style={styles.xpText}>80/100 XP</Text>
                </View>
            </View>

            {/* Weekly Progress */}
            <Text style={styles.sectionTitle}>Progress This Week</Text>
            <View style={styles.progressBox}>
                {weeklyData.map((item) => (
                    <View key={item.day} style={styles.progressRow}>
                        <Text style={styles.dayLabel}>{item.day}</Text>
                        <View style={styles.barBackground}>
                            <View
                                style={[
                                    styles.barFill,
                                    { flex: item.value, backgroundColor: "#007AFF" },
                                ]}
                            />
                            <View style={{ flex: 1 - item.value }} />
                        </View>
                    </View>
                ))}
            </View>

            {/* Badges */}
            <Text style={styles.sectionTitle}>Badge Collection</Text>
            <View style={styles.badgeRow}>
                <View style={styles.badge}>
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/2583/2583346.png",
                        }}
                        style={styles.badgeImage}
                    />
                    <Text style={styles.badgeLabel}>Consistent</Text>
                </View>
                <View style={styles.badge}>
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        }}
                        style={styles.badgeImage}
                    />
                    <Text style={styles.badgeLabel}>First Steps</Text>
                </View>
                <View style={styles.badge}>
                    <Image
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/1904/1904425.png",
                        }}
                        style={styles.badgeImage}
                    />
                    <Text style={styles.badgeLabel}>Fast-learner</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ProgressScreen;

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
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#E8F0FE",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        fontSize: 28,
        fontWeight: "bold",
    },
    xpBarBackground: {
        height: 8,
        flexDirection: "row",
        backgroundColor: "#eee",
        borderRadius: 4,
        overflow: "hidden",
        marginTop: 6,
    },
    xpBarFill: {
        height: "100%",
        backgroundColor: "#007AFF",
        borderRadius: 4,
    },
    xpText: {
        fontSize: 12,
        color: "#555",
        marginTop: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    progressBox: {
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
    },
    progressRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 4,
    },
    dayLabel: {
        width: 40,
        fontSize: 14,
        fontWeight: "500",
    },
    barBackground: {
        flex: 1,
        height: 12,
        flexDirection: "row",
        backgroundColor: "#eee",
        borderRadius: 6,
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
    },
    badgeRow: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    badge: {
        alignItems: "center",
        width: 90,
    },
    badgeImage: {
        width: 60,
        height: 60,
        marginBottom: 6,
    },
    badgeLabel: {
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
    },
});
