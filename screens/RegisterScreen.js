import { Alert, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();
    const register = () => { 
        if(email === "" || password === "" || phone === "") {
            Alert.alert('invalid Details', 'Please select all the details', [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
              ], { cancelable: false });
        }
        createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
            console.log("User Credential", userCredential);
            const user = userCredential._tokenResponse.email;
            const myUserUid = auth.currentUser.uid;

            setDoc(doc(db, "users", `${myUserUid}`), {
                email: user,
                phone: phone,
                password: password
            });
        });
    };

    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <KeyboardAvoidingView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100,
                    }}
                >
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
                        Register
                    </Text>

                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
                        Create a new Account
                    </Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color="black"
                        />
                        <TextInput
                            placeholder="Email"
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor="black"
                            style={{
                                fontSize: email ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginLeft: 13,
                                width: 300,
                                marginVertical: 10,
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="key-outline" size={24} color="black" />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                            placeholder="Password"
                            placeholderTextColor="black"
                            style={{
                                fontSize: password ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginLeft: 13,
                                width: 300,
                                marginVertical: 20,
                            }}
                        />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="phone" size={24} color="black" />
                        <TextInput
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            placeholder="Phone No"
                            placeholderTextColor="black"
                            style={{
                                fontSize: password ? 18 : 18,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                marginLeft: 13,
                                width: 300,
                                marginVertical: 10,
                            }}
                        />
                    </View>

                    <Pressable
                        onPress={register}
                        style={{
                            width: 200,
                            backgroundColor: "#318CE7",
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 50,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                            Register
                        </Text>
                    </Pressable>

                    <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 17,
                                color: "gray",
                                fontWeight: "500",
                            }}
                        >
                            Already have a account? Sign in
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        backgroundColor: "#F0F0F0",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})