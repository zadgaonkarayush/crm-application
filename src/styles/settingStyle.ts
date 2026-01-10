import { StyleSheet } from "react-native";

const settingStyle=StyleSheet.create({
avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 25,
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 12,
  },

  role: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 25,
  },

  /* CONTACT CARD */
  contactCard: {
    width: "90%",
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 18,
    paddingVertical: 15,
    marginBottom: 35,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  divider: {
    height: 1.2,
    backgroundColor: "#E3E3E3",
    width: "100%",
  },

  rowText: {
    fontSize: 16,
    color: "#333",
  },

  /* BUTTONS */
  primaryBtn: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 12,
    backgroundColor: "#1E5EF3",
    borderRadius: 10,
    marginBottom: 14,
  },

  primaryText: {
    textAlign: "center",
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },

  secondaryBtn: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 12,
    backgroundColor: "#b5b7b9ff",
    borderRadius: 10,
    marginBottom: 40,
  },

  secondaryText: {
    textAlign: "center",
    color: "#222",
    fontSize: 17,
    fontWeight: "600",
  },

  logoutBtn: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 14,
    backgroundColor: "#D9353E",
    borderRadius: 12,
  },

  logoutText: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
})
export default settingStyle