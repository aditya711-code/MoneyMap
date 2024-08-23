import { View, Text ,StyleSheet,Animated} from 'react-native'
import React, { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import colors from '@/utils/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
export default function CircularChart() {
    const widthAndHeight = 150;
    const[values,setValues]=useState([1]);
    const[ sliceColor,setSliceColor] = useState([colors.GREY]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18,fontFamily:'outfit-bold' }}>
        Total Expense: <Text style={{ fontFamily:'outfit-bold' }}>$0</Text>
      </Text>
      <View style={styles.subContainer}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        <View style={{display:'flex',flexDirection:'row',gap:5,alignItems:'center'}}>
          <MaterialCommunityIcons
            name='checkbox-blank-circle'
            size={24}
            color={colors.GREY}
          />
          <Text>NA</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop:20,
    backgroundColor:colors.WHITE,
    borderRadius:15,
    padding:20,
    elevation:1
  },
  subContainer:{
    marginTop:10,
    display:'flex',
    flexDirection:'row',
    gap:20
  }
})
