import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { addService } from '../api/api';

const AddServiceScreen = () => {
    const navigation = useNavigation<any>();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleAddService = async () => {
        if (!name || !price) {
            Alert.alert('Validation', 'Please fill in all fields');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('User is not authenticated');

            const priceValue = parseFloat(price);
            if (isNaN(priceValue) || priceValue <= 0) {
                Alert.alert('Validation', 'Price must be a number greater than 0');
                return;
            }

            await addService(name, priceValue, token);
            Alert.alert('Success', 'Service added successfully');
            navigation.navigate('MainApp'); // or wherever you want to go back to
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name *</Text>
            <TextInput
                style={styles.input}
                placeholder="Input a service name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Price *</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddService}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 6,
        marginTop: 12,
        color: '#222',
    },
    input: {
        backgroundColor: '#f1f1f6',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#F75C7B',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
