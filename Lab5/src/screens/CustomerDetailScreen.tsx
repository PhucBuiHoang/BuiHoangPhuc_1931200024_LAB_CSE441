import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Alert,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { fetchCustomerDetail, deleteCustomer } from '../api/api'; // adjust path
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { MenuProvider } from 'react-native-popup-menu';

const CustomerDetailScreen = (props: any) => {
    const route = useRoute<any>();
    const { customerId } = route.params;
    // const customerId = props._id;
    // console.log('CustomerDetail ID: ' + customerId)
    const { navigation } = props;
    const [customer, setCustomer] = useState<any>(null);

    useEffect(() => {
        const loadCustomer = async () => {
            try {
                const res = await fetchCustomerDetail(customerId);
                setCustomer(res);
            } catch (error) {
                console.error(error);
                Alert.alert('Error', 'Failed to load customer details');
            }
        };
        loadCustomer();
    }, [customerId]);

    const handleDelete = async () => {
        Alert.alert('Delete', 'Are you sure you want to delete this customer?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        // Replace this with token from AsyncStorage if needed
                        const token = await AsyncStorage.getItem('token');
                        await deleteCustomer(customerId, token!);
                        navigation.goBack();
                    } catch (error) {
                        Alert.alert('Error', 'Failed to delete customer');
                    }
                },
            },
        ]);
    };

    const renderTransaction = ({ item }: { item: any }) => (
        <View style={styles.transactionItem}>
            <View>
                <Text style={styles.transactionCode}>{item.id} - {formatDate(item.createdAt)}</Text>
                {item.services.map((s: any, index: number) => (
                    <Text key={index} style={styles.serviceName}>- {s.name}</Text>
                ))}
            </View>
            <Text style={styles.transactionAmount}>{formatCurrency(item.price)}</Text>
        </View>
    );

    if (!customer) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => navigation.navigate('EditCustomer', { customer })}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.header}>
                <Text style={styles.title}>Customer detail</Text>
                <MenuProvider>
                    <MenuTrigger>
                        <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => navigation.navigate('EditCustomer', { customer })} text="Edit" />
                        <MenuOption onSelect={handleDelete}>
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                    </MenuOptions>
                </MenuProvider>
            </View> */}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General information</Text>
                <View style={{ flexDirection: 'row', }}><Text style={styles.headerTitle}>Name: </Text> <Text>{customer.name}</Text> </View>
                <View style={{ flexDirection: 'row', }}><Text style={styles.headerTitle}>Phone: </Text> <Text>{customer.phone}</Text> </View>
                <View style={{ flexDirection: 'row', }}><Text style={styles.headerTitle}>Total spent: </Text> <Text style={{ color: '#f55374', fontWeight: 'bold' }}>{formatCurrency(customer.totalSpent)}</Text> </View>
                <View style={{ flexDirection: 'row', }}><Text style={styles.headerTitle}>Time: </Text> </View>
                <View style={{ flexDirection: 'row', }}><Text style={styles.headerTitle}>Last update: </Text> </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Transaction history</Text>
                <FlatList
                    data={customer.transactions}
                    keyExtractor={(item) => item._id}
                    renderItem={renderTransaction}
                />
            </View>

        </View>

    );
};

const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('vi-VN') + ' ' + d.toLocaleTimeString('vi-VN');
};

const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f55374',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
    },
    headerTitle: {
        fontWeight: 'bold'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#f55374',
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 8,
        marginHorizontal: 3,
        // borderBottomColor: '#ddd',

    },
    transactionCode: {
        fontWeight: '600',
    },
    serviceName: {
        color: '#333',
    },
    transactionAmount: {
        color: '#f55374',
        fontWeight: 'bold',
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#4CAF50',
    },
    deleteButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default CustomerDetailScreen;
