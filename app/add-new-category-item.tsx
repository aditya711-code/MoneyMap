import { View, Text,Image,StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ToastAndroid, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import colors from '@/utils/colors';
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { supabase } from '@/utils/SupaBaseConfig';
import { decode } from "base64-arraybuffer";
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
export default function AddNewCategoryItem() {

    const router=useRouter();
    const{categoryId}=useLocalSearchParams();
    const [image, setImage] = useState<string | undefined>();
    const [previewImage, setPreviewImage] = useState(
      "https://pyestzeenlmflfpjvegx.supabase.co/storage/v1/object/public/images/images.png"
    );
    const[name,setName]=useState();
    const[cost,setCost]=useState();
    const[url,setUrl]=useState();
    const[note,setNote]=useState();
    const[loading,setLoading]=useState(false);

    const onImageSelect=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          base64:true
        });


        if (
          !result.canceled &&
          result.assets &&
          result.assets[0].uri &&
          result.assets[0].base64
        ) {
          setPreviewImage(result.assets[0].uri);
          setImage(result.assets[0].base64);
        }
    }

    const onClickAdd=async()=>{
       setLoading(true);
      let fileUrl=previewImage
        if(image!=undefined){
          const fileName=Date.now();
          const { data:uploadData, error:uploadingror } = await supabase.storage
            .from("images")
            .upload(fileName+".png", decode(image), {
              contentType: "image/png",
            });

            console.log('File Upload',uploadData)
            if(uploadData){
              fileUrl =
                "https://pyestzeenlmflfpjvegx.supabase.co/storage/v1/object/public/images/"+fileName+".png";
                console.log("fileUrl",fileUrl)
            }
          }
         
            const { data, error } = await supabase
              .from('CategoryItems')
              .insert([
                { name:name, cost: cost,image:fileUrl,note:note,url:url,category_id:categoryId },
              ])
              .select()
              ToastAndroid.show("New Item Added !!",ToastAndroid.SHORT)
              console.log("data-item",data)
              setLoading(false)
               router.replace({
                 pathname: "/category-details",
                 params: {
                   categoryId: categoryId,
                 },
               });
            
            
    }
  return (
    <KeyboardAvoidingView>
      {loading && (
        <ActivityIndicator
          color={colors.PRIMARY}
          size={54}
          style={styles.loading}
        />
      )}
      <ScrollView style={{ padding: 20 ,opacity:loading?0.3:1}}>
        <TouchableOpacity onPress={() => onImageSelect()}>
          <Image source={{ uri: previewImage }} style={styles.image} />
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <AntDesign name='tag' size={24} color={colors.GREY} />
          <TextInput
            placeholder=' Item Name'
            style={styles.input}
            onChangeText={(v: any) => setName(v)}
          ></TextInput>
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome
            name='dollar'
            size={24}
            color={colors.GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder='Cost'
            style={styles.input}
            onChangeText={(v: any) => setCost(v)}
            keyboardType='numeric'
          />
        </View>
        <View style={styles.textInputContainer}>
          <AntDesign name='link' size={24} color={colors.GREY} />
          <TextInput
            placeholder=' URL'
            style={styles.input}
            onChangeText={(v: any) => setUrl(v)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <FontAwesome name='pencil' size={24} color={colors.GREY} />
          <TextInput
            placeholder=' Note'
            style={styles.input}
            numberOfLines={3}
            onChangeText={(v: any) => setNote(v)}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={!name || !cost || loading}
          onPress={() => onClickAdd()}
        >
          <Text
            style={{
              color: colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: colors.DARKGREY,
  },
  textInputContainer: {
    padding: 10,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderRadius: 10,
    borderColor: colors.DARKGREY,
    marginTop: 10,
  },
  input: {
    fontSize: 18,
    width: "100%",
  },
  button: {
    padding: 15,
    backgroundColor: colors.PRIMARY,
    borderRadius: 99,
    marginTop: 25,
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
