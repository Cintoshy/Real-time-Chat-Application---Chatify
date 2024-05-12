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
import axios from 'axios';
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
  lastMessage: Message | null;
}
const HomeScreen = ({navigation}: {navigation: any}) => {
  const {user} = useAuth();
  const {userId} = user;
  const [Refreshing, setRefreshing] = useState(false);
  const [Channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const getChannels = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8004/channels/${userId}`,
        );
        setChannels(response.data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    getChannels();
    // return () => {};
  }, []);
  const handleSearch = () => {
    // You can perform search logic here if needed
    console.log('Searching for:');
  };

  const handlePress = () => {
    // Navigate to a specific screen when the item is clicked
    navigation.navigate('Conversation');
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
        />
      </View>
      <FlatList
        data={Channels}
        renderItem={({item}) => {
          // const formattedTime = item.lastMessage
          //   ? formatTime(item.lastMessage.conversation.timestamp)
          //   : '';
          const conversant = item.members;
          if (!conversant) return null;
          const otherMember = conversant.find(member => member._id !== userId);
          const conversantName = otherMember ? otherMember.name : '';

          const lastMessage = item.lastMessage;
          if (!lastMessage) return null;
          const conversation = lastMessage.conversation;
          if (!conversation || conversation.length === 0) return null;
          const lastConversation = conversation[conversation.length - 1];
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Conversation', {itemId: item._id})
                }>
                <View className="bg-slate-50 p-4 rounded-xl mb-3 border border-slate-100">
                  <View className="flex flex-row gap-4 justify-self-center">
                    <View className="h-12 w-12 rounded-full bg-gray-500" />
                    <View>
                      <Text className="text-base translate-y-[1.25px]">
                        {conversantName}
                      </Text>

                      <Text className="text-sm -translate-y-[1.25px] opacity-60">
                        You: {lastConversation.content}
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
      <TouchableOpacity onPress={() => navigation.navigate('New Chat')}>
        <View className="absolute bottom-10 right-10 h-12 w-12 justify-evenly items-center bg-[#60A3D9] rounded-full">
          <MIcon name="pencil" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
