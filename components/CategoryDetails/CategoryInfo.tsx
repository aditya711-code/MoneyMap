import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Ionicons from "@expo/vector-icons/Ionicons";
import { CategoryData } from '@/app/category-details';
interface CategoryInfoProps {
  categoryData: CategoryData | undefined;
}
export default function CategoryInfo({ categoryData }: CategoryInfoProps) {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.iconContainer}>
        <Text
          style={[styles.textIcon, { backgroundColor: categoryData?.color }]}
        >
          {categoryData?.icon}
        </Text>
      </View>
      <View>
        <Text>{categoryData?.name}</Text>
        <Text>{categoryData?.categoryItems?.length} Item</Text>
      </View>
      <Ionicons name='trash' size={24} color='black' />
    </View>
  );
}
const styles = StyleSheet.create({
  textIcon: {
    fontSize: 25,
    padding:20,
    borderRadius:15
  },
  iconContainer:{
    justifyContent:'center',
    alignItems:'baseline'
  }
});