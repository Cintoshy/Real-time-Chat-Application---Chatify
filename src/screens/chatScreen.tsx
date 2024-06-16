import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

// Mock function to create a new channel
const createChannel = async () => {
  return new Promise<{id: string}>(resolve => {
    setTimeout(() => {
      resolve({id: 'newChannel123'});
    }, 1000); // Simulating an API call delay
  });
};

const ChatScreen: React.FC = () => {
  const [channelId, setChannelId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateChannel = async () => {
    setLoading(true);
    try {
      const newChannel = await createChannel();
      setChannelId(newChannel.id);
      console.log(`Channel created with ID: ${newChannel.id}`);
    } catch (error) {
      console.error('Error creating channel:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Create Channel"
        onPress={handleCreateChannel}
        disabled={loading}
      />
      {loading && <Text>Creating channel...</Text>}
      {channelId && <Text>Channel ID: {channelId}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default ChatScreen;
