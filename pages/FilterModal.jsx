import { useEffect, useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Arrow from "../components/svg/Arrow";

const FilterModal = ({ navigation, route: { params } }) => {
  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [value, setValue] = useState(params.filters.category);
  const [valueType, setValueType] = useState(params.filters.type);

  const colorScheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (colorScheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [colorScheme]);

  return (
    <View
      style={darkMode ? { backgroundColor: "#1C1C1C", flex: 1 } : { flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          width: "90%",
          marginTop: 20,
          marginBottom: 0,
          marginHorizontal: "auto",
        }}
      >
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Arrow stroke={darkMode ? "#fff" : "#000"} />
        </TouchableWithoutFeedback>

        <View style={{ zIndex: 1000 }}>
          <Text style={{ color: "grey", marginTop: 10, marginBottom: 5 }}>
            Filter by payment category
          </Text>
          <DropDownPicker
            open={open}
            value={value}
            items={[
              { label: "All", value: "all" },
              { label: "Food", value: "food" },
              { label: "Education", value: "education" },
              { label: "Clothing", value: "clothing" },
              { label: "Travel", value: "travel" },
            ]}
            setOpen={(callback) => {
              setOpen(callback);
              setOpenType(false);
            }}
            setValue={setValue}
            style={{
              backgroundColor: "transparent",
              borderColor: "#86939e",
            }}
            textStyle={{
              color: "#fff",
            }}
            dropDownContainerStyle={{
              backgroundColor: "#912F40",
            }}
            listItemLabelStyle={{
              color: "#fff",
            }}
          />
        </View>

        <View style={{ zIndex: 500, marginTop: 15 }}>
          <Text style={{ color: "grey", marginBottom: 5 }}>
            Filter by payment type
          </Text>
          <DropDownPicker
            open={openType}
            value={valueType}
            items={[
              { label: "All", value: "all" },
              { label: "Card", value: "card" },
              { label: "Cash", value: "cash" },
            ]}
            setOpen={(callback) => {
              setOpenType(callback);
              setOpen(false);
            }}
            // placeholder={"dddd"}
            setValue={setValueType}
            style={[
              {
                backgroundColor: "transparent",
                borderColor: "#86939e",
              },
              {},
            ]}
            textStyle={{
              color: "#fff", // ← для текста выбранного элемента
            }}
            dropDownContainerStyle={{
              backgroundColor: "#912F40", // например, тёмный фон выпадающего списка
            }}
            listItemLabelStyle={{
              color: "#fff", // ← для пунктов выпадающего списка
            }}
          />
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            params.onSelect({ type: "all", category: "all" });
            navigation.goBack();
          }}
        >
          <View>
            <Text style={{ color: "#912F40", marginTop: 15 }}>
              {" "}
              X Undo filters
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            params.onSelect({ type: valueType, category: value });
            navigation.goBack();
          }}
        >
          <View
            style={[
              { marginTop: 15, borderRadius: 5 },
              darkMode
                ? { backgroundColor: "#912F40" }
                : { backgroundColor: "#13293D" },
            ]}
          >
            <Text
              style={{
                textAlign: "center",
                paddingVertical: 15,
                paddingHorizontal: 15,
                color: "#fff",
              }}
            >
              Filter
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default FilterModal;
