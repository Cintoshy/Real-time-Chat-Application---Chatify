import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './auth/registerScreen';
import LoginScreen from './auth/loginScreen';
import SplashScreen from 'react-native-splash-screen';
import {Platform, ActivityIndicator, View} from 'react-native';
import {AuthProvider, useAuth} from './hooks/authContext';
import Convo from './screens/conversation/convo';
import {DrawerNavigator} from './navigation/drawer-tab.navigation';
import NewChatScreen from './screens/new-chat/newchat.screen';

const Stack = createStackNavigator();

const App = () => {
  const {token, isLoading} = useAuth();

  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatScreen">
        {token ? (
          <>
            <Stack.Screen
              name="HomeDrawer"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Conversation"
              options={{headerShown: false}}
              component={Convo}
            />
            <Stack.Screen name="New Chat" component={NewChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;
