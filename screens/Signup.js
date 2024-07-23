import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, StatusBar, Alert, ActivityIndicator, Image } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../config/firebase"; // Import Firebase configuration
import { useNavigation } from '@react-navigation/native';

const backImage = require("../assets/backImage.png");

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const handleSignup = () => {
        if (username !== "" && password !== "" && password === confirmPassword) {
            setLoading(true);
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // Save username to Firestore using UID as document ID
                    firestore.collection("chats").doc(user.uid).set({
                        username: username
                    })
                        .then(() => {
                            console.log("Username saved to Firestore");
                            setLoading(false);
                            navigation.navigate('UserPro');
                        })
                        .catch((error) => {
                            console.error("Error saving username to Firestore:", error);
                            Alert.alert("Signup error", "An error occurred while saving user data. Please try again later.");
                            setLoading(false);
                        });

                    // Check for documents where the username is an empty string
                    firestore.collection("chats")
                        .where("username", "==", "")
                        .get()
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                                console.log(doc.id, "=>", doc.data());
                            });
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                })
                .catch((err) => {
                    Alert.alert("Signup error", err.message);
                    setLoading(false);
                });
        } else {
            Alert.alert("Signup error", "Please enter valid username, matching passwords");
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />

            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Sign Up</Text>}
                </TouchableOpacity>

                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#f57c00', fontWeight: '600', fontSize: 14 }}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "orange",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});
