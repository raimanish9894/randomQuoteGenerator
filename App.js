import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TouchableOpacity,Linking } from 'react-native';
import { FontAwesome5,FontAwesome } from '@expo/vector-icons';
import React,{ useState, useEffect } from 'react';





export default function App() {

  const [Quote, setQuote] = useState('Loading....');

  const [Author, setAuthor] = useState('Loading....');

  const [isLoading, setIsLoading] = useState(false);

  const randomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
      console.log(result.content);

      setQuote(result.content);
      setAuthor(result.author);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    randomQuote();
  }, []);

  const tweetNow = () => {
    const url = "https://twitter.com/intent/tweet?text=" + Quote;
    Linking.openURL(url);
  }

  const whatsApp = () => {
    Linking.openURL("whatsapp://send?text="+ Quote);
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
      <Text style={styles.headertxt}>Quote of the Day</Text>
      <FontAwesome5 name="quote-left" style={{fontSize:20, marginBottom:-12}} color="#008080"/>
      <Text style={styles.qouteStyle}>{Quote}</Text>
      <FontAwesome5 name="quote-right" style={{fontSize:20, textAlign:'right',marginTop:-20, marginBottom:20}} color="#008080"/>
      <Text style={styles.authorName}> —— {Author}</Text>
      <TouchableOpacity style={styles.button} onPress={randomQuote}>
        <Text style={styles.buttonTxt}>{isLoading ? "Loading...." : "New Quote"}</Text>
      </TouchableOpacity>

      <View style={styles.bottomButton}>
      <TouchableOpacity style={styles.logo} onPress={whatsApp}>
      <FontAwesome name="whatsapp" size={30} color="#40E0D0" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logo} onPress={tweetNow}>
      <FontAwesome name='twitter' size={30} color="#40E0D0"/>
      </TouchableOpacity>
      </View>
      </View>
      <StatusBar barStyle="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#40E0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main:{
    width:'90%',
    backgroundColor:'#F5F5F5',
    borderRadius:20,
    padding:20
  },
  headertxt:{
    textAlign:'center',
    fontSize:26,
    fontWeight:'700',
    color:'#708090',
    marginBottom:20,
  },
  qouteStyle:{
    fontSize:16,
    lineHeight:26,
    letterSpacing:1.1,
    fontWeight:'500',
    color:'#008080',
    textAlign:'center',
    marginBottom:10,
    paddingHorizontal:30
  },
  button:{
    backgroundColor:'#40E0D0',
    padding:20,
    borderRadius:30,
    marginVertical:20
  },
  buttonTxt:{
    color:'#F5F5F5',
    fontSize:20,
    fontWeight:'700',
    textAlign:'center'
  },
  authorName:{
    textAlign:'right',
    fontWeight:'300',
    fontStyle:'italic',
    fontSize:16,
    color:'#008080'
  },
  bottomButton:{
    flexDirection:'row',
    justifyContent:'space-around'
  },
  logo:{
    borderWidth: 2,
    borderColor:'#40E0D0',
    borderRadius:50,
    padding:15,
  },  
});
