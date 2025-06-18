import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

const TransactionDetailScreen = () => {
    const route = useRoute<any>();
    const { transaction } = route.params;

    const formatDateTime = (date: string) => {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.toTimeString().slice(0, 5)}`;
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.border}>
                <Text style={styles.sectionTitle}>General information</Text>
                <View style={styles.serviceItem}>
                    <Text style={styles.text}>Transaction code</Text>
                    <Text style={styles.boldText}>{transaction.id}</Text>
                </View>
                <View style={styles.serviceItem}>
                    <Text style={styles.text}>Customer </Text>
                    <Text style={styles.boldText}>{transaction.customer.name} - {transaction.customer.phone}</Text>
                </View>
                <View style={styles.serviceItem}>
                    <Text style={styles.text}>Creation time </Text>
                    <Text style={styles.boldText}>{formatDateTime(transaction.createdAt)}</Text>
                </View>
            </View>

            <View style={styles.border}>
                <Text style={styles.sectionTitle}>Services list</Text>
                {transaction.services.map((s: any, index: number) => (
                    <View key={index} style={styles.serviceItem}>
                        <Text style={[styles.text, { maxWidth: 230 }]}
                            numberOfLines={3}
                            ellipsizeMode="tail">{s.name} </Text>
                        <Text style={{ alignItems: 'flex-end' }}>×{s.quantity}</Text>
                        <Text style={styles.boldText}>{(s.price * s.quantity).toLocaleString()} đ</Text>
                    </View>
                ))}
                <View style={styles.serviceItem}>
                    <Text style={styles.boldText}>Total</Text>
                    <Text style={styles.boldText}>{transaction.priceBeforePromotion.toLocaleString()} đ</Text>
                </View>
            </View>

            <View style={styles.border}>
                <Text style={styles.sectionTitle}>Cost</Text>
                <View style={styles.serviceItem}>
                    <Text>Amount of money</Text>
                    <Text style={styles.boldText}>{transaction.priceBeforePromotion.toLocaleString()} đ</Text>
                </View>
                <View style={styles.serviceItem}>
                    <Text>Discount</Text>
                    <Text style={styles.boldText}>-{(transaction.priceBeforePromotion - transaction.price).toLocaleString()} đ</Text>
                </View>
                <View style={styles.serviceItem}>
                    <Text style={[styles.boldText, { fontSize: 16 }]}>Total payment</Text>
                    <Text style={[styles.boldText, { color: '#F75C7B', fontSize: 20 }]}>
                        {transaction.price.toLocaleString()} đ
                    </Text>
                </View>
            </View>

        </ScrollView>
    );
};

export default TransactionDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#ddd',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 10,
        color: '#e91e63',
    },
    text: {
        fontSize: 16,
        fontWeight: 400,
        marginBottom: 6,
    },
    boldText: {
        fontWeight: 'bold',
    },
    serviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    border: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    }
});
