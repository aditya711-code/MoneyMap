import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import colors from "@/utils/colors";

import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { supabase } from "@/utils/SupaBaseConfig";
import { Alert } from "react-native";
const SignupScreen = () => {
  const navigation = useNavigation();
  const [secureEntery, setSecureEntery] = useState(true);
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const router=useRouter();

  const handleGoBack = () => {
    router.replace('/')
  };

  const handleLogin = () => {
    router.replace('/login')
  };
  
  const handleSignUp= async()=>{
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    router.replace('/login')
    
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={colors.PRIMARY}
          size={25}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get</Text>
        <Text style={styles.headingText}>started</Text>
      </View>
      {/* form  */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.DARKGREY} />
          <TextInput
            style={styles.textInput}
            placeholder='Enter your email'
            placeholderTextColor={colors.DARKGREY}
            keyboardType='email-address'
            onChangeText={(v)=>setEmail(v)}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.DARKGREY} />
          <TextInput
            style={styles.textInput}
            placeholder='Enter your password'
            placeholderTextColor={colors.DARKGREY}
            secureTextEntry={secureEntery}
            onChangeText={(v)=>setPassword(v)}
          />
          <TouchableOpacity
            onPress={() => {
              setSecureEntery((prev) => !prev);
            }}
          >
            <SimpleLineIcons name={"eye"} size={20} color={colors.DARKGREY} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"screen-smartphone"}
            size={30}
            color={colors.DARKGREY}
          />
          <TextInput
            style={styles.textInput}
            placeholder='Enter your phone no'
            placeholderTextColor={colors.DARKGREY}
            secureTextEntry={secureEntery}
            keyboardType='phone-pad'
          />
        </View>

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignUp}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account!</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.signupText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.GREY,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.PRIMARY,
    fontFamily: 'outfit-medium',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.DARKGREY,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    padding:10,
    fontFamily: 'outfit',
    fontSize:18
  },
  forgotPasswordText: {
    textAlign: "right",
    color: colors.PRIMARY,
    fontFamily: 'outfit-medium',
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.WHITE
,
    fontSize: 20,
    fontFamily: 'outfit-medium',
    textAlign: "center",
    padding: 10,
  },
  continueText: {
    textAlign: "center",
    marginVertical: 20,
    fontSize: 14,
    fontFamily: 'outfit',
    color: colors.PRIMARY,
  },
  googleButtonContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.PRIMARY,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 20,
    width: 20,
  },
  googleText: {
    fontSize: 20,
    fontFamily: 'outfit-medium',
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.PRIMARY,
    fontFamily: 'outfit',
  },
  signupText: {
    color: colors.PRIMARY,
    fontFamily: 'outfit-bold',
  },
});
