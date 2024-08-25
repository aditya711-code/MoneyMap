import { View, Text,StyleSheet,TouchableOpacity, ToastAndroid, Linking } from 'react-native'
import React from 'react'
import { CategoryData } from "@/app/category-details";
import { Image } from 'react-native';
import colors from '@/utils/colors';
import { useState } from 'react';
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { supabase } from '@/utils/SupaBaseConfig';

interface CategoryInfoProps {
  categoryData: CategoryData | undefined;
  setUpdateRecord:()=>void
}
export default function CategoryItemList({categoryData,setUpdateRecord}:CategoryInfoProps) {

  const[expandItem,setExpandItem]=useState(0);
  
  const onDeleteItem=async (id:any)=>{
    const { error } = await supabase
      .from("CategoryItems")
      .delete()
      .eq("id", id);

      ToastAndroid.show("Item Deleted!!",ToastAndroid.SHORT)
      setUpdateRecord()    
  }

  const openURL=(url:string)=>{
    if(url){
    Linking.openURL(url)
    }
  }
  return (
    <View style={styles.Container}>
      <Text style={styles.heading}>Items List</Text>
      <View style={{ marginTop: 15 }}>
        {categoryData?.CategoryItems?.length ?? 0 > 0 ? (
          categoryData?.CategoryItems?.map((item, index) => (
            <>
              <TouchableOpacity onPress={() => setExpandItem(index)}>
                <View key={item.category_id} style={styles.itemContainer}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.url}>{item.note}</Text>
                  </View>
                  <Text style={styles.cost}>₹{item.cost}</Text>
                </View>
              </TouchableOpacity>
              {expandItem == index && (
                <View style={styles.actionItemContainer}>
                  <TouchableOpacity>
                    <EvilIcons name='pencil' size={34} color={colors.BLUE} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
                    <EvilIcons name='trash' size={34} color='red' />
                  </TouchableOpacity>
                  {item.url && 
                  <TouchableOpacity onPress={()=>openURL(item.url)}>
                    <EvilIcons
                      name='external-link'
                      size={34}
                      color={colors.PRIMARY}
                    />
                  </TouchableOpacity>
                  } 
                </View>
              )}
              {categoryData?.CategoryItems.length - 1 != index && (
                <View
                  style={{
                    borderWidth: 0.4,
                    marginTop: 10,
                    borderColor: colors.DARKGREY,
                  }}
                ></View>
              )}
            </>
          ))
        ) : (
          <Text style={styles.noItemText}>Items Not Found </Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 20,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:15
  },
  name: {
    fontSize: 20,
    fontFamily: "outfit-bold",
  },
  url: {
    fontSize: 16,
    fontFamily: "outfit",
    color: "#5A5A5A",
  },
  cost: {
    fontSize: 21,
    fontFamily: "outfit-bold",
  },
  noItemText:{
    fontFamily:'outfit-bold',
    fontSize:25,
    color:colors.DARKGREY,
  },
  actionItemContainer:{
    display:'flex',
    flexDirection:'row',
    gap:10,
    justifyContent:'flex-end'
  }
});
