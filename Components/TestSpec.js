// Components/Test.js

import React from 'react'
import { StyleSheet, View, Platform, Animated, Easing } from 'react-native'
import HelloWorld from './HelloWorld_IOS_Android/HelloWorld' // it will import the correct file depend of you Platform (ios or android)

class TestSpec extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      topPosition: new Animated.Value(0),
      leftPosition: new Animated.Value(0)
    }
  }
  
  componentDidMount() {
    Animated.parallel([
      Animated.spring(
        this.state.topPosition,
        {
          toValue: 100,
          tension: 8,
          friction: 3
        }
      ),
      Animated.timing(
        this.state.leftPosition,
        {
          toValue: 100,
          duration: 1000,
          easing: Easing.elastic(2)
        }
      )
    ]).start()

    // Animated.decay(
    //   this.state.topPosition,
    //   {
    //     velocity: 0.8,
    //     deceleration: 0.997,
    //   }
    // ).start();

    // Animated.spring(
    //   this.state.topPosition,
    //   {
    //     toValue: 100,
    //     speed: 2,
    //     bounciness: 30
    //   }
    // ).start();

    // Animated.timing(
    //   this.state.topPosition,
    //   {
    //     toValue: 100,
    //     duration: 3000, // The duration of the animation (here 3 secondes)
    //     easing: Easing.linear,
    //   }
    // ).start() // Launch the animation with start() function
  }

  render() {
    return (
      <View style={styles.main_container}>
        <Animated.View style={[styles.animation_view, {top: this.state.topPosition, left: this.state.leftPosition}]}>
        </Animated.View>
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
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
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