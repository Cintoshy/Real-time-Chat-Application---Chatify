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

type ConvoScreenRouteProp = RouteProp<
  {Convo: {firstId: string; secondId: string}},
  'Convo'
>;

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
  const {firstId, secondId} = route.params;

  const [Conversation, setConversation] = useState<Conversation[]>([]);
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
    // return () => {};
  }, []);

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
    <View className="flex-1 bg-[#D1D5DB]">
      {Conversation.length == 0 ? (
        <View style={{flex: 1}}>
          <Text>dhadbawhdba</Text>
        </View>
      ) : (
        <FlatList
          data={Conversation}
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
          inverted
        />
      )}
      <View className="p-1.5">
        <TextInput
          className="border border-slate-500 m-1 py-2 px-4 rounded-full"
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
