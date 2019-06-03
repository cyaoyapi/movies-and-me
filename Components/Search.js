import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'


export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = {
      films: []
    }
  }

  _changeSearchedText(text) {
    this.searchedText = text
  }

  _loadFilms() {
    if(this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
        this.setState({ films: data.results })
      })
    }
  }

  render() {
    console.log(this.state.films)
    return(
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder="Titre du film" onChangeText={(text) => this._changeSearchedText(text)} />
        <Button title="Rechercher" onPress={() => this._loadFilms()} />
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} />}
        />
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

})
