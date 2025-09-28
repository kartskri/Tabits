import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ScheduleScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Schedule</ThemedText>
      <ThemedText>Your schedule page</ThemedText>
    </ThemedView>
  );
}