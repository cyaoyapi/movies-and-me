import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import FadeIn from '../Animations/FadeIn'

export default class FilmItem extends React.Component {

  _displayFavoriteImage() {
    if(this.props.isFavorite) {
      sourceImage = require('../Images/ic_favorite.png')
      return (
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      )
    }

  }

  render() {
    const { film, displayDetailForFilm } = this.props
    return (
      <FadeIn>
        <TouchableOpacity style={styles.main_container} onPress={() => displayDetailForFilm(film.id)}>
          <Image
            style={styles.image}
            source={{uri: getImageFromApi(film.poster_path)}}
          />
          <View style={styles.content_container}>
            <View style={styles.content_header}>
              {this._displayFavoriteImage()}
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.vote_average_text}>{film.vote_average}</Text>
            </View>
            <View style={styles.content_body}>
              <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
            </View>
            <View style={styles.content_footer}>
              <Text style={styles.date_release_text}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    )
  }

}

styles = StyleSheet.create({
  main_container: {
    height: 190,
    flex:1,
    flexDirection: 'row'
  },
  image: {
    height: 180,
    width: 120,
    margin: 5,
    backgroundColor: 'gray'
  },
  content_container: {
    flex: 1,
    margin: 5
  },
  content_header: {
    flex:3,
    flexDirection: 'row'
  },
  title_text: {
    flex:1,
    fontWeight: 'bold',
    fontSize: 20,
    flexWrap: 'wrap',
    paddingRight: 5

  },
  vote_average_text: {
    fontWeight: 'bold',
    fontSize: 26,
    color: '#666666'
  },
  content_body: {
    flex:7,
  },
  description_text: {
    fontStyle: 'italic',
    color: '#666666'
  },
  content_footer: {
    flex:1,
  },
  date_release_text: {
    textAlign: 'right',
    fontSize: 14
  },
  favorite_image: {
    width: 20,
    height: 20
  }
})
