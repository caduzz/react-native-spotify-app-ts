import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomBottomTabBar from '../components/CustomBottomTabBar';


import { BuscarRoute, FavoritoRoute, InicioRoute, PremiumRoute } from './allow.routes';

const AppTab = createBottomTabNavigator();

const AppRoute = () => {
    return (
        <AppTab.Navigator
            initialRouteName='inicio'
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
            <AppTab.Group screenOptions={{freezeOnBlur: true}}>
                <AppTab.Screen name='inicio' component={InicioRoute}/>
                <AppTab.Screen name="buscar" component={BuscarRoute} />
                <AppTab.Screen name="favoritos" component={FavoritoRoute} />
                <AppTab.Screen name="premium" component={PremiumRoute} />
            </AppTab.Group>
        </AppTab.Navigator>
    )
}

export default AppRoute