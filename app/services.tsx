import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ServicesScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Services</ThemedText>
      <ThemedText>This is the services page</ThemedText>
    </ThemedView>
  );
}