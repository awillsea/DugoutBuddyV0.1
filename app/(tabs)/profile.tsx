import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { auth } from "@/src/config/firebase";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { router } from "expo-router";

interface UserData {
    name: string;
    email: string;
    profileImage?: string;
    createdAt: Date;
}

export default function ProfileScreen() {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const firestore = getFirestore();
    const storage = getStorage();

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const user = auth.currentUser;
            if (!user) {
                router.replace("/auth/login");
                return;
            }

            const userDoc = await getDoc(doc(firestore, "users", user.uid));
            if (userDoc.exists()) {
                const data = userDoc.data() as UserData;
                setUserData(data);
                if (data.profileImage) {
                    setProfileImage(data.profileImage);
                }
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch user data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleImagePick = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled && result.assets[0].uri) {
                await uploadImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to pick image");
        }
    };

    const uploadImage = async (uri: string) => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            setIsLoading(true);

            // Convert URI to blob
            const response = await fetch(uri);
            const blob = await response.blob();

            // Upload to Firebase Storage
            const storageRef = ref(storage, `profile-images/${user.uid}`);
            await uploadBytes(storageRef, blob);

            // Get download URL
            const downloadURL = await getDownloadURL(storageRef);

            // Update Firestore
            await updateDoc(doc(firestore, "users", user.uid), {
                profileImage: downloadURL,
            });

            setProfileImage(downloadURL);
            Alert.alert("Success", "Profile image updated successfully");
        } catch (error) {
            Alert.alert("Error", "Failed to upload image");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            router.replace("/auth/login");
        } catch (error) {
            Alert.alert("Error", "Failed to logout");
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileImageContainer}>
                {profileImage ? (
                    <Image
                        source={{ uri: profileImage }}
                        style={styles.profileImage}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name="account-circle"
                        size={150}
                        color="gray"
                    />
                )}
                <TouchableOpacity
                    style={styles.editImageButton}
                    onPress={handleImagePick}
                    disabled={isLoading}
                >
                    <Text style={styles.editImageButtonText}>
                        {isLoading ? "Uploading..." : "Edit Profile Image"}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.userInfoLabel}>Name:</Text>
                <Text style={styles.userInfoText}>
                    {userData?.name || "Not set"}
                </Text>
                <Text style={styles.userInfoLabel}>Email:</Text>
                <Text style={styles.userInfoText}>
                    {userData?.email || "Not set"}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    profileImageContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: "white",
    },
    editImageButton: {
        marginTop: 10,
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
    },
    editImageButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    userInfo: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    userInfoLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    userInfoText: {
        fontSize: 16,
        color: "#666",
        marginBottom: 15,
    },
    logoutButton: {
        backgroundColor: "#FF3B30",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    logoutButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
