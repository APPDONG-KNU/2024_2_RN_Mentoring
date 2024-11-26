import { StatusBar } from 'expo-status-bar';
import React, {useState} from "react";
import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  
  const toggleDone = (key) => {
    const updatedToDos = {...toDos,
      [key]: {
        ...toDos[key],
        isDone: !toDos[key].isDone,
      },
    };
    setToDos(updatedToDos);
  }
  
  return (
    <SafeAreaView style = {styles.safeContainer}>
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
        <Text>Daily To Do</Text>
        {
          Object.keys(toDos).map(key => toDos[key].isDone === false &&
          <View style={styles.toDo} key={key}>
            <TouchableOpacity style={styles.checkBox} onPress={() => toggleDone(key)}>
            </TouchableOpacity>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View>
          )
        }
      </View>
      <View style={styles.toDoContainer}>
        <Text>Done</Text>
        { 
          Object.keys(toDos).map(key => toDos[key].isDone === true &&
          <View style={styles.toDo} key={key}>
            <TouchableOpacity style={[styles.checkBox, styles.checkedBox]} onPress={() => toggleDone(key)}>
              <Text style={{color:"white"}}>✔</Text>
            </TouchableOpacity>
            <Text style={[styles.toDoText,styles.doneToDoText]}>{toDos[key].text}</Text>
          </View>
          )
        }
      </View>
      <StatusBar hidden/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 15, // SafeAreaView 사용 시 ios에선 padding 적용되지 않음
    marginHorizontal: Platform.OS == "android" ? 0 : 15,
  },
  header: {
    marginTop: 20,
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
    flexDirection: "row",
    justifyContent: "space-between"
  },
  toDoText: {
    fontSize: 15,
  },
  checkBox: {
    borderWidth: 1,
    borderColor: "grey",
    height: 15,
    width: 15,
  },
  checkedBox: {
    backgroundColor: "skyblue",
    alignItems: "center",
    justifyContent: "center",
  },
  doneToDoText: {
    textDecorationLine: "line-through",
    color: "grey",
  }
});
