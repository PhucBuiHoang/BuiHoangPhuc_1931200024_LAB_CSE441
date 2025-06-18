import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import Setting from '../screens/Setting';
import CustomerScreen from '../screens/CustomerScreen';
import TransactionScreen from '../screens/TransactionScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                    title: 'Home',
                }}
            />
            <Tab.Screen
                name="Transaction"
                component={TransactionScreen}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome name="money" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Customer"
                component={CustomerScreen}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="people" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}
