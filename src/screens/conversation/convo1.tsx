import {RouteProp, useRoute} from '@react-navigation/native';
import axios, {AxiosError} from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Animated, FlatList} from 'react-native';

import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks/authContext';

type ConvoScreenRouteProp = RouteProp<{
  Convo: {firstId: string; secondId: string};
}>;

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

const SWIPE_THRESHOLD = 120;

const Convo = () => {
  const {user} = useAuth();
  const {userId} = user;
  const route = useRoute<ConvoScreenRouteProp>();
  const {firstId, secondId} = route.params;

  const [conversation, setConversation] = useState<Conversation[]>([]);
  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8004/conversation/${firstId}/${secondId}`,
        );
        setConversation(response.data);
      } catch (error: unknown) {
        if (
          error instanceof AxiosError &&
          error.response &&
          error.response.status === 404
        ) {
          console.log('Fresh Channel');
        } else {
          console.error('Error fetching channels:', error);
        }
      }
    };

    getConversation();
  }, []);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    // Your sendMessage logic
  };

  const handleRelease = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>,
    translateX: Animated.Value,
    message: CoversationContent,
  ) => {
    if (Math.abs(event.nativeEvent.translationX) > SWIPE_THRESHOLD) {
      // Perform reply action
      console.log('Replying to message:', message);
    }

    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      stiffness: 270,
      damping: 30,
    }).start();
  };

  return (
    <View style={{flex: 1}}>
      {conversation.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No conversation available</Text>
        </View>
      ) : (
        <FlatList
          data={conversation}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <View>
              {item.conversation &&
                item.conversation.map(message => {
                  const translateX = new Animated.Value(0);

                  const handleGesture = Animated.event(
                    [{nativeEvent: {translationX: translateX}}],
                    {useNativeDriver: true},
                  );

                  const limitedTranslateX = translateX.interpolate({
                    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
                    outputRange:
                      message.sender === userId
                        ? [-SWIPE_THRESHOLD, 0, 0]
                        : [0, 0, SWIPE_THRESHOLD],
                    extrapolate: 'clamp',
                  });

                  return (
                    <PanGestureHandler
                      key={message._id}
                      onGestureEvent={handleGesture}
                      onHandlerStateChange={event => {
                        if (event.nativeEvent.state === State.END) {
                          handleRelease(event, translateX, message);
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
          )}
          inverted
        />
      )}
      <View style={{padding: 10}}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 20,
            padding: 10,
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
