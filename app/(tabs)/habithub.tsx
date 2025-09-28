import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HabitHubScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Habit Hub</ThemedText>
      <ThemedText>Your habit tracking page</ThemedText>
    </ThemedView>
  );
}