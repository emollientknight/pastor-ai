import { GiftedChat, Bubble } from 'react-native-gifted-chat'
import React, { useEffect } from 'react';
import { StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView, View, FlatList, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Button} from 'react-native';
import { Icon } from '@rneui/base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TypingAnimation } from 'react-native-typing-animation';
import { getIntro } from './Intro.js'
// import {BASEPATH} from '@env'
import uuid from 'react-native-uuid';

const Stack = createNativeStackNavigator();
global.sessionId = uuid.v4();

export default function App()  {
  // console.log({BASEPATH})
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Example}
          options={{
            headerTitle: "My Pastor AI",
            headerRight: () => (
              <Button
                // onPress={() => alert('This is a button!')}
                title="⚙"
              
                type='settings'
                // color="#00cc00"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}


export function Example() {
  const [messages, setMessages] = React.useState([]);
  const [step, setStep] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);

  const intro = getIntro()
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: intro,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: '/Users/emollient/pastor-ai2/client2/resources/img/aiPastor.png',
        },
      },
    ])
  }, [])
  
  onSend = async (messages = []) => {
    console.log(messages)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    setIsTyping(true)
    var response = await fetchResponse(messages[0].text)
    response = response.trimStart()
    setIsTyping(false)
    console.log(response)
    const newMessage = {
      _id: uuid.v4(),
      text: response,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: '/Users/emollient/pastor-ai2/client2/resources/img/aiPastor.png',
      },
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
  }
  function renderFooter () {
    if (isTyping) {
        return (
          <View style={styles.footerContainer}>
            <TypingAnimation dotColor="black" dotAmplitude={4} dotRadius={3} dotX={10} dotY={10} /> 
          </View>
        )
    }
  }

  function renderBubble (props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6699ff'
          },
          left: {
            backgroundColor: '#d9d9d9'

          }
        }}
      />
    )
  }


  return (
    <GiftedChat
      renderBubble={renderBubble}
      // isTyping={true}
      messages={messages}
      onSend={ this.onSend 
      }
      renderFooter={renderFooter}
      user={{
        _id: 1,
      }}
    />
  )
}




export const fetchResponse = async (input) => {
  const token = sessionId
  const inputData = {input, token};
  // try {
  const response = await fetch("http://127.0.0.1:5000/ask", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputData)
  })

  if (response.ok) {
    console.log("response worked!");
    const data = await response.json();
    return data.data;
  } else {
    console.log("response didn't work");
    alert("Failed to connect to server")
    throw new Error('Failed to connect to server');
  }
}


const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Damascus',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
  },
  footerContainer: {
    marginBottom: 36,
  }
});


export const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

