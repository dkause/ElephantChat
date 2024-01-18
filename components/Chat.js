// imports
import { Bubble, GiftedChat } from 'react-native-gifted-chat'
import { useState, useEffect } from 'react'
import { StyleSheet, KeyboardAvoidingView, Platform, View, Text } from 'react-native'
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'

// takes name and bgColor from Start
const Chat = ({ route, navigation, db }) => {
  const { userID } = route.params
  const { name } = route.params
  const { bgColor } = route.params
  // Stores the Messages
  const [messages, setMessages] = useState([])
  // sets static Message on component mount
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = []
      documentsSnapshot.forEach((doc) => {
        newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) })
      })
      setMessages(newMessages)
      // Clean up code: if unsubMessages exits
      return () => {
        if (unsubMessages) unsubMessages()
      }
    })
  }, [])
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0])
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
          _id: userID,
          name: name
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
