// src/screens/HabitHubScreen.tsx
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Habit = {
    id: string;
    title: string;
    status: "Complete" | "Incomplete";
    xp: number;
    image: string;
    favorite: boolean;
};

type Suggestion = {
    id: string;
    title: string;
    image: string;
};

const habits: Habit[] = [
    {
        id: "1",
        title: "Meditate",
        status: "Complete",
        xp: 10,
        image:
            "https://cdn-icons-png.flaticon.com/512/2904/2904972.png", // replace with your image
        favorite: true,
    },
    {
        id: "2",
        title: "Journal",
        status: "Incomplete",
        xp: 5,
        image:
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // replace
        favorite: false,
    },
    {
        id: "3",
        title: "Ride a Bike",
        status: "Complete",
        xp: 5,
        image:
            "https://cdn-icons-png.flaticon.com/512/3197/3197980.png", // replace
        favorite: false,
    },
];

const suggestions: Suggestion[] = [
    {
        id: "s1",
        title: "30 Minute Walk",
        image:
            "https://cdn-icons-png.flaticon.com/512/1904/1904425.png", // replace
    },
    {
        id: "s2",
        title: "Eat Fruits",
        image:
            "https://cdn-icons-png.flaticon.com/512/415/415682.png", // replace
    },
];

export default function HabitHubScreen() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="settings-sharp" size={26} color="#007AFF" />
                <Text style={styles.headerTitle}>Habit Hub</Text>
                <Ionicons name="add" size={28} color="#007AFF" />
            </View>

            {/* Habit List */}
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.habitCard}>
                        <Image source={{ uri: item.image }} style={styles.habitImage} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.habitTitle}>{item.title}</Text>
                            <Text style={styles.habitStatus}>
                                Status:{" "}
                                <Text style={{ fontWeight: "600" }}>{item.status}</Text>
                            </Text>
                            <Text style={styles.habitXP}>+{item.xp} XP</Text>
                        </View>
                        <Ionicons
                            name={item.favorite ? "star" : "star-outline"}
                            size={24}
                            color="#007AFF"
                        />
                    </View>
                )}
            />

            {/* Habit Suggestions */}
            <Text style={styles.sectionTitle}>Habit Suggestions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {suggestions.map((suggestion) => (
                    <TouchableOpacity
                        key={suggestion.id}
                        style={styles.suggestionCard}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={{ uri: suggestion.image }}
                            style={styles.suggestionImage}
                        />
                        <Text style={styles.suggestionText}>{suggestion.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
    habitCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#ccc",
    },
    habitImage: {
        width: 60,
        height: 60,
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
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 20,
        marginBottom: 10,
    },
    suggestionCard: {
        backgroundColor: "#f9f9f9",
        borderRadius: 12,
        padding: 10,
        marginRight: 12,
        alignItems: "center",
        width: 140,
    },
    suggestionImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginBottom: 8,
    },
    suggestionText: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
});
