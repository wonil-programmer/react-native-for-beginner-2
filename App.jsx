import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

export default function App() {
  const [working, setWorking] = useState(true);
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const onChangeText = (payload) => setText(payload);
  const addToDo = () => {
    if (text === "") {
      return;
    }
    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: text,
    //   work: working,
    // });
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    setText("");
    // save todo
  };
  console.log(toDos);
  return (
    <View className={"container my-10"}>
      <StatusBar style="auto" />
      <View className={"header flex-row mt-4 justify-evenly"}>
        <TouchableOpacity onPress={work}>
          <Text
            className={`workBtn text-[44px] font-[600] ${
              working ? "black" : "color-slate-300"
            }`}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            className={`travelBtn text-[44px] font-[600] ${
              !working ? "black" : "color-slate-300"
            }`}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        className={
          "textInput bg-slate-100 my-4 mx-8 px-4 pt-1 pb-3 rounded-3xl text-lg"
        }
        onChangeText={onChangeText}
        onSubmitEditing={addToDo}
        value={text}
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        returnKeyType="done"
      />
      <ScrollView className={"toDoLists h-[600px] mx-8 my-2"}>
        {Object.keys(toDos).map((key) =>
          toDos[key].workingw === working ? (
            <View
              className={
                "toDo w-full h-11 my-[1.2] px-5 bg-blue-200 rounded-3xl"
              }
            >
              <Text className={"mt-2 text-lg font-semibold"}>
                {toDos[key].text}
              </Text>
            </View>
          ) : null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
