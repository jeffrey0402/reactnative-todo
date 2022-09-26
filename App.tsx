import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  // maak een lijst aan dat de UI kan renderen
  const [todoList, setTodoList] = useState<string[]>(["Eerste taak"]);
  const [todoText, settodoText] = useState<string>("");

  // functies voor de todo lijst
  const RemoveItem = (id: number) => {
    // Maak een nieuwe lijst, met alles behalve het item dat verwijderd moet worden.
    const newTodoList = todoList.filter((_, index) => index !== id);
    setTodoList(newTodoList); // update de lijst
  };

  const AddItem = (content: string) => {
    const newTodoList = [...todoList, content]; // voeg lijsten samen
    setTodoList(newTodoList); // update lijst
    settodoText(""); // reset input
  };

  const onChangeInput = (text: string) => {
    settodoText(text); // update de input
  };

  // Todo item props, dit hebben alle todo items nodig
  interface TodoItemProps {
    id: number; // uniek ID nodig om het item later weer te verwijderen. In dit geval de index in de array
    children: string; // alles binnen de <TodoItem> tags
  }

  const TodoItem = (props: TodoItemProps) => {
    return (
      <>
        <View style={styles.TodoItem}>
          <Text style={styles.Text}>{props.children}</Text>
          <Button title="x" onPress={() => RemoveItem(props.id)} />
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.BigText}>Todo list</Text>
      <ScrollView>
        {todoList.map((item, index) => (
          <TodoItem key={index} id={index}>
            {item}
          </TodoItem>
        ))}
      </ScrollView>
      <TextInput
        style={styles.input}
        placeholder="Voer hier een todo item in"
        value={todoText} // bind de input aan de state
        onChangeText={onChangeInput} // update de state als de input veranderd
      />
      <Button title="Add todo" onPress={() => AddItem(todoText)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 50,
    marginHorizontal: 20,
  },
  BigText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  Text: {
    fontSize: 15,
  },
  TodoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    margin: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
    round: 10,
  },
  input: {
    height: 40,
    margin: 16,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
