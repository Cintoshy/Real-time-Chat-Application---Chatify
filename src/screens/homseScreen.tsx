import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../hooks/authContext';
const HomeScreen = () => {
  const {logout} = useAuth();
  const logoutUser = async () => {
    try {
      return logout();
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };
  return (
    <View>
      <Text>Hello HomeScreen</Text>
      <TouchableOpacity onPress={logoutUser}>
        <Text className="text-blue-500"> Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
