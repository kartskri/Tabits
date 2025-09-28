import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDeadlineStore, type Deadline } from '@/store/deadlineStore';
import { useScheduleStore, type ScheduleItem } from '@/store/scheduleStore';

export default function ScheduleScreen() {
    const { deadlines, addDeadline, removeDeadline } = useDeadlineStore();
    const { schedule, addScheduleItem, removeScheduleItem } = useScheduleStore();
    const [modalVisible, setModalVisible] = useState(false);
    const [deadlineModalVisible, setDeadlineModalVisible] = useState(false);
    const [newScheduleName, setNewScheduleName] = useState("");
    const [newScheduleTime, setNewScheduleTime] = useState("");
    const [newDeadlineTitle, setNewDeadlineTitle] = useState("");
    const [newDeadlineDate, setNewDeadlineDate] = useState("");

    const handleAddScheduleItem = () => {
        if (newScheduleName && newScheduleTime) {
            const newItem: ScheduleItem = {
                id: newScheduleName.charAt(0).toUpperCase(),
                name: newScheduleName,
                time: newScheduleTime,
            };
            addScheduleItem(newItem);
            setNewScheduleName("");
            setNewScheduleTime("");
            setModalVisible(false);
        }
    };

    const addDeadlineItem = () => {
        if (newDeadlineTitle && newDeadlineDate) {
            const newItem: Deadline = {
                id: (deadlines.length + 1).toString(),
                title: newDeadlineTitle,
                date: newDeadlineDate,
            };
            addDeadline(newItem);
            setNewDeadlineTitle("");
            setNewDeadlineDate("");
            setDeadlineModalVisible(false);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Ionicons name="settings-sharp" size={26} color="#007AFF" />
                <Text style={styles.headerTitle}>Deadlines</Text>
                <TouchableOpacity onPress={() => setDeadlineModalVisible(true)}>
                    <Ionicons name="add" size={28} color="#007AFF" />
                </TouchableOpacity>
            </View>

            {/* Deadlines */}
            {deadlines.map((deadline) => (
                <View key={deadline.id} style={styles.deadlineCard}>
                    <Text style={styles.deadlineText}>{deadline.title}</Text>
                    <Text style={styles.deadlineDate}>{deadline.date}</Text>
                    <TouchableOpacity onPress={() => removeDeadline(deadline.id)}>
                        <Ionicons name="checkmark-circle-outline" size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>
            ))}

            {/* Schedule Header */}
            <View style={styles.scheduleHeader}>
                <Text style={styles.sectionTitle}>My Schedule</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={22} color="#007AFF" />
                </TouchableOpacity>
            </View>
            <Text style={styles.dateText}>DD/MMM</Text>

            {/* Schedule List */}
            <FlatList
                data={schedule.sort((a, b) => {
                    const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
                    const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
                    return timeA - timeB;
                })}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.scheduleRow}>
                        <View style={styles.scheduleAvatar}>
                            <Text style={styles.scheduleAvatarText}>{item.id}</Text>
                        </View>
                        <Text style={styles.scheduleName}>{item.name}</Text>
                        <Text style={styles.scheduleTime}>{item.time}</Text>
                        <TouchableOpacity onPress={() => removeScheduleItem(item.id)}>
                            <Ionicons name="trash" size={20} color="#ff4444" />
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Modal */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Schedule Item</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Activity name"
                            value={newScheduleName}
                            onChangeText={setNewScheduleName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Time (e.g., 9:00 AM)"
                            value={newScheduleTime}
                            onChangeText={setNewScheduleTime}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addButton} onPress={handleAddScheduleItem}>
                                <Text style={styles.addText}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Deadline Modal */}
            <Modal visible={deadlineModalVisible} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add Deadline</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Deadline title"
                            value={newDeadlineTitle}
                            onChangeText={setNewDeadlineTitle}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Date (e.g., 11/15)"
                            value={newDeadlineDate}
                            onChangeText={setNewDeadlineDate}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setDeadlineModalVisible(false)}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addButton} onPress={addDeadlineItem}>
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
    deleteButton: {
        backgroundColor: "#ff4444",
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        marginBottom: 12,
    },

});
