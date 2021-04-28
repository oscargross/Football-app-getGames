import React from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StyleSheet

} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

const Jogos = ({ route }) => {
  const [gamesView, setGamesView] = useState();
  const idFase = route.params?.idFase;

  function games() {
    axios
      .get(`https://api.api-futebol.com.br/v1/campeonatos/2/fases/${idFase}`, {
        headers: {
          Authorization: `Bearer live_61395d1f923f2bfad10a0b822729c2`,
        },
      })
      .then(({ data }) => {
        const games = data.chaves;

        const listaGames = games.map((item) => {
          const game = {};
          const { nome, partida_ida } = item;

          game.key_name = nome;
          game.partida_id = partida_ida.partida_id;
          game.dt_game = partida_ida.data_realizacao;
          game.time_m = partida_ida.time_mandante;
          game.placar_m = partida_ida.placar_mandante;
          game.time_v = partida_ida.time_visitante;
          game.placar_v = partida_ida.placar_visitante;
          return game;
        }).sort(function (a, b) {
          return a.partida_id < b.partida_id
            ? -1 : a.partida_id > b.partida_id
              ? 1 : 0;
        });

        setGamesView(listaGames);
      })
      .catch((error) =>
        console.error(error));
  }

  useEffect(() => {
    console.log(route.params?.idFase);
    games();
  }, []);

  return (
    <SafeAreaView >
      <View>
        <FlatList
          style={{ width: "100%" }}
          data={gamesView}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.centered}>{item.key_name} - Data do Jogo: {item.dt_game}</Text>
              <View style={styles.centered}>
                <View >
                  <View >
                    <Text style={styles.item}>
                      {item.time_m.nome_popular} X {item.time_v.nome_popular}
                    </Text>
                  </View>
                  <View >
                    <Text style={styles.item}>
                      {item.placar_m} X {item.placar_v}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(id, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

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
  centered: {
    textAlign: "center",
    alignItems: "center",
  }
});

export default Jogos;
