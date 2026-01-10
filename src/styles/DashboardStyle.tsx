import { StyleSheet } from "react-native";

const dashboardStyles = StyleSheet.create({
    container:{
         flex: 1,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom:2
    },
header:{
 flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
},
heeaderTitle:{
fontSize: 28,
    fontWeight: "bold",
},
headerIcons:{
flexDirection: "row",
},
card:{
 backgroundColor: "#fff",
 padding:18,
 borderRadius:20,
 flexDirection:"row",
 alignItems:'center',
 marginTop:15,
 elevation:3
},
iconCircle:{
width:55,
height:55,
borderRadius:40,
 backgroundColor: "#E0EAFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
},
cardTitle: { fontSize: 16, color: "#555" },
  cardValue: { fontSize: 22, fontWeight: "bold", marginTop: 3 },
section:{
backgroundColor: "#fff",
padding:18,
borderRadius:20,
marginTop:20
},
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
chartRow:{
flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
},
chartItem:{
alignItems:'center'
},
bar:{
width:25,
    backgroundColor: "#2563EB",
    borderRadius: 8,
},
  chartLabel: { marginTop: 8, color: "#555" },
pieContainer:{ flexDirection:'row',alignItems:'center'},
circleOuter:{
    width:140,
    height:140,
    borderRadius:80,
    borderWidth:14,
     borderColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    borderLeftColor: "#FACC15",
    borderBottomColor: "#34D399",
},
circleInner:{
     width: 85,
    height: 85,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
},
 pieValue: { fontSize: 22, fontWeight: "bold" },
  pieUnit: { color: "#777" },
  legendItem:{ flexDirection:'row',alignItems:'center',marginBottom:10},
  legendDot:{width:14,height:14,borderRadius:7,marginRight:10},
  legend:{marginLeft:20},
  sectionHeaderRow:{
    marginBottom:20,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  link:{color: "#2563EB", fontWeight: "600"},
 orderCard:{
    backgroundColor: "#fff",
    padding:16,
    borderRadius:18,
    flexDirection:'row',
    alignItems:'center',
    marginBottom:24,
 },
 iconCircleSm:{
    width:45,
    height:45,
    borderRadius:16,
        backgroundColor: "#E0EAFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
 },
   orderId: { fontWeight: "bold", fontSize: 16 },
  orderCompany: { color: "#555", marginTop: 3 },
  statusBox: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: { fontWeight: "600" },
})
export default dashboardStyles;