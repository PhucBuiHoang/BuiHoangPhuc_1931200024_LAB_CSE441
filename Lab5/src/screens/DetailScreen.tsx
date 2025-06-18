// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     StyleSheet,
//     ActivityIndicator,
//     Alert,
//     TouchableOpacity,
// } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/AppNavigator';
// import { deleteService, fetchServiceById } from '../api/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

// const DetailScreen: React.FC<Props> = ({ route, navigation }) => {
//     const { _id } = route.params;
//     const [service, setService] = useState<any>(null);
//     const [loading, setLoading] = useState(true);

//     const loadService = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             if (!token) throw new Error('No token found');
//             const data = await fetchServiceById(id, token);
//             setService(data);
//         } catch (err: any) {
//             Alert.alert('Error', err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             const token = await AsyncStorage.getItem('token');
//             if (!token) throw new Error('No token');
//             await deleteService(id, token);
//             Alert.alert('Success', 'Service deleted');
//             navigation.navigate('Home');
//         } catch (err: any) {
//             Alert.alert('Delete failed', err.message);
//         }
//     };

//     useEffect(() => {
//         loadService();
//     }, []);

//     if (loading) {
//         return <ActivityIndicator style={{ flex: 1 }} size="large" color="#F75C7B" />;
//     }

//     if (!service) return null;

//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>{service.name}</Text>
//             <Text style={styles.price}>${service.price}</Text>

//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                     style={[styles.button, styles.editButton]}
//                 // onPress={() => navigation.navigate('Edit', { id })}
//                 >
//                     <Text style={styles.buttonText}>Edit</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                     style={[styles.button, styles.deleteButton]}
//                     onPress={handleDelete}
//                 >
//                     <Text style={styles.buttonText}>Delete</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default DetailScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 24,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 12,
//     },
//     price: {
//         fontSize: 22,
//         color: '#777',
//         marginBottom: 24,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         gap: 16,
//     },
//     button: {
//         flex: 1,
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     editButton: {
//         backgroundColor: '#4CAF50',
//     },
//     deleteButton: {
//         backgroundColor: '#F44336',
//     },
//     buttonText: {
//         color: '#fff',
//         fontWeight: '600',
//         fontSize: 16,
//     },
// });

