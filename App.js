import React, { useEffect, useRef, useState } from 'react'
import { registerRootComponent } from 'expo'
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin'
import WebView from 'react-native-webview'

const App = () => {
  const webview = useRef(null)

  const singInMock = () => webview.current?.injectJavaScript?.(`window.setUser('{"photo":"sdvsdvsdv","givenName":"Ravshanbek","familyName":"Axmedov","email":"ahmedovravshanbek21@gmail.com"}')`)
  const singIn = async () => {
    try {
      // await GoogleSignin.hasPlayServices()
      const info = await GoogleSignin.signIn()
      console.log(`window.setUser('${JSON.stringify(info?.user)}')`)
      webview.current?.injectJavaScript?.(`window.setUser('${JSON.stringify(info?.user)}')`)
    } catch (e) {
      console.log(e)
    }
  }
  const logOut = async () => {
    if (GoogleSignin.getCurrentUser()) {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    }
  }
  const onWebMessage = ({ key = '', value = {} }) => {
    const functions = {
      SIGN_IN: singInMock,
      LOG_OUT: logOut
    }
    functions[key]?.()
  }

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '161037988763-fu4em77kpmskm70jqoe8uo3kocpgst8i.apps.googleusercontent.com',
      iosClientId: '161037988763-412jjbg5tnkc8mjnc7kun4u18firdk2n.apps.googleusercontent.com',
      androidClientId: '161037988763-4arrqvj1t7de7tsor5qr49nkf06giekb.apps.googleusercontent.com'
    })
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden/>
      <WebView
        onMessage={e => onWebMessage(JSON.parse(e.nativeEvent.data))}
        ref={webview}
        style={{ flex: 1 }}
        source={{ uri: 'http://192.168.0.213:3000/' }}
      />
    </View>
  )
}

registerRootComponent(App)
