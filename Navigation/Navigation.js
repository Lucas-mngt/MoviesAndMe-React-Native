import React from 'react'
import { StyleSheet, Image } from 'react-native';
import {createAppContainer } from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'

const SearchStackNavigator = createStackNavigator({
    Search: { // Name it as you want
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const FavoritesStackNavigator = createStackNavigator({
    Favorites: { // Name it as you want
        screen: Favorites,
        navigationOptions: {
            title: 'Favoris'
        }
    },
    FilmDetail: {
        screen: FilmDetail
    }
})

const MoviesTabNavigator = createBottomTabNavigator(
    {
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { // define icon by an image in the assets directory
                    return <Image
                        source={require('../assets/ic_search.png')}
                        style={styles.icon}/>
                }
            }
        },
        Favorites: {
            screen: FavoritesStackNavigator,
            navigationOptions: {
                tabBarIcon: () => { // define icon by an image in the assets directory
                    return <Image
                        source={require('../assets/ic_favorite.png')}
                        style={styles.icon}/>
                }
            }
        }
    },
    {
        tabBarOptions: { // Options of the tab
            activeBackgroundColor: '#DDDDDD',
            inactiveBackgroundColor: '#FFFFFF',
            showLabel: false,
            showIcon: true
        }
    }
)

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)