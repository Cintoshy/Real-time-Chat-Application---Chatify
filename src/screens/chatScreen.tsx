import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ChatScreen = () => {
  const [items, setItems] = useState([
    {key: 1, sender: 'Me', receiver: 'John', message: "Hey, how's it going?"},
    {key: 2, sender: 'Layl', receiver: 'Me', message: "Hey, how's it going?"},
    {
      key: 3,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    // Add more items as needed
  ]);
  return (
    <View>
      <Text>Hello Pogi</Text>
    </View>
  );
};

export default ChatScreen;
