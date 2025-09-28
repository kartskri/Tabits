import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLeaderboardStore } from '@/store/leaderboardStore';

export default function FriendsScreen() {
    const { leaderboard } = useLeaderboardStore();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Leaderboard</Text>

            {/* Profile Avatar */}
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>🏆</Text>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>1st</Text>
                    <Text style={styles.statLabel}>Your Rank</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>850</Text>
                    <Text style={styles.statLabel}>Your Score</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statNumber}>5</Text>
                    <Text style={styles.statLabel}>Total Users</Text>
                </View>
            </View>

            {/* Leaderboard List */}
            <Text style={styles.subtitle}>Rankings</Text>
            <FlatList
                data={leaderboard}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.friendRow, item.rank === 1 && styles.topRank]}>
                        <View style={[styles.friendAvatar, item.rank === 1 && styles.goldAvatar]}>
                            <Text style={styles.friendAvatarText}>#{item.rank}</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={[styles.friendName, item.name === "You" && styles.currentUser]}>
                                {item.name}
                            </Text>
                            <Text style={styles.friendStreak}>
                                Score: {item.score}
                            </Text>
                        </View>
                        {item.rank <= 3 && (
                            <Ionicons 
                                name={item.rank === 1 ? "trophy" : "medal"} 
                                size={20} 
                                color={item.rank === 1 ? "#FFD700" : item.rank === 2 ? "#C0C0C0" : "#CD7F32"} 
                            />
                        )}
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
    topRank: {
        backgroundColor: "#FFF9E6",
        borderRadius: 8,
        padding: 12,
    },
    goldAvatar: {
        backgroundColor: "#FFD700",
    },
    currentUser: {
        fontWeight: "bold",
        color: "#007AFF",
    },
    userInfo: {
        flex: 1,
    },
});
