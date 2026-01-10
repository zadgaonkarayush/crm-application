import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  container: {
    padding: 16,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },

  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },

  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 10,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },

  filterBtnActive: {
    backgroundColor: "#0066FF",
  },

  filterText: {
    color: "#555",
    fontWeight: "500",
  },

  filterTextActive: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardLeft: {
    width: "70%",
  },

  orderId: {
    fontSize: 17,
    fontWeight: "700",
    color: "#000",
  },

  client: {
    fontSize: 15,
    color: "#555",
    marginTop: 2,
  },

  date: {
    fontSize: 14,
    color: "#808080",
    marginTop: 6,
  },

  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },

  shipped: {
    backgroundColor: "#C8F7D8",
  },

  pending: {
    backgroundColor: "#FAD4A1",
  },

  draft: {
    backgroundColor: "#DCE1EB",
  },

  statusText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },

  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0066FF",
  },

  floatingBtn: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#0066FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  
});
