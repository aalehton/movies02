import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';

export default function MovieDetailScreen(props) {
    const { route } = props;
  const { movie } = route.params; 
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + movie.backdrop_path;

const [genre, setGenre] = useState([]);
const [videos, setVideos] = useState([]);
const [infoText, setInfoText] = useState([]);

useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=bbf39a3988d393a9d71afd62919d62a9&append_to_response=videos')
      .then(response => {
        console.log(response.data.genres);
        setGenre(response.data.genres);
      })
  }, [])

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=bbf39a3988d393a9d71afd62919d62a9&append_to_response=videos')
      .then(response => {
        console.log(response.data.results);
        setGenre(response.data.results);
      })
  }, [])

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=bbf39a3988d393a9d71afd62919d62a9&append_to_response=videos')
      .then(response => {
        console.log(response.data);
        setGenre(response.data);
      })
  }, [])
  if (genre.length === 0) {
    return(
      <View style={{flex: 1, padding: 20}}>
        <Text>Loading, please wait...</Text>
      </View>
    )
  }
  if (videos.length === 0) {
    return(
      <View style={{flex: 1, padding: 20}}>
        <Text>Loading, please wait...</Text>
      </View>
    )
  }
  if (infoText.length === 0) {
    return(
      <View style={{flex: 1, padding: 20}}>
        <Text>Loading, please wait...</Text>
      </View>
    )
  }
  let movieRefresh = genre.map(function(genre,index){
    return (
      <View>
      <MovieListItemRefresh genre={genre} key={index}/>
      </View>
    )
  });
  let movieRefresh2 = videos.map(function(video,index){
    return (
      <View>
      <MovieListItemRefresh2 video={video} key={index}/>
      </View>
    )
  });
  function MovieListItemRefresh(props) {
    return (
      <View>
        <Text style={{paddingBottom:10, fontSize: 14}}>{props.genre.name}</Text>
      </View> 
    );
  }
  function MovieListItemRefresh2(props) {
    return (
      <TouchableHighlight onPress={_ => videoPressed(props.video.key)} underlayColor="lightgray">
        <Text style={{paddingBottom:10 , fontSize: 14, color: 'blue'}}>{props.video.name}</Text>
      </TouchableHighlight> 
    );
    } 
    const videoPressed = (index) => {
      props.navigation.navigate(
        'MoviePlay',
        { moviesKey: index});
      } 
      return (
        <View>
          <ScrollView>
          <Image source={{uri: imageurl}} style={styles.image}  />
          <View  style={{padding: 20}}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.text}>{movie.release_date}</Text>
          <Text style={styles.text}>{movie.overview}</Text>
          <Text style={{fontWeight: "bold"}}>Genre:</Text>
          <Text>{movieRefresh}</Text>
          <Text style={{fontWeight: "bold"}}>Runtime:</Text>
          <Text style={{marginBottom:10, fontSize: 14}}>{infoText.runtime}</Text>
          <Text style={{fontWeight: "bold"}}>Homepage:</Text>
          <Text style={{marginBottom:10}}>{infoText.homepage} </Text>
          <Text style={{fontWeight: "bold"}}>Videos:</Text>
          <Text> {movieRefresh2} </Text> 
          </View>
          </ScrollView>
        </View>
      )
    }
    const styles = StyleSheet.create({
        image: {
          aspectRatio: 670/250
        },
        title: {
          fontWeight: 'bold',
          fontSize: 15
        },
        text: {
          fontSize: 12,
          flexWrap: 'wrap',
          marginBottom: 20,
        }
      });
      