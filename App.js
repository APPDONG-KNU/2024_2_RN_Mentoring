import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const onChangeText = (event) => {
    setText(event);
  }

  const addToDo = () => {
    if (text === "") {
      return;
    }
    const newToDos = Object.assign({}, toDos, {[Date.now()]: {text, isDone: false}}); // const newToDos = {...todos, [Date.now()]:{text}}; 해도 동일함
    setToDos(newToDos);
    setText("");
  }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Appdong ToDo List</Text>
      </View>
      <View>
        <TextInput
          placeholder={"할 일을 추가하세요"}
          value={text}
          style={styles.input}
          onChangeText={onChangeText}
          onSubmitEditing={addToDo}
        />
      </View>
      <View style={styles.toDoContainer}>
        {
          Object.keys(toDos).map(key => 
          <View style={styles.toDo}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View>
          )
        }
      </View>
      <StatusBar hidden/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 7,
    backgroundColor: "green"
  },
  header: {
    backgroundColor: "red",
  },
  title: {
    fontSize: 28,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    fontSize: 18
  },
  toDoContainer: {
    marginTop: 50,
  },
  toDo: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginVertical: 3,
    backgroundColor: "white",
  },
  toDoText: {
    fontSize: 15,
  }
});
