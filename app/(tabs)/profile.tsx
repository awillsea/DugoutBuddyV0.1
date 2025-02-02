import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 

const mockUser = {
  displayName: 'John Doe', // Or your desired name
  email: 'john.doe@example.com', // Or a mock email
  // Add any other user properties you need
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4', // Light gray background
        padding: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75, // Half of width/height for circle
        borderWidth: 3,
        borderColor: 'white',
    },
    editImageButton: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    editImageButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    userInfo: {
        marginBottom: 20,
    },
    userInfoLabel: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userInfoText: {
      fontSize: 16,
      marginBottom: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default function ProfileScreen() {
    // const { user, signOut } = useAuth(); // Access user data and sign-out function
    const [profileImage, setProfileImage] = useState(null); // State for profile image

    const handleImagePick = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4], // Maintain aspect ratio
            quality: 1,
        });

        // if (!result.canceled) {
        //     setProfileImage(result.assets[0].uri);
        //     // Here you would typically upload the image to your server
        //     // and update the user's profile.
        // }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileImageContainer}>
            
                    <MaterialCommunityIcons name="baseball" size={150} color="gray" /> // Adjust size and color
                
                <TouchableOpacity style={styles.editImageButton} onPress={handleImagePick}>
                    <Text style={styles.editImageButtonText}>Edit Profile Image</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
                <Text style={styles.userInfoLabel}>Name:</Text>
                <Text style={styles.userInfoText}>{mockUser?.displayName || 'Not set'}</Text> {/* Display user's name */}
                <Text style={styles.userInfoLabel}>Email:</Text>
                <Text style={styles.userInfoText}>{mockUser?.email || 'Not set'}</Text> {/* Display user's email */}
                {/* Add other user info here */}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Other Information</Text>
                {/* Add other profile sections here */}
            </View>


            {/* <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity> */}
        </ScrollView>
    );
}