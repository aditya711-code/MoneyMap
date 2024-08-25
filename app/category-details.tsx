import { View, Text, TouchableOpacity,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '@/utils/SupaBaseConfig';
import Ionicons from "@expo/vector-icons/Ionicons";
import CategoryInfo from '@/components/CategoryDetails/CategoryInfo';
import CategoryItemList from '@/components/CategoryDetails/CategoryItemList';
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import colors from '@/utils/colors';
import { Link } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native';
export interface CategoryData {
  id:number
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
  
    const getCategoryDetails=async()=>{
      const {data,error}=await supabase.from('Category').select('*,CategoryItems(*)').eq('id',categoryId)
      data && setCategoryData(data[0])
     
    }
  return (
    <View style={{ padding: 20, marginTop: 20, flex: 1 }}>
      {categoryData ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
            <Ionicons name='arrow-back-sharp' size={24} color='black' />
          </TouchableOpacity>
          <CategoryInfo categoryData={categoryData} />
          <CategoryItemList
            categoryData={categoryData}
            setUpdateRecord={() => getCategoryDetails()}
          />
        </ScrollView>
      ) : (
        <ActivityIndicator
          color={colors.PRIMARY}
          size={54}
          style={styles.loading}
        />
      )}
      <Link
        href={{
          pathname: "/add-new-category-item",
          params: { categoryId },
        }}
        style={styles.floatingButton}
      >
        <Entypo name='circle-with-plus' size={60} color={colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

