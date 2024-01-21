// imports
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import CustomActions from './CustomActions'
import { useState, useEffect } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  View,
  Text
} from 'react-native'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView from 'react-native-maps'
// takes name and bgColor from Start
const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { userID } = route.params
  const { name } = route.params
  const { bgColor } = route.params

  // Stores the Messages
  const [messages, setMessages] = useState([])

  // declare unsubmessages
  let unsubMessages

  // sets static Message on component mount
  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages()
      unsubMessages = null

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = []
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis())
          })
        })
        cacheMessages(newMessages)
        setMessages(newMessages)
      })
    } else loadCachedMessages()

    // Clean up code: if unsubMessages exits
    return () => {
      if (unsubMessages) unsubMessages()
    }
  }, [isConnected])

  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0])
  }

  // Message caching
  // read mesages
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('message_cache')) || []
    setMessages(JSON.parse(cachedMessages))
  }

  // write messages into cache
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem(
        'message_cache',
        JSON.stringify(messagesToCache)
      )
    } catch (error) {
      console.log(error.message)
    }
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

  // Hide input when offline
  const renderIputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />
    else return null
  }
  // Display CustomActions with props
  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />
  }
  // Display Map with props
  const renderCustomView = (props) => {
    const { currentMessage } = props
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
      )
    }
    return null
  }

  // Display of chat
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderIputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name: name
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior='height' />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default Chat
