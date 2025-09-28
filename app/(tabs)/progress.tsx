import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ProgressScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Progress</ThemedText>
      <ThemedText>Your progress tracking page</ThemedText>
    </ThemedView>
  );
}