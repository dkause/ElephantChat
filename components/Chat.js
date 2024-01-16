// imports
import { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'

// takes name and bgColor from Start
const Chat = ({ route, navigation }) => {
  const { name } = route.params
  const { bgColor } = route.params
  
// sets name and bgColor on component render
  useEffect(() => {
    navigation.setOptions({ title: name, bgColor: bgColor })
  }, [])

  //display of bcolor
  return (
    <View style={styles.container}>
      <Text>Hello! this is Screen2</Text>
      <Text>Hello! this is {bgColor}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Chat
