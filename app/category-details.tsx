import { View, Text, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/utils/SupaBaseConfig';
import Ionicons from "@expo/vector-icons/Ionicons";
import CategoryInfo from '@/components/CategoryDetails/CategoryInfo';
import { useRouter } from "expo-router";

export interface CategoryData {
  assigned_budget:number,
  color: string;
  icon: string;
  name: string;
  CategoryItems: any[];
}

export default function CategoryDetails() {
  const router = useRouter();
    const {categoryId}=useLocalSearchParams();
    const [categoryData, setCategoryData] = useState<CategoryData | undefined>(
      undefined
    );
    useEffect(()=>{
        categoryId&&getCategoryDetails()
    },[categoryId])
    
    const moveBackToHome=()=>{
      router.push("/");
    }
    const getCategoryDetails=async()=>{
      const {data,error}=await supabase.from('Category').select('*,CategoryItems(*)').eq('id',categoryId)
      data && setCategoryData(data[0])
     
    }
  return (
    <View style={{ padding: 20, marginTop: 20 }}>
        <Ionicons
          name='arrow-back-sharp'
          size={24}
          color='black'
          onPress={() => moveBackToHome()}
        />

      {categoryData ? (
        <CategoryInfo categoryData={categoryData} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

