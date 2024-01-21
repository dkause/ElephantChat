import { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { getAuth, signInAnonymously } from 'firebase/auth'

const image = require('../assets/BackgroundImage.png')

const Start = ({ navigation }) => {
  // anonymous login
  const auth = getAuth()
  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name: name,
          bgColor: bgColor
        })
        Alert.alert('Signed in Successfully')
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Unable to sign in, please try again later')
      })
  }

  // get and set Username from Input
  const [name, setName] = useState('')

  // Set Background colors
  const bgColor1 = '#090C08'
  const bgColor2 = '#474056'
  const bgColor3 = '#8a95a5'
  const bgColor4 = '#B9C6Ae'

  // get and set Background color
  const [bgColor, setBgColor] = useState('')

  return (
    <View style={styles.container}>
      {/* Background image */}
      <ImageBackground source={image} style={styles.image}>
        {/* App title */}
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>Elephant Chat</Text>
        </View>
        {/* Get Username */}
        <View style={styles.uiContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your Username here'
          />
          {/* Container for Button colors */}
          <View style={styles.buttonContainer}>
            <Text style={styles.colorButtonLabel}>
              Choose Background color:
            </Text>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: bgColor1 }]}
                onPress={() => {
                  setBgColor(bgColor1)
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: bgColor2 }]}
                onPress={() => {
                  setBgColor(bgColor2)
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: bgColor3 }]}
                onPress={() => {
                  setBgColor(bgColor3)
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: bgColor4 }]}
                onPress={() => {
                  setBgColor(bgColor4)
                }}
              ></TouchableOpacity>
            </View>
          </View>
          {/* Action Button, navigates to chat with props name and bgColor */}
          <TouchableOpacity style={styles.textInputButton} onPress={signInUser}>
            <Text style={styles.textInputText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
    justifyContent: 'flex-end'
  },
  titleContainer: {
    flex: 1,
    paddingTop: 60
  },
  appName: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '600',
    textAlign: 'center'
  },
  uiContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: '88%',
    marginBottom: 30,
    padding: '6%',
    justifyContent: 'space-evenly'
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1
  },
  buttonContainer: {
    width: '100%'
  },
  colorButtonLabel: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083'
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  textInputButton: {
    backgroundColor: '#757083',
    color: 'white',
    fontSize: 16,
    width: '100%',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10
  },
  textInputText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff'
  }
})

export default Start
