import React from "react";
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

const Partidas = ({ navigation, route }) => {
  const [data, setData] = useState();
  const idFase = route.params.idFase;

  useEffect(() => {
    partidas();
  }, []);

  function partidas() {
    axios
      .get(`https://api.api-futebol.com.br/v1/campeonatos/2/fases/${idFase}`, {
        headers: {
          Authorization: `Bearer live_61395d1f923f2bfad10a0b822729c2`,
        },
      })
      .then(({ data }) => {
        const partidas = data.chaves;

        const lista = partidas.map((item) => {
          const partida = {};
          const { nome, partida_ida } = item;
          partida.time_m = partida_ida.time_mandante;
          partida.placar_m = partida_ida.placar_mandante;
          partida.time_v = partida_ida.time_visitante;
          partida.placar_v = partida_ida.placar_visitante;
          partida.chave_nome = nome;
          partida.partida_id = partida_ida.partida_id;
          partida.data_realizacao = partida_ida.data_realizacao;
          partida.hora_realizacao = partida_ida.hora_realizacao;
          partida.estadio = partida_ida.estadio.nome_popular;
          return partida;
        });

        lista.sort(function (a, b) {
          return a.partida_id < b.partida_id
            ? -1
            : a.partida_id > b.partida_id
            ? 1
            : 0;
        });
        setData(lista);
      })
      .catch((error) => console.error(error));
  }

  return (
    <SafeAreaView >
      <View >
        
      
          <FlatList
            style={{ width: "100%" }}
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) => (
              <View >
                <Text >{item.chave_nome}</Text>
                <View >
                  <View >
                    <Text >
                      {item.data_realizacao}
                    </Text>
                    <Text>{item.estadio}</Text>
                    <Text >
                      {item.hora_realizacao}
                    </Text>
                  </View>
                  <View >
                    <View >
                      <Text style={{ fontSize: 15 }}>
                        {item.time_m.nome_popular}
                      </Text>
                    </View>
                    <View >
                      <Text >
                        {item.placar_m}
                      </Text>
                      <Text >x</Text>
                      <Text >
                        {item.placar_v}
                      </Text>
                    </View>
                    <View >
                      <Text style={{ fontSize: 15 }}>
                        {item.time_v.nome_popular}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
      
      </View>
    </SafeAreaView>
  );
};

export default Partidas;
