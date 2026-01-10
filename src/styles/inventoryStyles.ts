import { StyleSheet } from "react-native";

const inventoryStyle= StyleSheet.create({
    container:{
  flex: 1,
    backgroundColor: "#F5F5F7",
    paddingHorizontal: 16,
    },
    header:{
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginTop:30,
  marginBottom:10
    },
    title:{
   fontSize: 25,
    fontWeight: "600",
    color: "#1A1A1A",
    },
    addButton:{
     backgroundColor: "#0A84FF",
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    },
    searchBox:{
    flexDirection:'row',
    backgroundColor:'#fff',
    alignItems:'center',
    padding:5,
    borderRadius:12,
    borderWidth:1,
     borderColor: "#E0E0E0",
    },
    input:{
      flex: 1,
    fontSize: 16,
    },
    filterRow:{
     flexDirection:'row',
     gap:10
    },
    filterBtn:{
      backgroundColor: "#fff",
       borderColor: "#E0E0E0",
       paddingHorizontal:18,
       paddingVertical:10,
       borderRadius:25,
       borderWidth:1,
       elevation:2,
    },
    filterBtnActive:{
       backgroundColor: "#0A84FF",
    },
     filterText: {
    fontSize: 14,
    color: "#444",
  },

  filterTextActive: {
    color: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'flex-start'
  },

  productName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222",
    maxWidth: "70%",
    flexShrink:1,
    flexWrap:'wrap'
  },

  skuText: {
    color: "#777",
    marginTop: 4,
  },

  priceText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },

  stockBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  inStock: {
    backgroundColor: "#C8F7D8",
  },

  lowStock: {
    backgroundColor: "#FAD4D4",
  },

  stockText: {
    fontSize: 13,
  },

  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  actionBtn: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#EAF2FF",
    borderRadius: 10,
  },

  actionText: {
    color: "#0A84FF",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
  },
})
export default inventoryStyle;