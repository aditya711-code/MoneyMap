import { View, Text ,StyleSheet,Animated} from 'react-native'
import  { useState } from 'react'
import PieChart from 'react-native-pie-chart'
import colors from '@/utils/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { CategoryType } from '@/app/(tabs)';
import { useEffect } from 'react';
interface CategoryListProps {
  categoryList: CategoryType[] | undefined;
}
export default function CircularChart({categoryList}:CategoryListProps) {
    const widthAndHeight = 150;
    const[values,setValues]=useState([1]);
    const[ sliceColor,setSliceColor] = useState([colors.GREY]);
    const[totalExpenses,setTotalExpenses]=useState(0);
    
     useEffect(() => {
       categoryList&&updateCircularChart();
     }, [categoryList]);

    const updateCircularChart=()=>{
      let totalEstimates=0;
      let otherTotalCost=0;
      let updatedSliceColor = [];
      let updatedValues = [];
      categoryList?.forEach((item,index)=>{
         if(index<4){
          let itemTotalCost = 0;
          item.CategoryItems.forEach((item_)=>{
            itemTotalCost=itemTotalCost+item_.cost;
            totalEstimates=totalEstimates+item_.cost;
          })
          updatedSliceColor.push(colors.COLOR_LIST[index])
         updatedValues.push(itemTotalCost)
          }else{
             item.CategoryItems.forEach((item_)=>{
              otherTotalCost=otherTotalCost+item_.cost;
              totalEstimates=totalEstimates+item_.cost;
            })
          }
      })
      if (otherTotalCost > 0) {
        updatedSliceColor.push(colors.COLOR_LIST[4]);
        updatedValues.push(otherTotalCost);
      }

       if (totalEstimates === 0) {
         updatedSliceColor = [colors.GREY];
         updatedValues = [1]; // Dummy value to avoid the error.
       }

      setSliceColor(updatedSliceColor);
      setValues(updatedValues);
      setTotalExpenses(totalEstimates);
      setTotalExpenses(totalEstimates)
    }

   
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontFamily: "outfit-bold" }}>
        Total Expense: <Text style={{ fontFamily: "outfit-bold" }}>₹{totalExpenses}</Text>
      </Text>
      <View style={styles.subContainer}>
        {sliceColor?.length>0 && values?.length>0 &&
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          coverRadius={0.65}
          coverFill={"#FFF"}
        />
        }
        {categoryList?.length == 0 ? (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name='checkbox-blank-circle'
              size={24}
              color={colors.GREY}
            />
            <Text>NA</Text>
          </View>
        ) : (
          <View>
            {categoryList?.map((category, index) => index<=4 &&  (
              <View key={index} style={styles.chartNameContainer}>
                <MaterialCommunityIcons
                  name='checkbox-blank-circle'
                  size={24}
                  color={colors.COLOR_LIST[index]}
                />
                <Text>{index<4?category.name:'OTHER'}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 15,
    padding: 20,
    elevation: 1,
  },
  subContainer: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  chartNameContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
