import {RouteProp, useRoute} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Animated, FlatList} from 'react-native';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks/authContext';

type ConvoScreenRouteProp = RouteProp<{Convo: {itemId: string}}, 'Convo'>;

interface Conversation {
  _id: string;
  channel: string;
  conversation: CoversationContent[] | null;
}
interface CoversationContent {
  _id: string;
  sender: string;
  content: string;
  replyTo: string | null;
  isSeen: boolean;
  timestamp: string;
}
const Convo = () => {
  const {user} = useAuth();
  const {userId} = user;
  const route = useRoute<ConvoScreenRouteProp>();
  const {itemId} = route.params;

  const [Conversation, setConversation] = useState<Conversation[]>([]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8004/conversation/${itemId}`,
        );
        setConversation(response.data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    getConversation();
    // return () => {};
  }, []);
  const [items, setItems] = useState([
    {
      key: 1,
      sender: 'Me',
      receiver: 'John',
      message:
        "Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?",
    },
    {
      key: 2,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 3,
      sender: 'Bryan',
      receiver: 'Me',
      message:
        "Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?",
    },
    {
      key: 4,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 5,
      sender: 'Layl',
      receiver: 'Me',
      message:
        "Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?",
    },
    {
      key: 6,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 7,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 8,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 9,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 10,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 11,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 12,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 13,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 14,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 15,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    // Your sendMessage logic
  };

  const handleRelease = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>,
    translateX: Animated.Value,
    sender: string, // assuming sender is passed as a parameter
  ) => {
    const maxTranslate = 100; // Set your desired maximum translation value

    // Check if the sender is 'Me'
    if (sender === 'Me') {
      if (event.nativeEvent.translationX < -maxTranslate) {
        // Reply action
        // console.log('Reply action activated for Me sender');
      }
    } else {
      if (event.nativeEvent.translationX > maxTranslate) {
        // Reply action
        // console.log('Reply action activated for non-Me sender');
      }
    }

    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      stiffness: 270,
      damping: 30,
    }).start();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#D1D5DB', paddingTop: 5}}>
      <FlatList
        data={Conversation}
        inverted
        keyExtractor={item => item._id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              {item.conversation &&
                item.conversation.map(message => {
                  const translateX = new Animated.Value(0);

                  const handleGesture = Animated.event(
                    [{nativeEvent: {translationX: translateX}}],
                    {useNativeDriver: true},
                  );

                  const limitedTranslateX = translateX.interpolate({
                    inputRange: [-150, 0, 150],
                    outputRange:
                      message.sender === userId ? [-150, 0, 0] : [0, 0, 150],
                    extrapolate: 'clamp',
                  });

                  return (
                    <PanGestureHandler
                      key={message._id}
                      onGestureEvent={handleGesture}
                      onHandlerStateChange={event => {
                        if (event.nativeEvent.state === State.END) {
                          handleRelease(event, translateX, message.sender);
                        }
                      }}>
                      <Animated.View
                        style={{
                          padding: 10,
                          marginVertical: 4,
                          marginHorizontal: 4,
                          borderRadius: 20,
                          maxWidth: '70%',
                          alignSelf:
                            message.sender === userId
                              ? 'flex-end'
                              : 'flex-start',
                          backgroundColor:
                            message.sender === userId ? '#3B82F6' : '#6B7280',
                          transform: [{translateX: limitedTranslateX}],
                        }}>
                        <Text>{message.content}</Text>
                      </Animated.View>
                    </PanGestureHandler>
                  );
                })}
            </View>
          );
        }}
      />
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#9CA3AF',
            margin: 4,
            padding: 8,
            borderRadius: 20,
          }}
          onChangeText={text => setNewMessage(text)}
          value={newMessage}
          placeholder="Type your message here..."
          onSubmitEditing={sendMessage}
        />
      </View>
    </View>
  );
};

export default Convo;
