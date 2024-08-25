import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import colors from "@/utils/colors";
import { useRouter } from "expo-router";
export default function WelcomeScren() {
  const router = useRouter();
   
  const handleSignIn = async () => {
    router.replace("/login");
  };
  const handleSignUp = async () => {
    router.replace("/signup");
  };
  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image
        source={require("@/assets/images/moneymap.png")}
        style={styles.bgImage}
      />
      <View style={styles.bgCard}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: colors.WHITE,
          }}
        >
          Mapping the Way to Smarter Spending
        </Text>
        {/* <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: colors.WHITE,
              marginTop: 20,
              opacity: 0.8,
            }}
          >
            Mapping the Way to Smarter Spending
          </Text> */}
        <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.loginButtonWrapper,
                { backgroundColor: colors.WHITE },
              ]}
              onPress={handleSignIn}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.loginButtonWrapper]}
              onPress={handleSignUp}
            >
              <Text style={styles.signupButtonText}>Sign-up</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignIn()}
          >
            <Text style={{ color: colors.PRIMARY, textAlign: "center" }}>
              SignUp
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignIn()}
          >
            <Text style={{ color: colors.PRIMARY, textAlign: "center" }}>
              Login
            </Text>
          </TouchableOpacity> */}
        <Text style={{ fontSize: 13, color: colors.GREY, marginTop: 10 }}>
          *By login/signup you will agree to our terms and conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bgImage: {
    width: "100%",
    height: 400,
    marginTop: 30,
  },
  bgCard: {
    backgroundColor: colors.PRIMARY,
    width: "100%",
    height: "100%",
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  button: {
    backgroundColor: colors.WHITE,
    padding: 15,
    borderRadius: 99,
    marginTop: 40,
  },
  buttonContainer: {
   
    marginTop: 80,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.GREY,
    width: "80%",
    height: 60,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    borderRadius: 98,
  },
  loginButtonText: {
    color: colors.PRIMARY,
    fontSize: 20,
    fontFamily: "outfit-medium",
  },
  signupButtonText: {
    color:colors.WHITE ,
    fontSize: 20,
    fontFamily: "outfit-medium",
  },
});
