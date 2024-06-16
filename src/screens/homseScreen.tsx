import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  FlatList,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon1 from 'react-native-vector-icons/Ionicons';
import axiosInstance from '../services/api/axiosInstance.ts';
import moment from 'moment';
import {useAuth} from '../hooks/authContext';

interface Sender {
  _id: string;
  name: string;
  email: string;
}

interface Message {
  _id: string;
  channel: string;
  conversation: Conversation[];
}
interface Conversation {
  _id: string;
  sender: Sender;
  readByRecipients: any[];
  createdAt: string;
  updatedAt: string;
  isSeen: boolean;
  content: string;
  timestamp: string;
}
interface Member {
  _id: string;
  name: string;
  email: string;
}
interface Channel {
  _id: string;
  name: string;
  members: Member[];
  lastMessage: Message;
}
const HomeScreen = ({navigation}: {navigation: any}) => {
  const {user} = useAuth();
  const {userId} = user;
  const [Refreshing, setRefreshing] = useState(false);
  const [Channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const response = await axiosInstance.get(`/channels/${userId}`);
        setChannels(response.data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    getChannels();
    // return () => {};
  }, []);
  const handleSearch = () => {
    console.log('Searching for:');
  };

  const handlePress = () => {
    navigation.navigate('Conversation');
  };

  const handlePressNewChat = () => {
    navigation.navigate('New Chat');
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      // setItems([...Items, {key: 69, sender: 'test', message: 'test message'}]);
      setRefreshing(false);
    }, 2000);
  };

  const formatTime = (createdAt: moment.MomentInput) => {
    const momentTime = moment(createdAt);
    const now = moment();
    const diffInDays = now.diff(momentTime, 'days');

    if (diffInDays === 0) {
      return momentTime.fromNow();
    } else {
      return moment().subtract(6, 'days').calendar();
    }
  };

  return (
    <View className="h-full">
      <View className="flex-row items-center py-3 px-3 mb-1">
        <TextInput
          className="flex-1 p-2 bg-white rounded-md"
          placeholder="Search..."
          placeholderTextColor="gray"
        />
      </View>
      <FlatList
        data={Channels}
        renderItem={({item}) => {
          // const formattedTime = item.lastMessage
          // ? formatTime(item.lastMessage.conversation.timestamp)
          //   : '';

          //Get conversantName and conversantId
          const conversant = item.members;
          if (!conversant) return null;
          const otherMember = conversant.find(member => member._id !== userId);
          const conversantName = otherMember && otherMember.name;
          const conversantId = otherMember && otherMember._id;

          //Get last message
          const lastMessage = item.lastMessage;
          if (!lastMessage) return null;
          const conversation = lastMessage.conversation;
          if (!conversation || conversation.length === 0) return null;
          const lastConversation = conversation[conversation.length - 1];
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Conversation', {
                    firstId: userId,
                    secondId: conversantId,
                    conversantName: conversantName,
                  })
                }>
                <View className="bg-white p-4 rounded-xl mb-3 border border-slate-100">
                  <View className="flex flex-row gap-4 justify-self-center">
                    <View className="h-12 w-12 rounded-full bg-gray-500" />
                    <View>
                      <Text className="font-semibold text-gray-600 text-base translate-y-[1.25px]">
                        {conversantName}
                      </Text>

                      <Text className="text-gray-600 text-sm -translate-y-[1.25px] opacity-60">
                        You:{' '}
                        {lastConversation.content
                          ? lastConversation.content
                          : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }}
        keyExtractor={item => item._id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={onRefresh}
            colors={['#60A3D9']}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 12}}
      />
      <View className="absolute bottom-10 right-10">
        <TouchableOpacity onPress={handlePressNewChat}>
          <View className="h-12 w-12 justify-evenly items-center bg-[#60A3D9] rounded-full">
            <MIcon name="pencil" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default HomeScreen;
