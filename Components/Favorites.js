// Components/Favorites.js

import React from 'react'
import { StyleSheet, Text } from 'react-native'
import FilmList from './FilmList'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  render() {
    return (
      <FilmList
        films={this.props.favoritesFilm}
        navigation={this.props.navigation}
        favoriteList={true} // Here in the case of favoriteList display
      />
    )
  }
}

const styles = StyleSheet.create({})

const mapStateToProps = (state) => { // Map the favoriteFilm state to the component Favorites props
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Favorites)