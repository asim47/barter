import React from 'react'
import {
    Text,
    View,
    Platform,
    TouchableNativeFeedback,
    TouchableHighlight
} from 'react-native'

const ClickAbleByAsim = (props) => {



    return (
        <>
            {
                Platform.OS == "android" ? (
                    <TouchableNativeFeedback onPress={() => props.onPress()}>
                        <View style={{ ...props.style }}>
                            {
                                props.children
                            }
                        </View>
                    </TouchableNativeFeedback>
                ) : (
                        <TouchableHighlight underlayColor="silver" onPress={() => props.onPress()} style={{ ...props.style }}>
                            <>
                                {
                                    props.children
                                }
                            </>
                        </TouchableHighlight>
                    )
            }


        </>
    )
}

export default ClickAbleByAsim

