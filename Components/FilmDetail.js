import React from 'react'
import { StyleSheet, View, Image, Text, ActivityIndicator, ScrollView, TouchableOpacity, Share, Platform } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'
import EnLargeShrink from '../Animations/EnLargeShrink'

class FilmDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    // We access the function shareFilm and the film through the parans added to the navigation
    if (params.film != undefined && Platform.OS === 'ios') {
      return {
        headerRight: // We need to display an image so we need to go through a TouchableOpacity
          <TouchableOpacity
            style={styles.share_touchable_headerrightbutton}
            onPress={() => params.shareFilm()}>
            <Image
              style={styles.share_image}
              source={require('../assets/ic_share.ios.png')} />
          </TouchableOpacity>
      }
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
    this._shareFilm = this._shareFilm.bind(this) // bind the function because we are going to use it in the headerRight of the navigation (we need to be in the FilmDetail context)
  }

  _updateNavigationParams() { // this function is made to give the function _shareFilm and the object film as params of the navigation (to use it in headerRight)
    this.props.navigation.setParams({
      shareFilm: this._shareFilm,
      film: this.state.film
    })
  }

  componentDidMount() {
    console.log("Component FilmDetail mount")
    // console.log(this.props.favoritesFilm)
    const favoriteFilmIndex = this.props.favoritesFilm.findIndex(item => item.id === this.props.navigation.state.params.idFilm) 
    // console.log(favoriteFilmIndex)
    if (favoriteFilmIndex !== -1) {
      this.setState({
        film: this.props.favoritesFilm[favoriteFilmIndex]
      }, () => { this._updateNavigationParams() })
      return
    }
    this.setState({ isLoading: true })
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        }, () => { this._updateNavigationParams() })
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

  _shareFilm() {
    const { film } = this.state
    Share.share({ title: film.title, message: film.overview})
  }

  _displayFloatingActionButton() {
    const { film } = this.state
    if (film != undefined && Platform.OS === 'android') { // Only on Android and when the movie is display
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={() => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../assets/ic_share.android.png')} />
        </TouchableOpacity>
      )
    }
  }

  _displayFavoriteImage() {
    var sourceImage = require('../assets/ic_favorite_border.png')
    var shouldEnlarge = false
    if (this.props.favoritesFilm.findIndex(item => item.id === this.state.film.id) !== -1) {
      sourceImage = require('../assets/ic_favorite.png')
      shouldEnlarge = true
    }
    return (
      <EnLargeShrink
        shouldEnlarge={shouldEnlarge}>
          <Image
            style={styles.favorite_image}
            source={sourceImage}>
          </Image>
      </EnLargeShrink>
      
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
    // console.log(tab)
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
        {this._displayFloatingActionButton()}
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
  },
  share_touchable_floatingactionbutton: {
    position: 'absolute',
    width: 60,
    height: 60,
    right: 30,
    bottom: 30,
    borderRadius: 30,
    backgroundColor: '#e91e63',
    justifyContent: 'center',
    alignItems: 'center'
  },
  favorite_image:{
    flex: 1,
    width: null,
    height: null
  },
  share_touchable_headerrightbutton: {
    marginRight: 8
  }
})

const mapStateToProps = (state) => { // Map the favorite films state to the component FilmDetail props
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)