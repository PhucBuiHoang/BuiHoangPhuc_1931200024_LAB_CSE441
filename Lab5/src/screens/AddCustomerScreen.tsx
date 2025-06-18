import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { addCustomer } from '../api/api';

const AddCustomerScreen = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation<any>();

    const handleAddCustomer = async () => {
        if (!name || !phone) {
            Alert.alert('Validation', 'Please fill in all fields.');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No login token found');

            await addCustomer(name, phone, token);

            Alert.alert('Success', 'Customer added successfully');
            navigation.navigate('MainApp');
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Customer name *</Text>
            <TextInput
                style={styles.input}
                placeholder="Input your customer's name"
                value={name}
                onChangeText={setName}
            />
            <Text style={styles.label}>Phone *</Text>
            <TextInput
                style={styles.input}
                placeholder="Input phone number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
            />
            <TouchableOpacity style={styles.button} onPress={handleAddCustomer}>
                <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddCustomerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 16,
        fontSize: 14,
        color: '#333',
    },
    input: {
        backgroundColor: '#f3f3f7',
        padding: 12,
        borderRadius: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#F75C7B',
        marginTop: 30,
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
