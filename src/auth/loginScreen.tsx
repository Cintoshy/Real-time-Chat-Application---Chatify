import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {SubmitButton} from '../components/chatify-button';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = ({navigation}: {navigation: any}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isEmailNull, setIsEmailNull] = useState(false);
  const [isPasswordNull, setIsPasswordNull] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [isShowPassword, setShowPassword] = useState(false);
  useEffect(() => {
    setIsDisable(email.trim() === '' || password.trim() === '');
  }, [email, password]);
  const handleLogin = async () => {
    // Clear previous errors
    setErrors([]);

    // Validation checks
    const validationErrors: string[] = [];
    if (!email) {
      validationErrors.push('Please enter your email.');
      setErrors(validationErrors);
      setIsEmailNull(true);
      return;
    } else {
      setIsEmailNull(false);
    }
    if (!password) {
      validationErrors.push('Please enter your password.');
      setErrors(validationErrors);
      setIsPasswordNull(true);
      return;
    } else {
      setIsPasswordNull(false);
    }
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:8004/auth/login', {
        email,
        password,
      });
      if (response.data.message === 'Invalid email or password') {
        return Alert.alert(
          'Error',
          'Invalid email or password',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      }

      console.log('Login successful:', response.data);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setIsEmailNull(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!isShowPassword);
  };
  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View className="flex-1 justify-center items-center">
      <View className="absolute top-0 w-full h-36 rounded-br-full">
        <Image
          className="w-full h-48"
          source={require('../assets/images/wave.png')}
        />
      </View>
      <View className="w-full px-5">
        <View className="bg-white rounded-tl-lg rounded-br-lg rounded-tr-[40] rounded-bl-[40] pt-6 pb-7 border border-slate-200">
          <View className="w-full px-6 ">
            <View className="flex items-center">
              <Image
                className="w-20 h-20"
                source={require('../assets/images/logo.png')}

                // source={{ uri: 'https://example.com/your-image.jpg' }} // Network image example
              />
              <Text className="font-[Poppins-Bold] text-2xl text-[#60A3D9] text-center mb-5 tracking-[2] uppercase">
                Chatify
              </Text>
            </View>
            <View className="space-y-5">
              <TextInput
                className={` ${
                  isEmailNull ? 'border-red-500' : ''
                } border border-slate-400 rounded-lg px-4`}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                autoCapitalize="none"
              />
              {isEmailNull ? (
                <View className="flex justify-start">
                  <Text className="text-red-500 -mt-4">
                    Please enter your email.
                  </Text>
                </View>
              ) : null}
              <TouchableOpacity className="relative">
                <TextInput
                  className={`border border-slate-400 rounded-lg pl-4 pr-12 ${
                    isPasswordNull ? 'border-red-500' : ''
                  }`}
                  placeholder="Password"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={!isShowPassword}
                />
                <TouchableOpacity
                  className="absolute right-4 top-1/4 opacity-40"
                  onPress={() => handleShowPassword()}>
                  {isShowPassword ? (
                    <MIcon name="eye-outline" size={23} color="#60A3D9" />
                  ) : (
                    <MIcon name="eye-off-outline" size={23} color="gray" />
                  )}
                </TouchableOpacity>
              </TouchableOpacity>

              {isPasswordNull ? (
                <View className="flex justify-start">
                  <Text className="text-red-500 -mt-4">
                    Please enter your password.
                  </Text>
                </View>
              ) : null}
              {/* {errors.map((error, index) => (
        <Text className=" leading-tight" key={index} style={styles.error}>
          {error}
        </Text>
      ))} */}
              <View>
                <SubmitButton
                  onPress={() => handleLogin()}
                  disabled={isDisable}
                  borderRadius={20}
                  name="Login"
                />
              </View>
            </View>
          </View>
          <View className="flex flex-row px-6 my-3">
            <Text>Don't have an account?</Text>
            <TouchableOpacity onPress={handleNavigateToRegister}>
              <Text className="text-blue-500"> Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="absolute bottom-2 right-2">
        <Text className="text-[10px] italic">
          Developed by: Mark Louis Odavar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
