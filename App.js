// import the screens
import Start from './components/Start'
import Chat from './components/Chat'
// import navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import firebase
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// import LogBox from react-native
import { LogBox } from 'react-native'


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAErcd1xZdRMUs5-0HF_lXAjPEG2ZmdTZQ',
  authDomain: 'elephant-chat-96361.firebaseapp.com',
  projectId: 'elephant-chat-96361',
  storageBucket: 'elephant-chat-96361.appspot.com',
  messagingSenderId: '962794736925',
  appId: '1:962794736925:web:76a2078d0d29a405e5e5f4',
  measurementId: 'G-94H6KQ0S82'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// initialize Cloud Firestore and get a reference
const db = getFirestore(app)
// Ignore specific log messages
LogBox.ignoreLogs([
  "@firebase/auth: Auth (10.3.1): You are initializing Firebase Auth for React Native without providing AsyncStorage. Auth state will default to memory persistence and will not persist between sessions. In order to persist auth state, install the package '@react-native-async-storage/async-storage' and provide it to initializeAuth:"
]);
// this is the app container
const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat'>{(props) => <Chat db={db} {...props} />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App
