import { Stack } from "expo-router";
import { useFonts } from "expo-font";
export default function RootLayout() {

 
  const [fontLoaded, fontError] = useFonts({
    "outfit": require("@/assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='add-new-category'
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Add New Category",
        }}
      />
      <Stack.Screen name='add-new-category-item'
      options={{presentation:'modal',headerShown:true,title:'Add New Item'}}/>
   
    </Stack>
  );
}
