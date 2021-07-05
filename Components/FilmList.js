// Components/FilList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import FilmItem from './FilmItem'

class FilmList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            films: []
        }
    }
    
    _displayDetailForFilm = (idFilm) => { // equivalent of the binding from Search (cf comments on Search), the arrow function do it on his own way, same result
        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm }) // Change the view to Film detail
    }

    render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                extraData={this.props.favoritesFilm.length}
                // Use the prop extraData to tell FlatList that other datas must be consider if we ask the re-render
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => 
                    <FilmItem
                        film={item}
                        // Add a props isFilmFavorite to indicate to the item to display a heart or not
                        isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                        displayDetailForFilm={this._displayDetailForFilm}
                    />
                }
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (!this.props.favoriteList && this.props.page < this.props.totalPages) { //until pagination end + use loadFilms() from the component Search
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}
    
const styles = StyleSheet.create({
    list: {
        flex: 1
    }
})

const mapStateToProps = state => {
    return {
      favoritesFilm: state.favoritesFilm
    }
  }
  
export default connect(mapStateToProps)(FilmList)