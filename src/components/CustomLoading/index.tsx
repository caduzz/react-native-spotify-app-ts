import React from 'react';

import { LinearGradient } from 'expo-linear-gradient';
import { MusicNotesSimple } from 'phosphor-react-native';

import { MusicParams } from '../../@types/music';

interface PropsCustomLoad {
    styleCustom: {
        marginTop: number,
        margin: number,
        size: {
            icon: number,
            width: number,
            height: number, 
        },
        radius?: number
    },
    colorsCustom: {
        background: string
        text: string
    }
} 

const CustomLoading = ({ styleCustom, colorsCustom }: PropsCustomLoad) => {

    return (
            <LinearGradient
                colors={[colorsCustom.background, colorsCustom.background]}
                style={{
                    top: styleCustom.marginTop,
                    left: styleCustom.margin,
                    position: 'absolute',
                    zIndex: 1,
                    width: styleCustom.size.width,
                    height: styleCustom.size.height,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: styleCustom.radius ? styleCustom.radius : 0
                }}
            >
                <MusicNotesSimple color={colorsCustom.text} weight='fill' size={styleCustom.size.icon} />
            </LinearGradient>
    );
}

export default CustomLoading;