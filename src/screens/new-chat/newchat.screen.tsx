import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

interface User {
  _id: any;
  name: string;
}
const NewChatScreen = ({navigation}: {navigation: any}) => {
  const [suggestedUser, setSuggestedUser] = useState<User[]>([]);
  const [pressedItem, setPressedItem] = useState<string | null>(null);
  useEffect(() => {
    const getSuggestedUser = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:8004/users/suggested`,
        );
        setSuggestedUser(response.data);
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    getSuggestedUser();
    // return () => {};
  }, []);

  return (
    <View className="flex-1">
      <View className="flex-row items-center py-3 px-3 bg-white border-b border-slate-200">
        <Text className="ml-2">To: </Text>
        <TextInput
          className="flex-1 p-2 bg-white rounded-md opacity-60"
          placeholder="Type a name or Group"
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="ml-[14px] text-slate-400 mt-6 mb-2">Suggested</Text>
        <FlatList
          data={suggestedUser}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
          renderItem={({item}) => (
            <TouchableOpacity
              onPressIn={() => setPressedItem(item._id)}
              onPressOut={() => setPressedItem(null)}
              onPress={() =>
                navigation.navigate('Conversation', {itemId: item._id})
              }
              activeOpacity={0.5}
              style={{
                overflow: 'hidden',
                backgroundColor:
                  pressedItem === item._id
                    ? 'rgba(0, 0, 0, 0.1)'
                    : 'transparent',
              }}>
              <View className="flex w-full">
                <View className="flex flex-row items-center px-4">
                  <View className="h-10 w-10 bg-slate-400 rounded-full" />
                  <Text className="p-3 my-2 text-black opacity-90">
                    {item.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{paddingBottom: 12}}
        />
      </ScrollView>
    </View>
  );
};

export default NewChatScreen;
