import React from 'react'
import {FontAwesome, Entypo} from '@expo/vector-icons';


const getIconFontAwesome = (iconName, size = 24,)=>{
     
    return (
        ({focused, horizontal, tintColor}) => {
            return <FontAwesome name={iconName} size={size} color={tintColor} />
        
        }
    )

}

const getIconEntypo = (iconName, size = 24,)=>{
     
    return (
        ({focused, horizontal, tintColor}) => {
            return <Entypo name={iconName} size={size} color={tintColor} />
        
        }
    )

}

export default {getIconEntypo, getIconFontAwesome}