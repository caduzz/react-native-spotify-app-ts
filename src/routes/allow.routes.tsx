import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

import Buscar from "../screens/Buscar";
import Favoritos from "../screens/Favoritos";
import Historic from "../screens/Historic";
import Inicio from "../screens/Inicio";
import Premium from "../screens/Premium";

import Tocar from "../screens/Tocar";

const AllowStack = createNativeStackNavigator();

export const InicioRoute = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#121214'}}>
            <AllowStack.Navigator
                initialRouteName="inicio_route"
                screenOptions={{
                    headerShown: false,
                }}
                id='allowRoute'
            >
                <AllowStack.Screen 
                    name="inicio_route"
                    component={Inicio}
                />
                <AllowStack.Screen 
                    name="historic"
                    component={Historic}
                />
                <AllowStack.Screen 
                    name="tocar"
                    component={Tocar}
                />
            </AllowStack.Navigator>
        </View>
    )
}
export const BuscarRoute = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#121214'}}>
            <AllowStack.Navigator
                initialRouteName="buscar_route"
                screenOptions={{
                    headerShown: false,
                }}
                id='allowRoute'
            >
                <AllowStack.Screen 
                    name="buscar_route"
                    component={Buscar}
                />
                <AllowStack.Screen 
                    name="tocar"
                    component={Tocar}
                />
            </AllowStack.Navigator>
        </View>
    )
}
export const FavoritoRoute = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#121214'}}>
            <AllowStack.Navigator
                initialRouteName="favoritos_route"
                screenOptions={{
                    headerShown: false,
                }}
                id='allowRoute'
            >
                <AllowStack.Screen 
                    name="favoritos_route"
                    component={Favoritos}
                />
                <AllowStack.Screen 
                    name="tocar"
                    component={Tocar}
                />
            </AllowStack.Navigator>
        </View>
    )
}
export const PremiumRoute = () => {
    return (
        <View style={{flex: 1, backgroundColor: '#121214'}}>
            <AllowStack.Navigator
                initialRouteName="premium_route"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <AllowStack.Screen 
                    name="premium_route"
                    component={Premium}
                />
            </AllowStack.Navigator>
        </View>
    )
}