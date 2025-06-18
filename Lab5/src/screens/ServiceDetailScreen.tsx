import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteService } from '../api/api';

const DetailScreen = () => {
    const navigation = useNavigation<any>();
    const route = useRoute();
    const { service } = route.params as { service: any };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const pad = (n: number) => n.toString().padStart(2, '0');
        return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${date.toTimeString().slice(0, 8)}`;
    };

    const handleDelete = async () => {
        Alert.alert(
            'Warning',
            'Are you sure you want to remove this service? This operation cannot be returned.',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const token = await AsyncStorage.getItem('token');
                            if (!token) throw new Error('No token found');
                            await deleteService(service._id, token);
                            Alert.alert('Success', 'Service has been removed.');
                            navigation.navigate('MainApp');
                        } catch (error: any) {
                            Alert.alert('Delete failed', error.message);
                        }
                    },
                    style: 'destructive',
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textLine}>
                <Text style={styles.label}>Service name:</Text> {service.name}
            </Text>
            <Text style={styles.textLine}>
                <Text style={styles.label}>Price:</Text> {Number(service.price).toLocaleString()} đ
            </Text>
            <Text style={styles.textLine}>
                <Text style={styles.label}>Creator:</Text> {service.createdBy === '640b291238c00f3b15f68375' ? 'Hung' : service.createdBy}
            </Text>
            <Text style={styles.textLine}>
                <Text style={styles.label}>Time:</Text> {formatDate(service.createdAt)}
            </Text>
            <Text style={styles.textLine}>
                <Text style={styles.label}>Final update:</Text> {formatDate(service.updatedAt)}
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => navigation.navigate('EditService', { service })}
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
        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    textLine: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
    },
    label: {
        fontWeight: 'bold',
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 24,
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
