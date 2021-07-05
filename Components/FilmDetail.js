import React from 'react'
import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  componentDidMount() {
    console.log("Component FilmDetail mount")
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        })
      })
  }

  componentDidUpdate() {
    //console.log("ComponentDidUpdate :")
    //console.log(this.props.favoritesFilm)
  }

  _displayLoading() {
    if (this.state.isLoading) {
      // if isLoading is true, display the loader on screen
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film}
    this.props.dispatch(action) // connect() give us the opportunity to give action directly to the store like this
  }

  _displayFavoriteImage() {
    var sourceImage = require('../assets/ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../assets/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}></Image>
    )
  }

  _displayFilm() {
    const film = this.state.film
    if (this.state.film != undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image 
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}>
          </Image>
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}>
              {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average}</Text>
          <Text style={styles.default_text}>Nombre de vote : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genres(s) : {this._stringifyTab(film.genres)}</Text>
          <Text style={styles.default_text}>Companies : {this._stringifyTab(film.production_companies)}</Text>
        </ScrollView>
      )
    }
  }

  _stringifyTab(tab) { // Used for genres and companies names
    console.log(tab)
    const result = tab.map(function(element){
        return element.name;
      }).join(" / ")
    return result
  }

  render() {
    console.log("Component FilmDetail render")
    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scrollview_container: {
    flex: 1
  },
  image: {
    height: 250,
    margin: 5
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 35,
    flex: 1,
    flexWrap: 'wrap',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'center'
  },
  favorite_container: {
    alignItems: 'center'
  },
  description_text: {
    fontStyle: 'italic',
    color: '#777777',
    margin: 5,
    marginBottom: 15
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  }

})

const mapStateToProps = (state) => { // Map the favorite films state to the component FilmDetail props
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)