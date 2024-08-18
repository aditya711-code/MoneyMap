import { View,Text ,Image,StyleSheet,TouchableOpacity} from "react-native";
import React from "react";
import colors from "@/utils/colors";
import { client } from "@/utils/KindeConfig";
import services from "@/utils/services";
import { useRouter } from "expo-router";

export default function LoginScreen(){
  const router = useRouter();
  const handleSignIn = async () => {
   
    // const token = await client.login();
    // if (token) {
    //   // User was authenticated
    //   await services.storeData('login','true');
    //   router.replace('/')
    // }
     router.replace("/");
    
  };
    return (
      <View style={{ display: "flex", alignItems: "center" }}>
        <Image
          source={require("@/assets/images/moneymap.png")}
          style={styles.bgImage}
        />
        <View
          style={styles.bgCard}
        >
          <Text
            style={{
              fontSize: 35,
              fontWeight: "bold",
              textAlign: "center",
              color: colors.WHITE,
            }}
          >
            MoneyMap
          </Text>
          <Text style={{fontSize:18,textAlign:'center',color:colors.WHITE,marginTop:20,opacity:0.8}}>Mapping the Way to Smarter Spending</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={{color:colors.PRIMARY,textAlign:'center'}}>Login/SignUp</Text>
          </TouchableOpacity>
          <Text style={{fontSize:13,color:colors.GREY,marginTop:10}}>*By login/signup you will agree to our terms and conditions</Text>
        </View>
      </View>
    );
}

const styles=StyleSheet.create({
    bgImage:{
        width:200,
        height:400,
        marginTop:30,
        
    },
    bgCard:{
         backgroundColor: colors.PRIMARY,
            width: "100%",
            height: "100%",
            padding: 20,
            marginTop: -30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
    },
    button:{
        backgroundColor:colors.WHITE,
        padding:15,
        borderRadius:99,
        marginTop:40,
    }
})