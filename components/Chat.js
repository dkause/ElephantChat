// imports
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { useState, useEffect } from 'react'
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native'

// takes name and bgColor from Start
const Chat = ({ route, navigation }) => {
  const { name } = route.params
  const { bgColor } = route.params
  // Stores the Messages
  const [messages, setMessages] = useState([])
  // sets static Message on component mount
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        }
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true
      }
    ])
  }, [])
  const onSend = (newMessages) => {
    // this sets the state´s setter function to append the new message to the previous ones (the chat), while keeping the latest state
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages))
  }

  // sets name and bgColor on component render
  useEffect(() => {
    navigation.setOptions({ title: name, bgColor: bgColor })
  }, [])
  // changes backgoundcolor of chat bubbles 
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          },
          left: { backgroundColor: '#fff' }
        }}
      />
    )
  }
  //Display of chat
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1
        }}
      />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Chat
