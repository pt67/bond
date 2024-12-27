import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const AScanner = () => {
    const [scanResult, setScanResult] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(false);
    const devices = useCameraDevices();
    const device = devices.back;

    useEffect(() => {
        requestCameraPermission();
    }, []);

    const requestCameraPermission = async () => {
        try {
            const result = await request(PERMISSIONS.ANDROID.CAMERA);
            if (result === RESULTS.GRANTED) {
                console.log('Camera permission granted');
                setCameraPermission(true);
            } else {
                console.log('Camera permission denied');
            }
        } catch (error) {
            console.error('Permission error:', error);
        }
    };

    const handleScan = (e) => {
        setScanResult(e.data);
    };

    if (device == null) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            {cameraPermission ? (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    frameProcessor={handleScan}
                    frameProcessorFps={1} // Adjust FPS as needed
                />
            ) : (
                <Text>Camera permission is required</Text>
            )}
            {scanResult && (
                <Text style={styles.scanResultText}>{scanResult}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanResultText: {
        fontSize: 20,
        color: 'blue',
    },
});

export default AScanner;
