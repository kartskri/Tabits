import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ContactScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Contact</ThemedText>
      <ThemedText>This is the contact page</ThemedText>
    </ThemedView>
  );
}