import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";

const AuthStack = createNativeStackNavigator();

const AuthRoutes = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <AuthStack.Screen 
                name="login"
                component={Login}
            />
        </AuthStack.Navigator>
    )
}

export default AuthRoutes;