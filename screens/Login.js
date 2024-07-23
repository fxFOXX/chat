import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, Animated, ActivityIndicator, Linking, TouchableWithoutFeedback } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

const backImage = require("../assets/backImage.png");
import googleIcon from "../assets/google.png";
import facebookIcon from "../assets/facebook.png";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleIconScale] = useState(new Animated.Value(1));
    const [facebookIconScale] = useState(new Animated.Value(1));
    const scaleValue = useState(new Animated.Value(1))[0];

    const nav = useNavigation(); // Use the useNavigation hook

    const onPressSignUp = () => {
        Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true
        }).start(() => {
            navigation.navigate("Signup");
        });
    };

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            setLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log("Login success");
                    setLoading(false);
                    navigation.navigate("AnotherPage");
                })
                .catch((error) => {
                    setLoading(false);
                    if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
                        Alert.alert("Login error", "Invalid email or password. Please try again.");
                    } else {
                        Alert.alert("Login error", error.message);
                    }
                });
        } else {
            Alert.alert("Login error", "Please enter both email and password.");
        }
    };

    const handleGoogleIconScale = (isHovering) => {
        Animated.timing(googleIconScale, {
            toValue: isHovering ? 1.2 : 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const handleFacebookIconScale = (isHovering) => {
        Animated.timing(facebookIconScale, {
            toValue: isHovering ? 1.2 : 1,
            duration: 200,
            useNativeDriver: true
        }).start();
    };

    const onPressSi = () => {
        // Logic for handling the "Forgot Password?" action
        // For example, you might navigate to a "Forgot Password" screen.
        navigation.navigate("ForgotPassword");
    };

    const handlePrivacyPolicy = () => {
        // Navigate to the Terms page when "Terms & Conditions and Privacy Policy" link is clicked
        nav.navigate('Terms');
    };

    return (
        <View style={styles.container}>
            <View style={[styles.backImageContainer, { transform: [{ scale: scaleValue }] }]}>
                <Image source={backImage} style={styles.backImage} />
            </View>

            <View style={styles.whiteSheet} />
            <p>

            </p>
            <br>

            </br>

            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Log In</Text>
                </TouchableOpacity>

                <Text style={[styles.tinyText, { marginTop: 30 }]}>
                    <Text style={{ color: '#f57c00', fontSize: 15 }} onPress={onPressSi}>Forgot Password?</Text>.
                </Text>

                <Text style={[styles.tinyText, { marginTop: 30 }]}>
                    Don't have an account? <Text style={{ color: '#f57c00', fontSize: 15 }} onPress={onPressSignUp}>Sign up</Text>.
                </Text>

                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                    <Text style={{ marginHorizontal: 10, color: 'gray', fontWeight: '600', fontSize: 14 }}>OR</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'gray' }} />
                </View>

                <TouchableWithoutFeedback
                    onPressIn={() => handleGoogleIconScale(true)}
                    onPressOut={() => handleGoogleIconScale(false)}
                >
                    <TouchableOpacity style={styles.transparentButton} onPress={() => { }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={googleIcon} style={{ width: 30, height: 30, marginRight: 10, transform: [{ scale: googleIconScale }] }} />
                            <Text style={{ marginLeft: 10 }}>Sign in with Google</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPressIn={() => handleFacebookIconScale(true)}
                    onPressOut={() => handleFacebookIconScale(false)}
                >
                    <TouchableOpacity style={styles.transparentButton} onPress={() => { }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Image source={facebookIcon} style={{ width: 30, height: 30, marginRight: 10, transform: [{ scale: facebookIconScale }] }} />
                            <Text style={{ marginLeft: 10 }}>Sign in with Facebook</Text>
                        </View>
                    </TouchableOpacity>
                </TouchableWithoutFeedback>

                <Text style={[styles.tinyText, { marginTop: 100 }]}>
                    If you are creating a new account, the <Text style={{ color: '#f57c00' }} onPress={handlePrivacyPolicy}>Terms & Conditions and Privacy Policy</Text> will apply.
                </Text>
            </SafeAreaView>

            <StatusBar barStyle="light-content" />

            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#f57c00" />
                </View>
            )}
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
    backImageContainer: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    backImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '75%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
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
    transparentButton: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 50,
        marginTop: 20,
        padding: 10,
        alignItems: 'center',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyText: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 10,
        color: 'gray'
    }
});
