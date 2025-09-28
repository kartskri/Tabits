import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

type Friend = {
    id: string;
    name: string;
    streak: string;
};

const mockFriendsApiCall = (): Promise<Friend[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: "A", name: "Friend A", streak: "5 days" },
                { id: "B", name: "Friend B", streak: "2 days" },
                { id: "C", name: "Friend C", streak: "N/A" },
            ]);
        }, 600);
    });
};

export default function FriendsScreen() {
    const [friends, setFriends] = useState<Friend[]>([]);

    useEffect(() => {
        mockFriendsApiCall().then(setFriends);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Profile</Text>

            {/* Profile Avatar */}
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>P</Text>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Friends</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>2</Text>
                    <Text style={styles.statLabel}>Friend Streaks</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>5 days</Text>
                    <Text style={styles.statLabel}>Max Streak</Text>
                </View>
            </View>

            {/* Friends List */}
            <Text style={styles.subtitle}>Friends</Text>
            <FlatList
                data={friends}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.friendRow}>
                        <View style={styles.friendAvatar}>
                            <Text style={styles.friendAvatarText}>{item.id}</Text>
                        </View>
                        <View>
                            <Text style={styles.friendName}>{item.name}</Text>
                            <Text style={styles.friendStreak}>
                                Friend Streak: {item.streak}
                            </Text>
                        </View>
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
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    avatar: {
        alignSelf: "center",
        backgroundColor: "#E8F0FE",
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    avatarText: {
        fontSize: 28,
        fontWeight: "bold",
    },
    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statBox: {
        alignItems: "center",
        flex: 1,
    },
    statNumber: {
        fontSize: 18,
        fontWeight: "bold",
    },
    statLabel: {
        fontSize: 14,
        color: "#555",
    },
    subtitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },
    friendRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    friendAvatar: {
        backgroundColor: "#E8F0FE",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    friendAvatarText: {
        fontWeight: "bold",
        fontSize: 18,
    },
    friendName: {
        fontWeight: "600",
    },
    friendStreak: {
        fontSize: 12,
        color: "#555",
    },
});
