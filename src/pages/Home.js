import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const Home = (props) => {
  const { navigation } = props;
  const [campeonato, setCampeonatos] = useState([]);

  const getChampionships = () => {
    axios
      .get("https://api.api-futebol.com.br/v1/campeonatos/2/", {
        headers: {
          Authorization: `Bearer live_61395d1f923f2bfad10a0b822729c2`,
        },
      })
      .then((retorno) => {
        setCampeonatos([retorno.data]);
        
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  useEffect(() => {
    getChampionships();
  }, []);

  return (
    <View style={styles.container}>
      <Text> Seja Bem-Vindo </Text>
      
      <FlatList
        data={campeonato}
        keyExtractor={(id, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Fases", { campeonatoId: item.campeonato_id })
            }
          >
            <View style={styles.tabela}></View>
            <Text style={styles.item}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "gray",
    width: "90%",
    marginLeft: "5%",
    marginTop: 10,
    padding: 3,
    textAlign: "center",
  },
});