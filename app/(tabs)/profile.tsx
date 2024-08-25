import { View, Text, TouchableOpacity } from 'react-native'
import { supabase } from '@/utils/SupaBaseConfig';
import colors from '@/utils/colors';
import { useRouter } from 'expo-router';
export default function profile() {
  const router=useRouter(); 
  const onLogOut=async()=>{
    const { error } = await supabase.auth.signOut();
    router.replace('/login')
  }
  return (
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:'50%'}}>
      <TouchableOpacity onPress={() => onLogOut()} style={{backgroundColor:colors.PRIMARY,borderRadius:99,padding:20,width:'40%'}}>
        <Text style={{textAlign:'center',fontSize:20,color:colors.WHITE,fontFamily:'outfit-bold'}}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}