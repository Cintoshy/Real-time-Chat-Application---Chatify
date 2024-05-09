import React, {useState} from 'react';
import {View, Text, TextInput, Animated} from 'react-native';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  ScrollView,
  State,
} from 'react-native-gesture-handler';

const Convo = () => {
  const [items, setItems] = useState([
    {
      key: 1,
      sender: 'Me',
      receiver: 'John',
      message:
        "Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?",
    },
    {
      key: 2,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 3,
      sender: 'Bryan',
      receiver: 'Me',
      message:
        "Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?",
    },
    {
      key: 4,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 5,
      sender: 'Layl',
      receiver: 'Me',
      message:
        "Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?Hey, how's it going?",
    },
    {
      key: 6,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 7,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 8,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 9,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 10,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 11,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 12,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 13,
      sender: 'Me',
      receiver: 'John',
      message: "Hey, how's it going?",
    },
    {
      key: 14,
      sender: 'Layl',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
    {
      key: 15,
      sender: 'Bryan',
      receiver: 'Me',
      message: "Hey, how's it going?",
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    // Your sendMessage logic
  };

  const handleRelease = (
    event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>,
    translateX: Animated.Value,
    sender: string, // assuming sender is passed as a parameter
  ) => {
    const maxTranslate = 100; // Set your desired maximum translation value

    // Check if the sender is 'Me'
    if (sender === 'Me') {
      if (event.nativeEvent.translationX < -maxTranslate) {
        // Reply action
        console.log('Reply action activated for Me sender');
      }
    } else {
      if (event.nativeEvent.translationX > maxTranslate) {
        // Reply action
        console.log('Reply action activated for non-Me sender');
      }
    }

    // Reset translation after release
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{flex: 1, backgroundColor: '#D1D5DB', paddingTop: 5}}>
      <ScrollView>
        {items.map(item => {
          const translateX = new Animated.Value(0);

          const handleGesture = Animated.event(
            [{nativeEvent: {translationX: translateX}}],
            {useNativeDriver: true},
          );

          const limitedTranslateX = translateX.interpolate({
            inputRange: [-150, 0, 150], // Range of translation
            outputRange: item.sender === 'Me' ? [-150, 0, 0] : [0, 0, 150], // Output range with clamped values
            extrapolate: 'clamp', // Clamp values outside inputRange
          });

          return (
            <PanGestureHandler
              key={item.key}
              onGestureEvent={handleGesture}
              onHandlerStateChange={event => {
                if (event.nativeEvent.state === State.END) {
                  handleRelease(event, translateX, item.sender);
                }
              }}>
              <Animated.View
                style={{
                  padding: 10,
                  marginVertical: 4,
                  marginHorizontal: 4,
                  borderRadius: 20,
                  alignSelf: item.sender === 'Me' ? 'flex-end' : 'flex-start',
                  backgroundColor: item.sender === 'Me' ? '#3B82F6' : '#6B7280',
                  transform: [{translateX: limitedTranslateX}], // Use limitedTranslateX
                }}>
                <Text>{item.message}</Text>
              </Animated.View>
            </PanGestureHandler>
          );
        })}
      </ScrollView>
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#9CA3AF',
            margin: 4,
            padding: 8,
            borderRadius: 20,
          }}
          onChangeText={text => setNewMessage(text)}
          value={newMessage}
          placeholder="Type your message here..."
          onSubmitEditing={sendMessage}
        />
      </View>
    </View>
  );
};

export default Convo;
