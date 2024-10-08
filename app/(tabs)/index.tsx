import { Text, View,Button,StyleSheet,ScrollView, RefreshControl} from "react-native";
import {useRouter} from "expo-router";
import services from "@/utils/services";
import { useEffect ,useState} from "react";
import { supabase } from "@/utils/SupaBaseConfig";
import Header from "@/components/Header";
import colors from "@/utils/colors";
import CircularChart from "@/components/CircularChart";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import CategoryList from "@/components/CategoryList";
import { Session } from "@supabase/supabase-js";
interface CategoryItems {
  id: string;
  name: string;
  cost: number;
  category_id:number,
  url:string,
  note:string,
  color:string
  // Add other properties if necessary
}
export interface CategoryType {
  assigned_budget: number;
  color: string;
  created_at: Date;
  created_by: string;
  icon: string;
  id: number;
  name: string;
  CategoryItems: CategoryItems[];
}
export default function Home() {

  const router=useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [categoryList, setCategoryList] = useState<CategoryType[] | undefined>(
    undefined
  );
  const[loading,setLoading]=useState(false);

   useEffect(() => {
     supabase.auth.getSession().then(({ data: { session } }) => {
       setSession(session);
     });

     supabase.auth.onAuthStateChange((_event, session) => {
       setSession(session);
     });
   }, []);
  useEffect(()=>{
   
    session && getCategoryList();
  },[session])
 

  const getCategoryList=async()=>{
    setLoading(true)
    console.log("session",session?.user.email)
    const{ data,error } = await supabase.from("Category").select("*,CategoryItems(*)").eq('created_by',session?.user.email);
    setCategoryList(data?? undefined)
    data && setLoading(false)
          
  }
  
  return (
    <View
      style={{
        marginTop: 20,
        flex: 1,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={()=>getCategoryList()} refreshing={loading}/>
        }
      >
        <View
          style={{
            padding: 20,
            marginTop: 20,
            backgroundColor: colors.PRIMARY,
            height: 150,
          }}
        >
          <Header />
        </View>
        <View style={{
          padding:20,
          marginTop:-75
        }}>
          <CircularChart categoryList={categoryList} />
          <CategoryList categoryList={categoryList} />
        </View>
      </ScrollView>
      <Link href='/add-new-category' style={styles.adBtnContainer}>
        <Entypo name='circle-with-plus' size={64} color={colors.PRIMARY} />
      </Link>
    </View>
  );
}

const styles=StyleSheet.create({
  text:{
    fontSize:20
  },
  adBtnContainer:{
    position:'absolute',
    bottom:16,
    right:16,
   
  }
})
