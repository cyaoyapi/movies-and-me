const API_TOKEN = '6ca8caf69677d7111774aa5b2a4ef53e'

export function getFilmsFromApiWithSearchedText(text){
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
