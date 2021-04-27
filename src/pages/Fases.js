import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  
} from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";

const Fases = ({ navigation, route }) => {
  const [data, setData] = useState();
  const campeonatoId = route.params.campeonatoId;

  useEffect(() => {
    fases();
  }, []);

  function fases() {
    axios
      .get(
        `https://api.api-futebol.com.br/v1/campeonatos/${campeonatoId}/fases/`,
        {
          headers: {
            Authorization: `Bearer live_61395d1f923f2bfad10a0b822729c2`,
          },
        }
      )
      .then(({ data }) => {
        const listCard = data.map((i) => {
          const obj = {};
          const { nome, fase_id } = i;
          if (nome === "Primeira Fase" || nome === "Segunda Fase" || nome === "Fase Única"){           
            obj.fase_nome = nome;
            obj.fase_id = fase_id;
            return obj;
          }          
          return obj;
         
        });

        setData(listCard);
      })
      .catch((error) => console.error(error));
  }

  return (
    <SafeAreaView >
      <View>       
          <FlatList
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) =>
              item.fase_nome ? (
                <TouchableOpacity                 
                  onPress={() => {
                    navigation.navigate("Jogos", {
                      idFase: item.fase_id,
                    });
                  }}>
                  <View style={styles.tabela}>
                    <Text style={styles.item}>{item.fase_nome}</Text>
                  </View>
                </TouchableOpacity>
              ) : null
            }
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
});

export default Fases;
