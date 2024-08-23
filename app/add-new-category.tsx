import { View, Text,TextInput,StyleSheet, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import colors from '@/utils/colors';
import ColorPicker from '@/components/ColorPicker';
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacity } from 'react-native';
import { supabase } from '@/utils/SupaBaseConfig';
export default function AddNewCategory() {

  const[selectedIcon,setSelectedIcon]=useState();
  const[selectedColor,setSelectedColor]=useState(colors.PRIMARY);
  const[categoryName,setSelectedCategoryName]=useState("");
  const[totalBudget,setTotalBudget]=useState(0);

  const onCreateCategory=async()=>{
    console.log("Entry",categoryName,totalBudget,selectedColor,selectedIcon);
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
      ToastAndroid.show("Category Created",ToastAndroid.SHORT)

      
    }
  }
  return (
    <View style={{ marginTop: 20, padding: 20 }}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[styles.iconInput, { backgroundColor: selectedColor }]}
          maxLength={2}
          onChangeText={(v:any)=>setSelectedIcon(v)}
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
          onChangeText={(v:any) => setTotalBudget(v)}
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
    alignItems:'center',
    marginTop:10,
  },
  button:{
    backgroundColor:colors.PRIMARY,
    padding:15,
    borderRadius:9,
    marginTop:10,

  
  }
});