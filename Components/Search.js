import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'


export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.page = 0,
    this.totalPages = 0,
    this.searchedText = ""
    this.state = {
      films: [],
      isLoading: false
    }
  }

  _changeSearchedText(text) {
    this.searchedText = text
  }

  _searchFilms(){
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    })
    this._loadFilms()
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
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if(this.page < this.totalPages) {
              this._loadFilms()
            }
          }}
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
    marginTop: 50,
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
