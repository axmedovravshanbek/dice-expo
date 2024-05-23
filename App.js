import React from 'react'
import { registerRootComponent } from 'expo'
import { StyleSheet, Text, View } from 'react-native'

const App = () => {
  return (
    <View style={styles.container}>
        <Text>Press to start</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00ff00',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

registerRootComponent(App)
