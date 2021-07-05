// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import HelloWorld from './HelloWorld_IOS_Android/HelloWorld' // it will import the correct file depend of you Platform (ios or android)

class TestSpec extends React.Component {

  render() {
    return (
      <View style={styles.main_container}>
        <HelloWorld/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subview_container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
        height: 100,
        width: 50
      },
      android: {
        backgroundColor: 'blue',
        height: 50,
        width: 100
      }
    })
  }
})

export default TestSpec