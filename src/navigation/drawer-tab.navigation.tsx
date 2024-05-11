import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import MIcon from 'react-native-vector-icons/Ionicons';
import {MainTabNavigator} from './bottom-tab.navigation';
import ChatScreen from '../screens/chatScreen';

import {useAuth} from '../hooks/authContext';
import {Text} from 'react-native';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const {user, logout} = useAuth();
  const {name} = user;

  const logoutUser = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error occurred during logout:', error);
    }
  };
  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
      <DrawerContentScrollView {...props}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 10,
            paddingLeft: 12,
          }}>
          Welcome, {name}!
        </Text>
        <DrawerItemList {...props} />
        <DrawerItem
          label={`Logout (${name})`}
          icon={({color, size}) => (
            <MIcon name="exit" size={size} color={color} />
          )}
          onPress={logoutUser}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Chats"
        options={{
          drawerLabel: 'Chats',
          title: 'Chats',
          drawerIcon: () => <MIcon name="chatbubbles" size={20} color="gray" />,
        }}
        component={MainTabNavigator}
      />
      <Drawer.Screen
        name="Chat22"
        options={{
          drawerLabel: 'Chat22',
          title: 'Chat22',
          drawerIcon: () => <MIcon name="chatbubbles" size={20} color="gray" />,
        }}
        component={ChatScreen}
      />
    </Drawer.Navigator>
  );
};
