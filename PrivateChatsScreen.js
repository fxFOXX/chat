import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from '../config/firebase';
import backImage from './assets/back.jpg';

export default function PrivateChatsScreen() {
    const [privateChats, setPrivateChats] = useState([]);

    useEffect(() => {
        const q = query(collection(firestore, 'privatechats'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            setPrivateChats(
                querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    // Add any other necessary fields
                }))
            );
        });

        return unsubscribe;
    }, []);

    return (
        <View>
            {privateChats.map(chat => (
                <Text key={chat.id}>{chat.id}</Text>
                // Render other details of private chats as needed
            ))}
        </View>
    );
}
