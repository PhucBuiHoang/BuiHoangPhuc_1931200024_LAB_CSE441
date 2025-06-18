import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchCustomers } from '../api/api';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomerScreen = (props: any) => {
    const [customers, setCustomers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { navigation } = props;

    useEffect(() => {
        const loadCustomers = async () => {
            try {
                const data = await fetchCustomers();
                setCustomers(data);
            } catch (err: any) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadCustomers();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#F75C7B" style={{ flex: 1 }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Customer</Text>
            </View>
            <View >
                <FlatList
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={customers}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        // const isMember = item.totalMoney >= 1000000;
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('CustomerDetail', { customerId: item._id });
                                    console.log('CustomerID: ' + item._id)
                                    // console.log(item)
                                }
                                } style={styles.card}>

                                <View style={styles.info}>
                                    <Text style={styles.label}>Customer: <Text style={styles.text}>{item.name}</Text></Text>
                                    <Text style={styles.label}>Phone: <Text style={styles.text}>{item.phone}</Text></Text>
                                    <Text style={styles.label}>Total money: <Text style={styles.moneyHighlight}>{item.totalSpent.toLocaleString()} đ</Text></Text>
                                    {/* <Text style={styles.label}>Total money: <Text style={[styles.money, item.totalSpent > 0 && styles.moneyHighlight]}>{item.totalSpent.toLocaleString()} đ</Text></Text> */}
                                </View>
                                <View style={styles.role}>
                                    <FontAwesome5 name="chess-queen" size={24} color="#F75C7B" />
                                    <Text style={styles.roleText}>{item.loyalty === 'normal' ? 'Member' : 'Guest'}</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />

                {/* Add button */}
                {/* <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AddService');
                        // console.log(item)
                    }}>
                    <Ionicons name="add-circle" size={28} color="#e91e63" />
                </TouchableOpacity> */}

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddCustomer')}
                >
                    <Ionicons name="add" size={45} color="#fff" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};

export default CustomerScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#e91e63',
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginVertical: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    info: {
        flex: 1,
    },
    label: {
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 4,
    },
    text: {
        color: '#000',
        fontWeight: '600',
    },
    money: {
        color: '#000',
    },
    moneyHighlight: {
        color: '#F75C7B',
        fontWeight: 'bold',
    },
    role: {
        alignItems: 'center',
        gap: 2,
    },
    roleText: {
        color: '#F75C7B',
        fontSize: 12,
        fontWeight: 'bold',
    },
    addButton: {
        // fontWeight: 'bold',
        position: 'absolute',
        right: 20,
        bottom: 100,
        backgroundColor: '#F75C7B',
        borderRadius: 30,
        width: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
});
