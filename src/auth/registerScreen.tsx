import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const RegisterScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert(
        'Error',
        'Please fill in all fields',
        [{text: 'Okay'}],
        {
          cancelable: false,
        },
      );
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    try {
      const response = await axios.post('http://10.0.2.2:8004/auth/register', {
        name,
        email,
        password,
      });
      console.log(response.data);
      if (response.status === 201) {
        Alert.alert(
          'Registration Successful',
          'You have successfully registered!',
          [
            {
              text: 'OK',
              onPress: () => {
                setName('');
                setEmail('');
                setPassword('');
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      } else if (response.data.message === 'Email is already registered') {
        Alert.alert(
          'Error',
          'Email is already registered. Please use a different email.',
        );
      } else {
        // Other errors
        console.error('Registration failed:', response.status);
        Alert.alert('Error', 'Registration failed. Please try again later.');
      }
    } catch (error) {
      // Network error or server error
      console.error('Error registering:', error);
      Alert.alert(
        'Error',
        'An unexpected error occurred. Please try again later.',
      );
    }
  };

  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-2xl font-bold mb-8">Register</Text>
      <TextInput
        className="border border-gray-300 rounded w-full h-10 px-3 mb-4"
        placeholder="Name"
        onChangeText={setName}
        value={name}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-300 rounded w-full h-10 px-3 mb-4"
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="border border-gray-300 rounded w-full h-10 px-3 mb-4"
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity
        className="bg-[#2800ff] py-2 px-4 rounded text-center mb-4"
        onPress={handleRegister}>
        <Text className="font-bold text-white">Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNavigateToLogin}>
        <Text className="text-[#2800ff]">
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
