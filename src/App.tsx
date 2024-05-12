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
import ProfileScreen from './screens/sample';
import {DrawerNavigator} from './navigation/drawer-tab.navigation';

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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            <Stack.Screen name="Conversation" component={Convo} />
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
