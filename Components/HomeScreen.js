// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
  Text,
  View,
  TextInput,
} from "react-native";
import { cloneElement, useState } from "react";

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
  });

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Shopsy</Text>
        <View style={styles.search}>
          <Text style={styles.text}>Search for a product</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Type product name here !"
            onChangeText={(newText) => setText(newText)}
          />
          <Pressable
            style={styles.button}
            onPress={async () => {
              let data;
              try {
                const res = await fetch(`${uri}/getSpecificProduct`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
                  },
                  body: JSON.stringify({ productName: text }), // Need to use POST to send body
                });
                data = await res.json();
                navigation.navigate("Product", {
                  productName: data.name,
                  productPrice: data.price,
                });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <Text style={styles.Text}>Search for a product</Text>
          </Pressable>
        </View>
        {/* //============================================================================================================================================================ */}

        <View style={styles.add}>
          <Text style={styles.text}>Add new product here !</Text>
          <TextInput
            style={styles.TextInput}
            placeholder="Type new product name here !"
            onChangeText={(newName) => {
              setNewProduct({ ...newProduct, name: newName });
            }}
          />
          <TextInput
            style={styles.TextInput}
            placeholder="Type new product price here !"
            onChangeText={(newPrice) => {
              setNewProduct({ ...newProduct, price: newPrice });
            }}
          />
          <Pressable
            style={styles.button}
            onPress={async () => {
              let data;
              try {
                const res = await fetch(`${uri}/addProduct`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
                  },
                  body: JSON.stringify({
                    productName: newProduct.name,
                    productPrice: newProduct.price,
                  }), // Need to use POST to send body
                });
                data = await res.json();
              } catch (err) {
                console.log(err);
              }
              // navigation.navigate('product', {product : data })
            }}
          >
            <Text style={styles.Text}>Add new product</Text>
          </Pressable>
        </View>
        {/* //============================================================================================================================================================ */}
        <View style={styles.proPage}>
          <Text style={styles.text}>Go to all Products page</Text>
          <Pressable
            style={styles.button}
            onPress={async () => {
              try {
                const res = await fetch(`${uri}/getAllProducts`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
                  },
                });
                const data = await res.json();
                console.log(data);
                navigation.navigate("AllProducts", { products: data });
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <Text style={styles.Text}>Display all products</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    padding: 10,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    backgroundColor: "skyblue",
    marginTop: 30,
    height: 40,
    width: 200,
    borderWidth: 4,
    justifyContent: "center",
  },
  TextInput: {
    borderWidth: 1,
    textAlign: "center",
    height: 30,
    width: 200,
    marginTop: 30,
    marginBottom: 20,
  },
  Text: {
    textAlign: "center",
  },
  title: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,

    textAlign: "center",
  },

  search: {
    borderWidth: 1,
    backgroundColor: "white",
    marginTop: 50,
    alignItems: "center",
  },

  add: {
    backgroundColor: "white",
    marginTop: 100,

    alignItems: "center",
  },

  proPage: {
    marginTop: 100,
    marginBottom: 150,
    alignItems: "center",
  },
  productDetails: {
    alignItems: "center",
    marginBottom: 100,
  },
  productText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  productTextInput: {
    alignItems: "center",
  },
});
