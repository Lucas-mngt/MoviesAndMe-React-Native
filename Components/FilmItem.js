import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component {

    _displayFavoriteImage() {
        if (this.props.isFilmFavorite) {
          // if props isFilmFavorite is true, display the black heart
          return (
            <Image
              style={styles.favorite_image}
              source={require('../assets/ic_favorite.png')}
            />
          )
        }
    }

    render () {
        const { film, displayDetailForFilm } = this.props
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayDetailForFilm(film.id)}>
                {/* TouchableOpacity is used to make the component clickable */} 
                <Image 
                    style={styles.image}
                    source={{uri: getImageFromApi(film.poster_path)}}>
                </Image>
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._displayFavoriteImage()}
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>{film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        height: 200,
        flexDirection: 'row',
    },
    image: {
        width: 120,
        height: 180,
        margin: 5
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    favorite_image: {
        width: 25,
        height: 25,
        marginRight: 5,
        marginTop: 15
    },
    header_container: {
        flex:3,
        flexDirection: 'row'
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote_text: {
        fontWeight: 'bold',
        fontSize: 26
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
})

export default FilmItem