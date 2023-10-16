import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

const STORAGE_KEY = "@toDos";
export default function App() {
  const [working, setWorking] = useState(true);
  const work = () => setWorking(true);
  const travel = () => setWorking(false);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});

  const onChangeText = (payload) => setText(payload);

  // storage의 toDo 리스트에 toDos를 저장
  const storeToDos = async (newItems) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };
  // storage에 저장된 toDo 리스트 불러오기
  const getToDos = async () => {
    const items = await AsyncStorage.getItem(STORAGE_KEY);
    items ? setToDos(JSON.parse(items)) : null;
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    // const newToDos = Object.assign({}, toDos, {
    //   [Date.now()]: text,
    //   work: working,
    // });
    const newToDos = { ...toDos, [Date.now()]: { text, working } };
    setToDos(newToDos);
    await storeToDos(newToDos);
    setText("");
  };
  const deleteToDo = (key) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "I'm Sure",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          storeToDos(newToDos);
        },
      },
    ]);
  };

  useEffect(() => {
    getToDos();
  }, []);

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
          toDos[key].working === working ? (
            <View
              className={
                "toDo w-full h-11 my-[1.2] px-5 flex-row justify-between items-center bg-blue-200 rounded-3xl"
              }
            >
              <Text className={"text-lg font-semibold"}>{toDos[key].text}</Text>
              <TouchableOpacity onPress={() => deleteToDo(key)}>
                <Text className="deleteBtn">
                  <Feather name="delete" size={24} color="black" />
                </Text>
              </TouchableOpacity>
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
