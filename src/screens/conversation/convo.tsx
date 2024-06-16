import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AxiosError} from 'axios';
import axiosInstance from '../../services/api/axiosInstance.ts';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIconics from 'react-native-vector-icons/Ionicons';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';
import {useAuth} from '../../hooks/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

type ConvoScreenRouteProp = RouteProp<{
  Convo: {firstId: string; secondId: string; conversantName: string};
}>;

type Conversation = {
  _id: string;
  channel: string;
  message: any;
  conversation: CoversationContent[] | null;
};
type CoversationContent = {
  _id: string;
  sender: string;
  content: string;
  replyTo: string | null;
  isSeen: boolean;
  timestamp: string;
};
const Convo = ({navigation}: {navigation: any}) => {
  const {user} = useAuth();
  const {userId} = user;
  const route = useRoute<ConvoScreenRouteProp>();
  const {firstId, secondId, conversantName} = route.params;
  const [loading, setLoading] = useState(false);

  const [Conversation, setConversation] = useState<Conversation[]>([]);
  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/conversation/${firstId}/${secondId}`,
        );
        setConversation(response.data);
        // console.log(response.data);
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
      } finally {
        setLoading(false);
      }
    };

    getConversation();
  }, []);

  const [newMessage, setNewMessage] = useState('');

  // create channel first
  // await the channel created
  // then send the message by using the new channel id

  const sendMessage = async () => {
    // if (Conversation[0].message === 'Fresh Channel') {
    try {
      const response = await axiosInstance.post('/conversation/sendMessage', {
        conversationId: '665dca0ba984188e8cd8de16',
        firstId: userId,
        secondId: '663f5e01e5d31b00a487009c',
        content: newMessage,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setNewMessage('');
    }
    // } else {
    //   // channel id of existing channel
    // }
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
      <View className="flex-row w-full h-16 bg-white items-center">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View className="mx-4">
            <AntIcon name="arrowleft" size={25} />
          </View>
        </TouchableOpacity>
        {conversantName != null ? (
          <Text className="text-lg font-medium text-slate-600">
            {conversantName}{' '}
          </Text>
        ) : (
          <Text className="text-lg">New Conversation </Text>
        )}
      </View>
      {(Conversation.length === 0 ||
        Conversation[0].message === 'Fresh Channel') &&
      !loading ? (
        <View style={{flex: 1}} className="items-center justify-center">
          <MIcon name="android-messages" size={50} color="white" />

          <Text className="text-gray-600 font-bold text-md opacity-50">
            No Conversation
          </Text>
        </View>
      ) : (
        <FlatList
          data={Conversation}
          keyExtractor={item =>
            item._id != null ? item._id : Math.random().toString()
          }
          renderItem={({item}) => {
            return (
              <View>
                {item.conversation &&
                  item.conversation.map((message: any) => {
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
      <View className="flex-row p-1.5 items-center">
        <View
          className={`transform delay-1000 ease-in-out grow transition-all`}>
          <TextInput
            className=" text-gray-600 font-semibold bg-slate-100 border-[0.5px] border-slate-200 m-1 py-2 px-4 rounded-full"
            onChangeText={text => setNewMessage(text)}
            value={newMessage}
            placeholder="Type your message here..."
            placeholderTextColor="gray"
            // onSubmitEditing={sendMessage}
          />
        </View>
        {newMessage.trim().length > 0 ? (
          <View className="ml-1 mr-0.5">
            <TouchableOpacity onPress={() => sendMessage()}>
              <MIconics name="send" size={30} color="#60A3D9" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="-mt-0.5 ml-1 mr-0.5">
            <TouchableOpacity>
              <AntIcon name="like1" size={30} color="#60A3D9" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Convo;
