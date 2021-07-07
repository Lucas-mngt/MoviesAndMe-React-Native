// Components/Avatar.js

import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { connect } from 'react-redux'

class Avatar extends React.Component {

  constructor(props) {
    super(props)
    this._avatarClicked = this._avatarClicked.bind(this) // It's gonna be used in showImagePicker has callback so we need to bind it
  }

  _avatarClicked() {
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('L\'utilisateur a annulé')
      }
      else if (response.error) {
        console.log('Erreur : ', response.error)
      }
      else {
        let requireSource = { uri: response.assets.map(({uri}) => {
            return uri
        }) }
        console.log('Photo URI : ', requireSource.uri[0] )
        const action = { type: "SET_AVATAR", value: {"uri": requireSource.uri[0]}}
        this.props.dispatch(action)
      }
    })
}

  render() {
    return(
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}>
          <Image style={styles.avatar} source={this.props.avatar} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#9B9B9B',
    borderWidth: 2
  }
})

const mapStateToProps = (state) => { // Map the avatar state to the component Avatar props
    return {
        avatar: state.setAvatar.avatar
    }
}

export default connect(mapStateToProps)(Avatar)