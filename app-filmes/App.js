import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View , FlatList, ActivityIndicator } from 'react-native';
import Filmes from './src/Filmes';

import api from './src/services/api';


export default function App() {
  const [filmes, setFilmes] = useState([]); 
  const [loading, setLoading] = useState(true);

  // EXECUTA ESSA FUNÇÃO ASSIM QUE A TELA FOR INICIADA
  useEffect(() => {

    async function loadFilmes(){
      const response = await api.get('r-api/?api=filmes');
      // console.log(response.data);
      setFilmes(response.data);
      setLoading(false);
    }

    loadFilmes();

  }, []);

  if(loading) {
    return(
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color="#121212" size={80}/>
      </View>
    )

  }else {
    return (
      <View style={styles.container}>

        <View style={styles.areaTitulo}>
          <Text style={styles.tituloFilmes}>LISTA DE FILMES</Text>
        </View>

        <FlatList
          data={filmes}
          keyExtractor={ item => String(item.id) }
          renderItem={({item}) => <Filmes data={item} />}
        />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  tituloFilmes: {
    fontSize: 25,
    padding: 10,
    color: '#fff'
    // alignItems: 'center',
    // justifyContent: 'center',
    // width: '100%'
  },
  areaTitulo: {
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
    
  }
});
