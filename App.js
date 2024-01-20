// import the screens
import Start from './components/Start'
import Chat from './components/Chat'

// import navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import firebase
import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence
} from 'firebase/auth'

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore'
import { useNetInfo } from '@react-native-community/netinfo'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// initialize Firebase Auth for that app immediately
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})

// initialize Cloud Firestore and get a reference
const db = getFirestore(app)

// import LogBox from react-native
import { Alert } from 'react-native'
import { useEffect } from 'react'

// this is the app container
const Stack = createNativeStackNavigator()
const App = () => {
  // check the connection status, alert if lost, disable firebase and pass it as prop
  const connectionStatus = useNetInfo()
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost')
      disableNetwork(db)
    } else if (connectionStatus === true) {
      enableNetwork(db)
    }
  })

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
