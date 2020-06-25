import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableHighlight,
} from 'react-native';
import ClickAbleByAsim from '../../Common/ClickAbleByAsim';



const Listing = ({ navigation }) => {

    return (
        <>
            <View style={styles.Listing}>
                <Text>
                    Listing
                </Text>

                <ClickAbleByAsim onPress={() => navigation.navigate("Home")} style={{ height: 120, width: 180, backgroundColor: "blue", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white" }}>
                        Go to Home
                    </Text>
                </ClickAbleByAsim>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    Listing: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }
});

export default Listing;
