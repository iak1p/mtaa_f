import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginTop: 0,
    marginBottom: 0,
    marginHorizontal: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    paddingTop: 40,
    fontWeight: "bold",
    color: "white",
  },
  subTitle: {
    textAlign: "center",
    fontSize: 45,
    fontWeight: "bold",
    paddingTop: 16,
    paddingBottom: 30,
    color: "white",
    fontFamily: "Montserat",
  },
  classTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: -45,
  },
  classSubtitle: {
    paddingTop: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  btnStyle: {
    flexDirection: "row",
    backgroundColor: "#FCF7F8",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 5,
    width: 200,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shadowBox: {
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 10,

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,

    // Android Shadow
    elevation: 5,
  },
});

export default styles;
