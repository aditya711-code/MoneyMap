import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/utils/SupaBaseConfig';
import Ionicons from "@expo/vector-icons/Ionicons";
import CategoryInfo from '@/components/CategoryDetails/CategoryInfo';

export interface CategoryData {
  color: string;
  icon: string;
  name: string;
  categoryItems?: { length: number }[];
}

export default function CategoryDetails() {
    const {categoryId}=useLocalSearchParams();
    const [categoryData, setCategoryData] = useState<CategoryData | undefined>(
      undefined
    );
    useEffect(()=>{
        console.log("categoryid",categoryId)
        categoryId&&getCategoryDetails()
    },[categoryId])
  
    const getCategoryDetails=async()=>{
      const {data,error}=await supabase.from('Category').select('*,CategoryItems(*)').eq('id',categoryId)
      console.log("cat",data)
      data && setCategoryData(data[0])
     
    }
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Ionicons name='arrow-back-circle' size={24} color='black' />
      {categoryData ? (
        <CategoryInfo categoryData={categoryData} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

