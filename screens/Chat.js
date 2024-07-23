import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, firestore } from '../config/firebase'; // Assuming firestore is correctly initialized
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';

// Adjust the import path for the background image
import backImage from '../assets/back.jpg';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={styles.neumorphicButton}
                        onPress={onSignOut}
                    >
                        <AntDesign name="logout" size={24} color={colors.gray} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.neumorphicButton}
                        onPress={handleCall}
                    >
                        <AntDesign name="phone" size={24} color={colors.gray} />
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation]);

    const handleCall = () => {
        // Implement call functionality here
        console.log('Calling...');
    };

    useEffect(() => {
        const collectionRef = collection(firestore, 'chats'); // Use firestore instead of database
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            console.log('querySnapshot unsubscribe');
            setMessages(
                querySnapshot.docs.map(doc => ({
                    _id: doc.id, // Use doc.id for the message ID
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user
                }))
            );
        });

        return unsubscribe;
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, messages)
        );

        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(firestore, 'chats'), {
            _id,
            createdAt,
            text,
            user
        });
    }, []);

    return (
        <ImageBackground source={backImage} style={{ flex: 1 }}>
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                messagesContainerStyle={{ backgroundColor: 'transparent' }} // Set background to transparent
                textInputStyle={styles.textInput} // Semi-transparent white background for text input
                user={{
                    _id: auth?.currentUser?.email,
                    avatar: 'https://i.pravatar.cc/300'
                }}
            />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    neumorphicButton: {
        marginRight: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        padding: 10,
        shadowOffset: { width: -5, height: -5 },
        shadowOpacity: 1,
        shadowRadius: 8,
        shadowColor: '#ffffff',
        elevation: 5,
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowColor: '#000000',
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        paddingHorizontal: 10,
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: '#ffffff',
        elevation: 3,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: '#000000',
    }
});
