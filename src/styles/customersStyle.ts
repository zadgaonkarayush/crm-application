import { StyleSheet, Platform } from "react-native";

const customerStyle = StyleSheet.create({
  filterRow: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    padding: 6,
    borderRadius: 18,
    marginBottom: 18,
  },

  filterBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 14,
  },

  filterBtnActive: {
    backgroundColor: "#2563EB",
  },

  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },

  filterTextActive: {
    color: "#fff",
  },

  /* CUSTOMER CARD */
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 14,
    borderRadius: 18,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
    backgroundColor: "#E5E7EB",
  },

  cardInfo: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  company: {
    fontSize: 13,
    color: "#475569",
    marginTop: 2,
  },

  details: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },
});

export default customerStyle;
