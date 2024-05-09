import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import HomeScreen from '../screens/homseScreen';
import MIcon from 'react-native-vector-icons/Ionicons';
import ChatScreen from '../screens/chatScreen';

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: true,
      headerShown: false,
      tabBarHideOnKeyboard: true,
    }}
    initialRouteName="HomeScreen">
    <Tab.Screen
      name="Chat-tab"
      component={HomeScreen}
      options={{
        tabBarLabel: ({focused}) => (
          <Text
            className="text-[10px]"
            style={{color: focused ? 'blue' : 'gray'}}>
            Chats
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
    <Tab.Screen
      name="Chat-tab2"
      component={ChatScreen}
      options={{
        tabBarLabel: ({focused}) => (
          <Text
            className="text-[10px]"
            style={{color: focused ? 'blue' : 'gray'}}>
            Profile
          </Text>
        ),
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => (
          <MIcon
            name={focused ? 'albums' : 'albums-outline'}
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
