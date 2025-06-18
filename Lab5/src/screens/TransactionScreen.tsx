import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { fetchTransactions } from '../api/api'; // đường dẫn đến hàm API
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TransactionScreen = (props: any) => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { navigation } = props;

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactions();
                setTransactions(data);
            } catch (err: any) {
                Alert.alert('Error', err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []);

    const formatDateTime = (date: string) => {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1)
            .toString()
            .padStart(2, '0')}/${d.getFullYear().toString().slice(2)} ${d
                .toTimeString()
                .slice(0, 5)}`;
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => navigation.navigate('TransactionDetail', { transaction: item })}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.title}>
                        {item.id} - {item.customer.createdAt == null ? "Null Day" : formatDateTime(item.customer.createdAt)}
                        {item.status === 'cancelled' && <Text style={styles.cancelled}> - Cancelled</Text>}
                    </Text>

                    <Text style={styles.desc}
                        // numberOfLines={3}
                        ellipsizeMode="tail">
                        {item.services.map((s: any) => `- ${s.name}`).join('\n')}
                    </Text>
                    <Text style={styles.customer}>Customer: {item.customer.name}</Text>
                </View>

                <View style={{ paddingLeft: 8 }}>
                    <Text style={styles.money}>
                        {Number(item.customer.totalSpent).toLocaleString()} đ
                    </Text>
                </View>

            </View >
        </TouchableOpacity>
    );

    if (loading) {
        return <ActivityIndicator style={{ flex: 1 }} size="large" color="#F75C7B" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Transaction</Text>
            </View>

            <FlatList
                data={transactions}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
            <TouchableOpacity
                style={styles.addButton}
            // onPress={() => navigation.navigate('AddCustomer')}
            >
                <Ionicons name="add" size={45} color="#fff" />
            </TouchableOpacity>
        </SafeAreaView >
    );
};

export default TransactionScreen;

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 12,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 4,
    },
    cancelled: {
        color: '#f00',
        fontWeight: 'bold',
    },
    desc: {
        color: '#555',
        marginBottom: 4,
        maxWidth: 220,
    },
    money: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#F75C7B',
        marginBottom: 4,
    },
    customer: {
        fontStyle: 'italic',
        color: '#333',
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
