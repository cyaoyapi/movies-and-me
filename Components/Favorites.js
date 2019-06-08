import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import FilmsList from './FilmsList'
import { connect } from 'react-redux'

class Favorites extends React.Component {

  render() {
    return (
      <FilmsList
        films={this.props.favoriteFilms}
        navigation={this.props.navigation}
        favoritesList={true}
      />
    )
  }
}

const styles = StyleSheet.create({

})

const mapStateToProps = state => {
  return {
    favoriteFilms: state.favoriteFilms
  }
}
export default connect(mapStateToProps)(Favorites)
