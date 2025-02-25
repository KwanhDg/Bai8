import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isInputStarted, setIsInputStarted] = useState(false);
  const navigation = useNavigation();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(number);
  };

  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
    setIsInputStarted(true);
    if (validatePhoneNumber(number)) {
      setErrorMessage('');
    } else {
      setErrorMessage('Số điện thoại không đúng định dạng. Vui lòng nhập lại.');
    }
  };

  const handleContinue = () => {
    if (validatePhoneNumber(phoneNumber)) {
      setErrorMessage('');
      console.log('Phone Number:', phoneNumber);
      // Chuyển sang màn hình Home
      navigation.navigate('Home');
    } else {
      setErrorMessage('Số điện thoại không đúng định dạng. Vui lòng nhập lại.');
      Alert.alert('Lỗi', 'Số điện thoại không đúng định dạng. Vui lòng nhập lại.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
        {isInputStarted && (errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : <Text style={styles.validText}>Hợp lệ</Text>)}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 8,
    fontSize: 14,
  },
  validText: {
    color: 'green',
    marginTop: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
