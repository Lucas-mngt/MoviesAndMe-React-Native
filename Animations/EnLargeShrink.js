import React from 'react'
import { Animated } from 'react-native'

class EnLargeShrink extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      viewSize: new Animated.Value(this._getSize())
    }
  }

  _getSize() {
      console.log("shouldEnlarge in animation:"+this.props.shouldEnlarge)
      if (this.props.shouldEnlarge) {
          return 80
      }
      return 40
  }

  componentDidUpdate() { // this function is executed everytime we update the component, perfect to launch our animation as every refresh
    Animated.spring(
      this.state.viewSize,
      {
        toValue: this._getSize(),
        useNativeDriver: false
      }
    ).start()
  }

  render() {
    return (
      <Animated.View
        style={{ width: this.state.viewSize, height: this.state.viewSize }}>
        {this.props.children}
        {/* is needed to declare the children components (here FilmItem) */}
      </Animated.View>
    )
  }
}

export default EnLargeShrink