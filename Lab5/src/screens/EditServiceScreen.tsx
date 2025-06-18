import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateService } from '../api/api';

const EditServiceScreen = (props: any) => {
    const route = useRoute();
    const { navigation } = props;
    const { service } = route.params as { service: any };
    // console.log(service.name)
    const [name, setName] = useState(service.name);
    const [price, setPrice] = useState(String(service.price));

    const handleUpdate = async () => {
        if (!name || !price) {
            Alert.alert('Notification', 'Please! Enter all of infortion');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token');

            await updateService(service._id, name, parseFloat(price), token);
            Alert.alert('Notification', 'Successfully', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Unsuccessfully');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Service name *</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Service name"
            />

            <Text style={styles.label}>Price *</Text>
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Price"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditServiceScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 6,
        marginTop: 16,
        fontSize: 14,
    },
    input: {
        backgroundColor: '#f4f4f8',
        borderRadius: 6,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 32,
        backgroundColor: '#e91e63',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
