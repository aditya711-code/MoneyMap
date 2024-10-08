import { View, Text,TextInput,StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import colors from '@/utils/colors';
import ColorPicker from '@/components/ColorPicker';
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native';
import { supabase } from '@/utils/SupaBaseConfig';
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
export default function AddNewCategory() {

  const[selectedIcon,setSelectedIcon]=useState();
  const[selectedColor,setSelectedColor]=useState(colors.PRIMARY);
  const[categoryName,setSelectedCategoryName]=useState("");
  const[totalBudget,setTotalBudget]=useState(0);
  const [loading, setLoading] = useState(false);
  const router=useRouter();

  const onCreateCategory=async()=>{
    setLoading(true);
    const {data,error}=await supabase.from('Category').
    insert([{
      name:categoryName,
      assigned_budget:totalBudget,
      icon:selectedIcon,
      color:selectedColor,
      created_by:'adityamane711@gmail.com'
    }]).select()
    console.log("data", data);
    if(data){
      router.replace({
        pathname:"/category-details",
        params:{
          categoryId:data[0].id
        }
      })
      ToastAndroid.show("Category Created",ToastAndroid.SHORT)
    }
    setLoading(false);
   
    
  }
  return (
    <View style={{ marginTop: 20, padding: 20 ,opacity:loading?0.3:1}}>
      {loading && (
        <ActivityIndicator
          color={colors.PRIMARY}
          size={54}
          style={styles.loading}
        />
      )}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(v: any) => setSelectedIcon(v)}
        >
          {selectedIcon}
        </TextInput>
        <ColorPicker
          selectedColor={selectedColor}
          setSelectedColor={(color) => setSelectedColor(color)}
        />
      </View>
      <View style={styles.inputView}>
        <AntDesign name='tag' size={24} color={colors.GREY} />
        <TextInput
          placeholder='Category Name'
          style={{ width: "100%", fontSize: 20, fontFamily: "outfit-medium" }}
          onChangeText={(v) => setSelectedCategoryName(v)}
        />
      </View>
      <View style={styles.inputView}>
        <MaterialIcons name='attach-money' size={24} color={colors.GREY} />
        <TextInput
          placeholder='Total Budget'
          style={{ width: "100%", fontSize: 20, fontFamily: "outfit-medium" }}
          keyboardType='numeric'
          onChangeText={(v: any) => setTotalBudget(v)}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onCreateCategory()}
        disabled={!categoryName || !totalBudget}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: colors.WHITE,
            fontFamily: "outfit-bold",
          }}
        >
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  iconInput: {
    fontSize: 30,
    textAlign: "center",
    padding: 15,
    borderRadius: 99,
    paddingHorizontal: 27,
    color: colors.WHITE,
  },
  inputView: {
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    padding: 14,
    borderRadius: 10,
    borderColor: "#808080",
    backgroundColor: colors.WHITE,
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: colors.PRIMARY,
    padding: 15,
    borderRadius: 9,
    marginTop: 10,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  }
});