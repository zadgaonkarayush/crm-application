import { StyleSheet } from "react-native";

const detailStyle = StyleSheet.create({
    header:{
     flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:60,
      backgroundColor:'white',
      elevation:3,
      paddingHorizontal:20
    },
    title:{
        fontSize:21,
        fontWeight:'600'
    },
    profileCard:{
        paddingVertical:30,
        width:'92%',
        backgroundColor:'white',
         alignSelf:'center',
         elevation:3,
         marginTop:15,
         borderRadius:20,
         paddingHorizontal:22,
    },
    nameBox:{

    },
    name:{
      fontSize:27,
      fontWeight:'700'
    },
    subName:{
        fontSize:16,
        color:'gray',
        fontWeight:'500',
        marginTop:3
    },
    contactBox:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        marginTop:18,
    },
     contactText: {
    fontSize: 16,
    color: "#333",
  },
  tabRow:{
 flexDirection:'row',
 justifyContent:'space-around',
 marginTop:25,
 backgroundColor:'transparent'
  },
  tabBox:{
  alignItems:'center'
  },
  tabText:{
    fontSize: 17,
    color: "gray",
  },
  activeTebText:{
   color: "#1E5EF3",
    fontWeight: "600",
  },
  tabUnderline:{
  height:3,
  width:50,
   backgroundColor: "#1E5EF3",
    marginTop: 6,
    borderRadius: 50,
  },
   orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    width: "92%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 14,
    elevation: 2,
    marginTop: 18,
  },
  orderLeft: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  orderIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: "#E8EEFF",
    justifyContent: "center",
    alignItems: "center",
  },
  orderId: {
    fontSize: 17,
    fontWeight: "700",
  },
  orderDate: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
  },

  orderRight: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 6,
  },
  edit:{
     width: 38,
    height: 38,
    borderRadius: 50,
    backgroundColor: "#E8EEFF",
    justifyContent: "center",
    alignItems: "center",
  }
})
export default detailStyle