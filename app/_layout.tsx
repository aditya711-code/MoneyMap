import { Stack, useSegments,useRouter } from "expo-router";
import { useFonts } from "expo-font";
import { supabase } from "@/utils/SupaBaseConfig";
import { Session } from "@supabase/supabase-js";
import { useState,useEffect } from "react";

export default function RootLayout() {

  const [session, setSession] = useState<Session | null>(null);
  const segments = useSegments();
  const router = useRouter();
  const [fontLoaded, fontError] = useFonts({
    "outfit": require("@/assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("@/assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("@/assets/fonts/Outfit-Bold.ttf"),
  });

   useEffect(() => {
     // Get session on component mount
     supabase.auth.getSession().then(({ data: { session } }) => {
       setSession(session);
     });

     // Listen for changes to authentication state
     supabase.auth.onAuthStateChange((_event, session) => {
       setSession(session);
     });
   }, []);

   useEffect(() => {
     // Redirect to the main app if a user is logged in and trying to access login/signup
     if (session) {
       if (segments[0] === "login" || segments[0] === "signup") {
         router.replace("/(tabs)");
       }
     } else {
       // Redirect to login if the user is not logged in and trying to access protected screens
       if (segments[0] !== "login" && segments[0] !== "signup") {
         router.replace("/");
       }
     }
   }, [session, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='login' options={{ headerShown: true }} />
      <Stack.Screen name='signup' options={{ headerShown: true }} />
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen
        name='add-new-category'
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Add New Category",
        }}
      />
      <Stack.Screen
        name='add-new-category-item'
        options={{
          presentation: "modal",
          headerShown: true,
          title: "Add New Item",
        }}
      />
    </Stack>
  );
}
