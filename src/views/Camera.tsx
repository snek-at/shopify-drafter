import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as Colors from "../styles/Colors";

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState({uri: 'https://reactnative.dev/img/tiny_logo.png'})

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      }
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref => {setCameraRef(ref)}}>
        <View style={styles.buttonReverseCamera}>
          <TouchableOpacity
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicons name="camera-reverse" size={45} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonTakePicture}>
          <TouchableOpacity
            onPress={async() => {
              if (cameraRef){
                let photo = await cameraRef.takePictureAsync("photo");
                console.log("photo", photo);
                setImage({uri: photo.uri});
              }
            }}>
              <Ionicons name="aperture" size={100} color={Colors.WHITE} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGallery}>
          <TouchableOpacity
            onPress={() => {
              alert("openGallery")
            }}>
            <Image source={image} style={styles.galleryPreview}/>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    camera: {
      flex: 1,
    },
    buttonGallery: {
      position: "absolute",
      bottom: 50,
      left: 25,
    },
    galleryPreview: {
      width: 50,
      height: 50,
      backgroundColor: Colors.BLACK,
      borderRadius: 50/16,
      borderColor: Colors.WHITE,
      borderWidth: 2,
    },
    buttonTakePicture: {
      position: "absolute",
      bottom: 40,
      left: 140,
    },
    buttonReverseCamera: {
      position: "absolute",
      bottom: 50,
      right: 25,
    },
    text: {
      fontSize: 18,
      color: 'white',
    },
  });