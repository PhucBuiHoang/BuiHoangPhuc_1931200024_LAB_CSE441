import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../screens/LoginScreen';
import BottomTabs from './BottomTabs';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import EditServiceScreen from '../screens/EditServiceScreen';
import AddServiceScreen from '../screens/AddServiceScreen';
import AddCustomerScreen from '../screens/AddCustomerScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('token');
            setIsLoggedIn(!!token);
        };
        checkLogin();
    }, []);

    if (isLoggedIn === null) {
        return null;
    }

    return (
        <Stack.Navigator>
            {/* {isLoggedIn ? (
                <>
                    <Stack.Screen name="MainApp" component={BottomTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="ServiceDetail" options={{
                        title: 'Service Detail',
                        headerStyle: {
                            backgroundColor: '#ef506b',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} component={ServiceDetailScreen} />
                    <Stack.Screen name="EditService" options={{
                        title: 'Service',
                        headerStyle: {
                            backgroundColor: '#ef506b',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }} component={EditServiceScreen} />
                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            )} */}


            <>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="MainApp" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="ServiceDetail" options={{
                    title: 'Service Detail',
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} component={ServiceDetailScreen} />
                <Stack.Screen name="EditService" options={{
                    title: 'Edit Service',
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} component={EditServiceScreen} />
                <Stack.Screen name="AddService" options={{
                    title: 'Add Service',
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} component={AddServiceScreen} />

                <Stack.Screen name="AddCustomer" options={{
                    title: 'Add Customer',
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} component={AddCustomerScreen} />
                <Stack.Screen name="TransactionDetail" options={{
                    title: 'Transaction Detail',
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} component={TransactionDetailScreen} />
                <Stack.Screen name="CustomerDetail" options={{
                    title: 'Customer Detail',
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} component={CustomerDetailScreen} />
                <Stack.Screen name="EditCustomer" options={{
                    title: 'Edit Customer',
                    headerStyle: {
                        backgroundColor: '#ef506b',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }} component={EditCustomerScreen} />
            </>
        </Stack.Navigator>
    );
};

export default AppNavigator;
