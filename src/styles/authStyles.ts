// import { StyleSheet } from "react-native";

//  const authStyles = StyleSheet.create({
//     safe:{
//         flex:1,
//          backgroundColor: "#F5F7FB",
//     },
//     scroll:{
//     flexGrow:1,
//      justifyContent:'center',
//     paddingHorizontal:25,
//      paddingBottom: 40,
//     },
//     container:{
//  width:'100%'
//     },
//     logoBox:{
//        alignItems:'center',
//        marginBottom:25
//     },
//     logo:{
//          width:90,
//          height:90,
//          borderRadius:30
//     },
//     title:{
//         fontSize: 32,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 30,
//     },
//     labe:{
//          fontSize: 15,
//     marginBottom: 6,
//     fontWeight: "500",
//     },
//     inputBox:{
//          height: 55,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     paddingHorizontal: 18,
//     borderWidth: 1,
//     borderColor: "#E2E6EB",
//     justifyContent: "center",
//     marginBottom: 18,
//     },
//      input: {
//     fontSize: 16,
//     width: "100%",
//   },
//   forgotButton:{
//     alignSelf:'flex-end',
//     marginBottom:20
//   },
//   forgotText:{
//     color: "#0A66FF", 
//     fontSize: 15
//   },
//   primaryBtn:{
//     backgroundColor: "#0232FF",
//     height:55,
//     borderRadius:14,
//     justifyContent:'center',
//     alignItems:'center',
//     marginTop:10
//   },
//   primaryBtnText:{
// color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",    
//   },
//   footerRow:{
//     flexDirection:'row',
//     justifyContent:'center',
//     marginTop:25
//   },
//   footerText: { color: "#666", fontSize: 15 },
//   footerLink: { color: "#0A66FF", fontWeight: "700" },
//    pickerWrapper: {
//     height: 55,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#E2E6EB",
//     marginBottom: 18,
//     justifyContent: "center",
//   },

//   picker: { height: 55, width: "100%" },
//   errorInput: { borderColor: "red" },
//   errorText: { color: "red", marginBottom: 10, marginLeft: 4 },
// })
// export default authStyles;
import { StyleSheet } from "react-native";

const authStyles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  logoBox: {
    alignItems: "center",
    marginBottom: 16,
  },

  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    color: "#111",
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  inputBox: {
    height: 52,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#111",
  },

  primaryBtn: {
    backgroundColor: "#377DFF",
    height: 54,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  primaryBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  errorText: {
    color: "#E11D48",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default authStyles;
