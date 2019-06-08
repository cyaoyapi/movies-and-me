import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'

const SearchStackNavigator = createStackNavigator({
    Search: {
      screen: Search,
      navigationOptions: {
        title: 'Reachercher'
      }
    },
    FilmDetail: {
      screen: FilmDetail
    }
  })

  const FavoritesStackNavigator = createStackNavigator({
      Favorites: {
        screen: Favorites,
        navigationOptions: {
          title: 'Favorites'
        }
      },
      FilmDetail: {
        screen: FilmDetail
      }
    })

const MoviesTabNavigator = createBottomTabNavigator({
  Test: {
    screen: Test
  },
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          style={styles.icon}
          source={require('../Images/ic_search.png')}
        />
      }
    }
  },
  Favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          style={styles.icon}
          source={require('../Images/ic_favorite.png')}
        />
      }
    }
  }
},
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD',
      inactiveBackgroundColor: '#FFFFFF',
      showLabel: false,
      showIcon: true
    }
})

const syles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  }
})

export default createAppContainer(MoviesTabNavigator)
