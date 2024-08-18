import { Text, View,Button } from "react-native";
import {useRouter} from "expo-router";
import services from "@/utils/services";
import { useEffect } from "react";
import { supabase } from "@/utils/SupaBaseConfig";
import Header from "@/components/Header";
import colors from "@/utils/colors";
export default function Home() {

  const router=useRouter()

  useEffect(()=>{
    checkUserAuth();
  },[])
  const checkUserAuth= async ()=>{
    const result=await services.getData('login');
    console.log("Result",result)
    // if(result!=='true'){
    //   router.push('/login')
  
    // }

  }

  const getCategoryList=async()=>{
    
    const{ data,error } = await supabase.from("Category").select("*");
    console.log("data",data)
          
  }
  return (
    <View
      style={{
        padding:20,
        marginTop:20,
        backgroundColor:colors.PRIMARY,
        height:150
      }}
    >
      <Header/>
    </View>
  );
}
