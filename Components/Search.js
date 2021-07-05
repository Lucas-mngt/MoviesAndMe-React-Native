// Components/Search.js

import React from 'react'
import { StyleSheet, View, ActivityIndicator, TextInput, Button, FlatList } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.searchedText= ""
        this.page = 0
        this.totalPages = 0
        this.state = { 
            films: [],
            isLoading: false,
            count: 0
        }
        this._loadFilms = this._loadFilms.bind(this) // We are going to use the function _loadFilms() in another component (FilmList) as a callback (the context will be on FilmList)
                                                    //We need to keep the context (this) on Search, that's why we have to bind the function to keep the context on Search
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
          films: []
        }, () => { // wait for the callback before load the movies
            this._loadFilms() 
        })
    }
    
    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true })
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({ 
                    films: [ ...this.state.films, ...data.results ], //Concatenation
                    isLoading: false
                })
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
              <View style={styles.loading_container}>
                <ActivityIndicator size='large' />
              </View>
            )
        }
    }
    
    render() {
        return (
            <View style={styles.main_container}>
                <TextInput 
                    style={styles.textinput} 
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button title='Rechercher' onPress={() => this._searchFilms()}/>
                <FilmList
                    films={this.state.films}
                    navigation={this.props.navigation}
                    loadFilms={this._loadFilms} // binded function
                    page={this.page}
                    totalPages={this.totalPages}
                    favoriteList={false} // not in the case of favoriteList display
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => { // Map the favoriteFilm state to the component Search props
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)