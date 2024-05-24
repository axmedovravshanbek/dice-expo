import React, { useEffect, useState } from 'react'
import { registerRootComponent } from 'expo'
import { StyleSheet, Text, View, Button } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin'

const App = () => {
  const [error, setError] = useState()
  const [userInfo, setUserInfo] = useState()
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '161037988763-fu4em77kpmskm70jqoe8uo3kocpgst8i.apps.googleusercontent.com',
      iosClientId: '161037988763-412jjbg5tnkc8mjnc7kun4u18firdk2n.apps.googleusercontent.com',
      androidClientId: '161037988763-4arrqvj1t7de7tsor5qr49nkf06giekb.apps.googleusercontent.com'
    })
  }
  useEffect(() => {
    configureGoogleSignIn()
  }, [])

  const singIn = async () => {
    console.log('press')
    try {
      await GoogleSignin.hasPlayServices()
      const info = await GoogleSignin.signIn()
      setUserInfo(info)
      setError()
    } catch (e) {
      setError(e)
    }
  }
  const logout = async () => {
    setUserInfo(undefined)
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
  }
  return (
    <View style={styles.container}>
      <Text>'JSON.stringify(error)'</Text>
      <Text>{JSON.stringify(error)}</Text>
      <Text>{JSON.stringify(userInfo?.user)}</Text>
      {userInfo
        ? <Button title="Log Out" onPress={logout}/>
        : <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={singIn}
        />}
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
