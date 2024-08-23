import { View, Text,StyleSheet ,TouchableOpacity} from 'react-native'
import React from 'react'
import { CategoryType } from '@/app/(tabs)'
import colors from '@/utils/colors';
import { useRouter } from 'expo-router';
interface CategoryListProps {
  categoryList: CategoryType[] | undefined;
}
const CategoryList: React.FC<CategoryListProps> = ({ categoryList }) => {
  const router=useRouter();
  const onCategoryClick=(category:CategoryType)=>{
    router.push({
      pathname:'/category-details',
      params:{
        categoryId:category.id,
      }
  })
  }
  return (
    <View style={{ marginTop: 25 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Lates Money Expenses:
      </Text>
      <View>
        {categoryList?.map((category, index) => (
          <TouchableOpacity key={index} style={styles.container} onPress={()=>onCategoryClick(category)}>
            <View style={styles.iconContainer}>
              <Text
                style={[styles.iconText, { backgroundColor: category.color }]}
              >
                {category.icon}
              </Text>
            </View>
            <View style={styles.subContainer}>
              <View>
                <Text style={styles.categoryText}>{category.name}</Text>
                <Text style={styles.itemCount}>
                  {category.CategoryItems?.length} Items
                </Text>
              </View>
              <View>
                <Text style={styles.totalAmountText}>$500</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles=StyleSheet.create({
  container:{
    marginBottom:10,
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    backgroundColor:colors.WHITE,
    padding:10,
    borderRadius:15
  },
  iconContainer:{
    justifyContent:'center',
    alignItems:'baseline'
  },
  iconText:{
    fontSize:25,
    padding:15,
    borderRadius:15
  },
  categoryText:{
    fontFamily:'outfit-bold',
    fontSize:20
  },
  itemCount:{
    fontFamily:'outfit'
  },
  subContainer:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:'70%',

  },
  totalAmountText:{
    fontFamily:'outfit-bold',
    fontSize:16
  }
})
export default CategoryList;