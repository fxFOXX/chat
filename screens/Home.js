import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
    const [activeTab, setActiveTab] = useState('Chats');

    const renderChats = (name, message, time, notifications, imageUri) => (
        <View style={styles.chatRow}>
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
            <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{name}</Text>
                <Text style={styles.chatMessage}>{message}</Text>
            </View>
            <View style={styles.chatTimeContainer}>
                <Text style={styles.chatTime}>{time}</Text>
                {notifications > 0 && (
                    <View style={styles.notificationBadge}>
                        <Text style={styles.notificationText}>{notifications}</Text>
                    </View>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <FontAwesome name="whatsapp" size={24} color="#25D366" />
                <Text style={styles.appBarText}>LetsChat</Text>
                <View style={styles.rightIcons}>
                    <FontAwesome name="search" size={24} color="#fff" />
                    <Image source={{ uri: 'assets/pros/you.jpg' }} style={styles.profileImage} />
                </View>
            </View>
            <ScrollView horizontal style={styles.scrollView} contentContainerStyle={styles.imageRow}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'assets/pros/you.jpg' }} style={styles.roundImage} />
                    <Text style={styles.imageLabel}>You</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'assets/pros/david.webp' }} style={styles.roundImage} />
                    <Text style={styles.imageLabel}>David</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'assets/pros/joseph.jpg' }} style={styles.roundImage} />
                    <Text style={styles.imageLabel}>Joseph</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'assets/pros/jacob.jpg' }} style={styles.roundImage} />
                    <Text style={styles.imageLabel}>Jacob</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'assets/pros/gabriel.jpg' }} style={styles.roundImage} />
                    <Text style={styles.imageLabel}>Gabriel</Text>
                </View>

                <View style={styles.imageContainer}>
                    <Image source={{ uri: 'assets/pros/john.jpg' }} style={styles.roundImage} />
                    <Text style={styles.imageLabel}>John</Text>
                </View>
            </ScrollView>
            <View style={styles.tabContainer}>
                {['Pinned', 'Chats', 'Groups'].map((tab) => (
                    <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={styles.tab}>
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                        {activeTab === tab && <View style={styles.activeTabLine} />}
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={styles.messagesContainer} contentContainerStyle={styles.messagesContent}>
                {renderChats('David', 'I might not be able to make it', '35m', 3, 'assets/pros/david.webp')}
                {renderChats('Joseph', 'Great man.. Sounds super cool', '15m', 2, 'assets/pros/joseph.jpg')}
                {renderChats('Jacob', 'Yeah sure mate', '25m', 1, 'assets/pros/job.jpg')}
                {renderChats('Gabriel', 'I\'ll send it through mail', '21m', 1, 'assets/pros/gabriel.jpg')}
                {renderChats('Mark', ' exactly how I felt', '25m', 1, 'assets/pros/john.jpg')}
                {renderChats('Isral', 'Come on man', '2m', 3, 'assets/pros/dave.jpeg')}
                {renderChats('Hugo', 'Great man.. Sounds super cool', '5m', 2, 'assets/pros/mark.jpeg')}
                {renderChats('James', 'Yeah sure mate', '25m', 6, 'assets/pros/jacob.jpg')}
                {renderChats('Charlie', 'I\'ll send it through mail', '25m', 1, 'assets/pros/gabriel.jpg')}
                {renderChats('Yousuf', 'Ikr.. that\'s exactly how I felt', '25m', 4, 'assets/pros/you.jpg')}
            </ScrollView>
            <TouchableOpacity style={styles.addButton}>
                <FontAwesome name="plus" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.navBar}>
                {['envelope', 'phone', 'camera', 'users'].map((icon) => (
                    <FontAwesome key={icon} name={icon} size={24} color="#fff" />
                ))}
            </View>
        </View>
    );
};


export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    appBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#121212',
    },
    appBarText: {
        fontSize: 20,
        color: '#fff',
        
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginLeft: 15,
    },
    scrollView: {
        paddingHorizontal: 28,
        paddingVertical: 15,
    },
    imageRow: {
        flexDirection: 'row',
    },
    imageContainer: {
        alignItems: 'center',
        marginRight: 20,
    },
    roundImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#25D366',
    },
    imageLabel: {
        marginTop: 5,
        color: '#fff',
        paddingVertical: 10,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 10,
        backgroundColor: '#121212',
        marginTop: -650, // Adjust this value to move the tab container up
    },
    tab: {
        alignItems: 'center',
    },
    tabText: {
        fontSize: 16,
        color: '#888',
    },
    activeTabText: {
        color: '#25D366',
    },
    activeTabLine: {
        width: '100%',
        height: 2,
        backgroundColor: '#25D366',
        marginTop: 5,
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    messagesContent: {
        paddingBottom: 80,
    },
    chatRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    chatInfo: {
        flex: 1,
        marginLeft: 10,
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    chatMessage: {
        color: '#888',
    },
    chatTimeContainer: {
        alignItems: 'flex-end',
    },
    chatTime: {
        color: '#888',
    },
    notificationBadge: {
        backgroundColor: '#25D366',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginTop: 5,
    },
    notificationText: {
        color: '#fff',
        fontSize: 12,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 80,
        backgroundColor: '#25D366',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#333',
        backgroundColor: '#121212',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
});
