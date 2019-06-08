import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmsList from './FilmsList'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.page = 0,
    this.totalPages = 0,
    this.searchedText = ""
    this.state = {
      films: [],
      isLoading: false
    }
    this._loadFilms = this._loadFilms.bind(this)
  }

  _changeSearchedText(text) {
    this.searchedText = text
  }

  _searchFilms(){
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
  }

  _loadFilms() {
    if(this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
        this.page = data.page
        this.totalPages = data.total_pages
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: false
         })
      })
    }
  }

  _displayLoader(){
    if(this.state.isLoading){
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }



  render() {
    return(
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder="Titre du film" onChangeText={(text) => this._changeSearchedText(text)} onSubmitEditing={() => this._searchFilms()}/>
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        <FilmsList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.page}
          totalPages={this.totalPages}
          favoritesList={false}
        />
        {this._displayLoader()}
      </View>
    )
  }

}


const styles = StyleSheet.create({
  main_container:{
    flex: 1,
  },
  textinput: {
    height: 50,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000"
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

const mapStateToProps = state => {
  return {
    favoriteFilms: state.favoriteFilms
  }
}
export default connect(mapStateToProps)(Search)
