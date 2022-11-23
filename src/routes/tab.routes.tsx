import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Buscar from "../screens/Buscar";
import Favoritos from "../screens/Favoritos";
import Premium from "../screens/Premium";

import CustomBottomTabBar from '../components/CustomBottomTabBar';
import Inicio from '../screens/Inicio';

const TabBottom = createBottomTabNavigator();

export function TabRoute() {
    return (
        <TabBottom.Navigator 
            initialRouteName="maintab"
            tabBar={props => (<CustomBottomTabBar { ...props } />)}
            screenOptions={{
                tabBarStyle:{
                    position: 'absolute',
                    elevation: 0,
                    borderTopWidth: 0,
                    backgroundColor: 'transparent'
                },
                headerShown: false,
            }}
        >
            <TabBottom.Screen name="inicio" component={Inicio} />
            <TabBottom.Screen name="buscar" component={Buscar} />
            <TabBottom.Screen name="favoritos" component={Favoritos} />
            <TabBottom.Screen name="premium" component={Premium} />
        </TabBottom.Navigator>
    )
}