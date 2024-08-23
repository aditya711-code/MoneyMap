import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Image } from 'react-native';
import colors from '@/utils/colors';
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Header() {
    
    const[user,setUser]=useState("");

    useEffect(()=>{
        getUserData()
    },[])
    const getUserData=async()=>{
      setUser('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1723967751~exp=1723971351~hmac=ff25064d71be5ac6149c1ae7b58c1ef250ac550633105baee4c2a15f5216fa65&w=740');
    }
    
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 99,
        }}
        source={require("@/assets/images/profile.jpg")}
      />
      <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between', width:'85%'}} >
        <View>
          <Text style={{ color: colors.WHITE, fontSize: 17,fontFamily:'outfit' }}>Welcome</Text>
          <Text
            style={{ color: colors.WHITE, fontSize: 20, fontFamily:'outfit-bold' }}
          >
            Aditya Mane
          </Text>
        </View>
        <Ionicons name='notifications' size={24} color='white' style={{flex:-1}}/>
      </View>
    </View>
  );
}