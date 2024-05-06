import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import RegisterScreen from './auth/registerScreen';
import LoginScreen from './auth/loginScreen';
import HomeScreen from './screens/homseScreen'; // Typo here, should be 'homeScreen'
import SplashScreen from 'react-native-splash-screen';
import {Platform, ActivityIndicator, View} from 'react-native';
import {AuthProvider, useAuth} from './hooks/authContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  const {token, isLoading} = useAuth();

  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? (
        <Drawer.Navigator>
          <Drawer.Screen name="Chats" component={HomeScreen} />
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            options={{headerShown: false}}
            component={RegisterScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;
