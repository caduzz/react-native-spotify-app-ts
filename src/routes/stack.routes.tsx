import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import Inicio from "../screens/Inicio";

import Tocar from "../screens/Tocar";
import { TabRoute } from "./tab.routes";

const Stack = createNativeStackNavigator();

export function MainTab() {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#121214'}}>
            <Stack.Navigator
                initialRouteName="MainTab"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen 
                    name="MainTab"
                    component={TabRoute}
                />
                <Stack.Screen 
                    name="tocar"
                    component={Tocar}
                />
            </Stack.Navigator>
        </SafeAreaView>
    )
}