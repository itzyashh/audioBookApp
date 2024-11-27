import { Dimensions } from "react-native"

export const RValue = (size: number, designHeight: number) => {
    const deviceHeight = Dimensions.get("window").height
  
    return size * (deviceHeight / designHeight)
  }