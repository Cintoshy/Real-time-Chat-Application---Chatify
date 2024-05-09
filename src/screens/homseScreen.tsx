import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {useAuth} from '../hooks/authContext';
import MIcon from 'react-native-vector-icons/Ionicons';
import MIcon1 from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const {logout} = useAuth();

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };
  const [Refreshing, setRefreshing] = useState(false);

  const handleSearch = () => {
    // You can perform search logic here if needed
    console.log('Searching for:');
  };

  const handlePress = () => {
    // Navigate to a specific screen when the item is clicked
    navigation.navigate('Conversation');
  };

  const [Items, setItems] = useState([
    {key: 1, sender: 'Me', message: "Hey, how's it going?"},
    {key: 2, sender: 'layl', message: "Hey, how's it going?"},
    {key: 3, sender: 'Bryan', message: "Hey, how's it going?"},
    {key: 4, sender: 'Karl', message: "Hey, how's it going?"},
    {key: 5, sender: 'Clarence', message: "Hey, how's it going?"},
    {key: 6, sender: 'Nina', message: "Hey, how's it going?"},
    {key: 7, sender: 'Paulo', message: "Hey, how's it going?"},
    {key: 8, sender: 'Me', message: "Hey, how's it going?"},
    {key: 9, sender: 'layl', message: "Hey, how's it going?"},
    {key: 10, sender: 'Bryan', message: "Hey, how's it going?"},
    {key: 11, sender: 'Karl', message: "Hey, how's it going?"},
    {key: 12, sender: 'Clarence', message: "Hey, how's it going?"},
    {key: 13, sender: 'Nina', message: "Hey, how's it going?"},
    {key: 14, sender: 'Paulo', message: "Hey, how's it going?"},
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setItems([...Items, {key: 69, sender: 'test', message: 'test message'}]);
      setRefreshing(false);
    }, 2000);
  };

  return (
    <View className="h-full">
      {/* <Text>Hello HomeScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logoutUser}>
        <Text className="text-blue-500"> Logout</Text>
      </TouchableOpacity> */}
      <View className="flex-row items-center py-3 px-4">
        <TextInput
          className="flex-1 p-2 bg-white rounded-md"
          placeholder="Search..."
        />
      </View>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={Refreshing}
            onRefresh={onRefresh}
            colors={['#60A3D9']}
          />
        }
        showsVerticalScrollIndicator={false}>
        <View className="space-y-3 px-5 py-2">
          {Items.map(item => (
            <TouchableOpacity onPress={handlePress}>
              <View
                className="w-full bg-gray-200 p-4 rounded-xl"
                key={item.key}>
                <Text style={styles.sender}>{item.sender}:</Text>
                <Text style={styles.message}>{item.message}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {/* <>
        <View className="flex flex-row h-16 w-full justify-evenly items-center bg-[#60A3D9] rounded-t-3xl">
          <MIcon name="chatbubbles" size={25} color="black" />
          <MIcon name="people" size={25} color="black" />
          <MIcon1 name="flash" size={25} color="black" />
        </View>
      </> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  chatContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
    marginRight: 5,
  },
  receiver: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginRight: 5,
  },
  message: {
    fontSize: 16,
  },
});

export default HomeScreen;
