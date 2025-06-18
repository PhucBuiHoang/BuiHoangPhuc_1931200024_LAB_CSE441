import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchServices } from '../api/api';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = (props: any) => {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { navigation } = props;
    const loadServices = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token found');
            const data = await fetchServices(token);
            setServices(data);
        } catch (error: any) {
            console.error('Error fetching services:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    if (loading) return <ActivityIndicator size="large" color="#e91e63" style={{ flex: 1 }} />;

    return (
        <SafeAreaView >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>HUYỀN TRINH</Text>
                    <Ionicons name="person-circle-outline" size={32} color="white" />
                </View>

                {/* Logo */}
                {/* <View style={styles.logoContainer}>
                <Image source={logo} style={styles.logo} resizeMode="contain" />
            </View> */}

                {/* Title + Add button */}
                <View style={styles.listHeader}>
                    <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AddService');
                            // console.log(item)
                        }}>
                        <Ionicons name="add-circle" size={28} color="#e91e63" />
                    </TouchableOpacity>
                </View>

                {/* List */}
                <FlatList
                    // style={{ marginBottom: 35 }}
                    contentContainerStyle={{ paddingBottom: 230 }}
                    data={services}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ServiceDetail', { service: item });
                                // console.log(item)
                            }
                            }
                            style={styles.serviceCard}
                        >
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>


    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#f9f9f9',
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
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    logo: {
        width: 200,
        height: 60,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignItems: 'center',
        marginBottom: 8,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    serviceCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 1,
    },
    name: {
        fontSize: 15,
        flex: 1,
        marginRight: 8,
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
});
