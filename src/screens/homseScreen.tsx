import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {useAuth} from '../hooks/authContext';

const HomeScreen = ({navigation}: {navigation: any}) => {
  const {logout} = useAuth();

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };

  const handleSearch = () => {
    // You can perform search logic here if needed
    console.log('Searching for:');
  };

  return (
    <View style={{flex: 1}}>
      <Text>Hello HomeScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logoutUser}>
        <Text className="text-blue-500"> Logout</Text>
      </TouchableOpacity>
      <View className="flex-row items-center py-3 px-4 bg-gray-200">
        <TextInput
          className="flex-1 p-2 bg-white rounded-md"
          placeholder="Search..."
        />
      </View>
      <ScrollView
        className="grow bg-slate-300"
        showsVerticalScrollIndicator={false}>
        <View className="space-y-3 p-5">
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
          <View className="w-full bg-gray-200 p-3 rounded-xl">
            <Text style={styles.sender}>Me:</Text>
            <Text style={styles.message}>Hey, how's it going?</Text>
          </View>
        </View>
      </ScrollView>
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
