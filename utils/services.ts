import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key:string,value:string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

const getData = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value
    }
  } catch (e) {
    // error reading value\
    console.log(e);
    return e;
  }
};

export default{
    storeData,
    getData
}