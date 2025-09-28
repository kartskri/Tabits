// src/screens/HabitHubScreen.tsx
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useHabitStore, type Habit } from '@/store/habitStore';

type Suggestion = {
    id: string;
    title: string;
    image: string;
};

const mockHabitsApiCall = (): Promise<Habit[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: "1",
                    title: "Meditate",
                    status: "Complete",
                    xp: 10,
                    image: "https://cdn-icons-png.flaticon.com/512/2904/2904972.png",
                    favorite: true,
                },
                {
                    id: "2",
                    title: "Journal",
                    status: "Incomplete",
                    xp: 5,
                    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                    favorite: false,
                },
                {
                    id: "3",
                    title: "Ride a Bike",
                    status: "Complete",
                    xp: 5,
                    image: "https://cdn-icons-png.flaticon.com/512/3197/3197980.png",
                    favorite: false,
                },
            ]);
        }, 700);
    });
};

const mockSuggestionsApiCall = (): Promise<Suggestion[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: "s1",
                    title: "30 Minute Walk",
                    image: "https://cdn-icons-png.flaticon.com/512/1904/1904425.png",
                },
                {
                    id: "s2",
                    title: "Eat Fruits",
                    image: "https://cdn-icons-png.flaticon.com/512/415/415682.png",
                },
            ]);
        }, 500);
    });
};

export default function HabitHubScreen() {
    const { habits, setHabits, addHabit, updateHabit } = useHabitStore();
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newHabitTitle, setNewHabitTitle] = useState("");
    const [newHabitXP, setNewHabitXP] = useState("");

    useEffect(() => {
        if (habits.length === 0) {
            mockHabitsApiCall().then(setHabits);
        }
        mockSuggestionsApiCall().then(setSuggestions);
    }, []);

    const handleAddHabit = () => {
        if (newHabitTitle && newHabitXP) {
            const newHabit: Habit = {
                id: (habits.length + 1).toString(),
                title: newHabitTitle,
                status: "Incomplete",
                xp: parseInt(newHabitXP),
                image: "https://cdn-icons-png.flaticon.com/512/2904/2904972.png",
                favorite: false,
            };
            addHabit(newHabit);
            setNewHabitTitle("");
            setNewHabitXP("");
            setModalVisible(false);
        }
    };

    const toggleHabitStatus = (habitId: string) => {
        const habit = habits.find(h => h.id === habitId);
        if (habit) {
            updateHabit(habitId, { 
                status: habit.status === "Complete" ? "Incomplete" : "Complete" 
            });
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="settings-sharp" size={26} color="#007AFF" />
                <Text style={styles.headerTitle}>Habit Hub</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={28} color="#007AFF" />
                </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => toggleHabitStatus(item.id)}>
                            <Ionicons
                                name={item.status === "Complete" ? "checkmark-circle" : "checkmark-circle-outline"}
                                size={24}
                                color={item.status === "Complete" ? "#00C851" : "#007AFF"}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Habit Suggestions */}
            <Text style={styles.sectionTitle}>Habit Suggestions</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {suggestions.map((suggestion, index) => (
                    <TouchableOpacity
                        key={suggestion.id}
                        style={[styles.suggestionCard, index === suggestions.length - 1 && { marginRight: 0 }]}
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

            {/* Modal */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add New Habit</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Habit title"
                            value={newHabitTitle}
                            onChangeText={setNewHabitTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="XP points (e.g., 10)"
                            value={newHabitXP}
                            onChangeText={setNewHabitXP}
                            keyboardType="numeric"
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    cancelButton: {
        flex: 1,
        padding: 12,
        marginRight: 10,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
    },
    addButton: {
        flex: 1,
        padding: 12,
        marginLeft: 10,
        borderRadius: 8,
        backgroundColor: "#007AFF",
    },
    cancelText: {
        textAlign: "center",
        fontSize: 16,
    },
    addText: {
        textAlign: "center",
        fontSize: 16,
        color: "white",
        fontWeight: "600",
    },
});
