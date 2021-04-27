import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import "react-native-gesture-handler";
import Home from "./src/pages/Home";
import Fases from "./src/pages/Fases";
import Jogos from "./src/pages/Jogos";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          styles={styles.container}
          name="Home"
          component={Home}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          styles={styles.container}
          name="Fases"
          component={Fases}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          styles={styles.container}
          name="Jogos"
          component={Jogos}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
