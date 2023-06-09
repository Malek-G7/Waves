// import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, Card, Button, Icon, Image } from "@rneui/themed";
import { StyleSheet, ScrollView, View, TextInput } from "react-native";
import { cloneElement, useState, useEffect } from "react";

const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const uri = "http://54.209.183.235:3000";

  const callAPIGetAll = async () => {
    try {
      const res = await fetch(
        `${uri}/getAllPosts`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const data = await res.json();
      console.log("the data is ");
      console.log(data)
      setAllUsers(data);
    } catch (err) {
      console.log(err);
    }
  };

  const callAPILike = async (id) => {
    let data;
    try {
      const res = await fetch(
        `${uri}/likePost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
          },
          body: JSON.stringify({
            _id: id,
          }),
        }
      );
      data = await res.json();
      console.log("like: ", +data);
      callAPIGetAll();
    } catch (err) {
      console.log(err);
    }
  };

  const callAPIUnlike = async (id) => {
    let data;
    try {
      const res = await fetch(
        `${uri}/unlikePost`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420", // See: https://stackoverflow.com/questions/73017353/how-to-bypass-ngrok-browser-warning
          },
          body: JSON.stringify({
            _id: id,
          }),
        }
      );
      data = await res.json();
      console.log("like: ", +data);
      callAPIGetAll();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.outer}>
      <View style={styles.container}>
        <View style={styles.proPage}>
          <View>
            {allUsers.map((user, index) => (
              <Card key={index}>
                <Card.Title style={{ textAlign: "left" }}>
                  {user.username}
                </Card.Title>
                <Card.Divider />
                <Text style={{ marginBottom: 10 }}>{user.content}</Text>
                <View >
                <Image source={{ uri: user.image }} style={{ width: 200, height: 200 }} resizeMode="cover" />
                </View>
                <View
                  style={{ flexDirection: "row", flexDirection: "row-reverse" }}
                >
                  <Icon
                    color="#0CC"
                    name="thumb-down-off-alt"
                    onPress={async () => callAPIUnlike(user._id)}
                    size={40}
                    type="material"
                  />
                  <Icon
                    color="#0CC"
                    name="thumb-up-off-alt"
                    onPress={async () => callAPILike(user._id)}
                    size={40}
                    type="material"
                  />
                  <Text style={{ margin: 10 }}>{user.likes}</Text>
                </View>
              </Card>
            ))}
          </View>
          <Icon
            color="#0CC"
            name="rotate-right"
            onPress={async () => callAPIGetAll()}
            size={40}
            type="font-awesome5"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  outer: {
    minHeight: "100%",
  },
  container: {
    flex: 1,
    borderWidth: 10,
    padding: 10,
    minHeight: "100%",
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
  button: {
    backgroundColor: "skyblue",
    padding: 10,
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
  proPage: {
    borderWidth: 1,
    backgroundColor: "white",
    marginBottom: 150,
    alignItems: "center",
  },
});
