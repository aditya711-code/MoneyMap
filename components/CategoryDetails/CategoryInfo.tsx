import { View, Text,StyleSheet, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { CategoryData } from '@/app/category-details';
import colors from '@/utils/colors';
import { useState,useEffect} from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/utils/SupaBaseConfig';
interface CategoryInfoProps {
  categoryData: CategoryData | undefined;
}
export default function CategoryInfo({ categoryData }: CategoryInfoProps) {
 
  const[totalCost,setTotalCost]=useState<number|undefined>();
  const[percTotal,setPercTotal]=useState<number|undefined>();
  const router=useRouter();
  
  const onDeleteCategory=async()=>{
    Alert.alert('Are you sure','Do you really want to delete',[
      {
      text:'Cancel',
      style:'cancel'
      },
      {
        text:'Yes',
        style:'destructive',
        onPress:async()=>{
          //delete categoryItems
           const{error:deleteCategoryItem}=await supabase.from('CategoryItems').delete().eq('category_id',categoryData?.id);

           const{error:deleteCategory}=await supabase.from('Category').delete().eq('id',categoryData?.id);
          ToastAndroid.show('Category Deleted',ToastAndroid.SHORT)
           router.replace('/(tabs)')
        }
      }
  ])
  }
  useEffect(()=>{
    calculateTotalPercentage();
  },[categoryData])
   const calculateTotalPercentage=()=>{
    let total=0;
    categoryData?.CategoryItems?.forEach(items=>{
      total=total+items.cost;
    })
    setTotalCost(total);
    let perc=(total/(categoryData?.assigned_budget??1))*100;
    if(perc>100){
      perc=100;
    } 
    setPercTotal(perc);
   }
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Text
            style={[styles.textIcon, { backgroundColor: categoryData?.color }]}
          >
            {categoryData?.icon}
          </Text>
        </View>
        <View style={{ flex: 1, marginLeft: 20 }}>
          <Text style={styles.categoryName}>{categoryData?.name}</Text>
          <Text style={styles.categoryItemText}>
            {categoryData?.CategoryItems?.length ?? 0} Item
          </Text>
        </View>
        <TouchableOpacity onPress={()=>onDeleteCategory()}>
          <Ionicons name='trash' size={24} color='red' />
        </TouchableOpacity>
      </View>
      <View style={styles.amountContainer}>
        <Text style={{ fontFamily: "outift-bold" }}>${totalCost}</Text>
        <Text style={{ fontFamily: "outift" }}>
          Total Budget:${categoryData?.assigned_budget}
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarSubContainer,
            { width: percTotal !== undefined ? `${percTotal}%` : "0%" },
          ]}
        ></View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    marginTop:20,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  textIcon: {
    fontSize: 25,
    padding:20,
    borderRadius:15
  },
  iconContainer:{
    justifyContent:'center',
    alignItems:'baseline'
  },
  categoryName:{
    fontFamily:'outfit-bold',
    fontSize:24
  },
  categoryItemText:{
    fontFamily:'outfit',
    fontSize:18

  },
  amountContainer:{
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop:10
  },
  progressBarContainer:{
    width:'100%',
    height:15,
    backgroundColor:colors.GREY,
    borderRadius:99,
    marginTop:7
  },
  progressBarSubContainer:{
    borderRadius:99,
    height:15,
    backgroundColor:colors.PRIMARY
  }
});