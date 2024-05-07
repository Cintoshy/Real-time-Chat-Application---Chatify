import React, {useEffect} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import RegisterScreen from './auth/registerScreen';
import LoginScreen from './auth/loginScreen';
import HomeScreen from './screens/homseScreen';
import SplashScreen from 'react-native-splash-screen';
import {Platform, ActivityIndicator, View, Text} from 'react-native';
import {AuthProvider, useAuth} from './hooks/authContext';
import MIcon from 'react-native-vector-icons/Ionicons';

import ChatScreen from './screens/chatScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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
          <Drawer.Screen
            name="Chats"
            options={{
              drawerLabel: 'Chats',
              title: 'Chats',
              drawerIcon: () => (
                <MIcon name="chatbubbles" size={20} color="gray" />
              ),
            }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  tabBarShowLabel: true,
                  headerShown: false,
                  tabBarHideOnKeyboard: true,
                }}>
                <Tab.Screen
                  name="Chat-tab"
                  component={HomeScreen}
                  options={{
                    tabBarLabel: ({focused}) => (
                      <Text
                        className="text-[10px]"
                        style={{color: focused ? 'red' : 'gray'}}>
                        Profile
                      </Text>
                    ),
                    headerShown: false,
                    tabBarIcon: ({color, size, focused}) => (
                      <MIcon
                        name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                />
                {/* Add more tab screens here if needed */}
              </Tab.Navigator>
            )}
          </Drawer.Screen>

          <Drawer.Screen
            name="Chat22"
            options={{
              drawerLabel: 'Chat22',
              title: 'Chat22',
              drawerIcon: () => (
                <MIcon name="chatbubbles" size={20} color="gray" />
              ),
            }}>
            {() => (
              <Tab.Navigator>
                <Tab.Screen
                  name="Chat-tab"
                  component={ChatScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: 'Chats',
                    tabBarIcon: ({color, size}) => (
                      <MIcon name="chatbubbles" size={size} color={color} />
                    ),
                  }}
                />
                <Tab.Screen
                  name="Chat-tabss"
                  component={HomeScreen}
                  options={{
                    headerShown: false,
                    tabBarLabel: 'Chatsss',
                    tabBarIcon: ({color, size}) => (
                      <MIcon name="chatbubbles" size={size} color={color} />
                    ),
                  }}
                />
              </Tab.Navigator>
            )}
          </Drawer.Screen>
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
