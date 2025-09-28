import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function FriendsScreen() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">Friends</ThemedText>
      <ThemedText>Your friends page</ThemedText>
    </ThemedView>
  );
}