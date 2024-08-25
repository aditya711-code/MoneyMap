import {TouchableOpacity ,View} from 'react-native'
import React from 'react'
import colors from '@/utils/colors';
export default function ColorPicker({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <View
      style={{ display: "flex", flexDirection: "row", gap: 20, marginTop: 20 }}
    >
      {colors.COLOR_LIST.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            { height: 30, width: 30, backgroundColor: color, borderRadius: 99 },
            selectedColor == color && { borderWidth: 2 },
          ]}
          onPress={() => setSelectedColor(color)}
        ></TouchableOpacity>
      ))}
    </View>
  );
}