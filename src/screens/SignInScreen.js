import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../redux/userSlice';

export default function SignInScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const {error, isAuthenticated} = useSelector(state => state.user);

  const handleSignIn = () => {
    setLocalError('');
    if (!email || !password) {
      setLocalError('All fields are required');
      return;
    }
    dispatch(signIn({email, password}));
    console.log('Sign In Dispatched');
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subtext}>Enter your details to login</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="eg. johnfrans@gmail.com"
        style={styles.input}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <View style={{position: 'relative', marginBottom: 8}}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          style={[styles.input, {paddingRight: 40}]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: 14,
            bottom: 33,
            height: 24,
            width: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          hitSlop={10}>
          <Icon
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#ccc"
          />
        </Pressable>
      </View>

      {(localError || error) && (
        <Text style={styles.error}>{localError || error}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{marginTop: 32}}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>
          Don&apos;t have an account?{' '}
          <Text style={{fontWeight: 'bold'}}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#000000',
    fontFamily: 'Oufit',
  },
  subtext: {
    textAlign: 'center',
    color: '#3D3D3D',
    marginBottom: 40,
    fontFamily: 'Oufit',
  },
  label: {
    fontFamily: 'Oufit',
    fontSize: 14,
    fontWeight: 'medium',
    color: '#121212',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#003B95',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'semibold',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Oufit',
  },
  linkText: {
    color: '#222',
    textAlign: 'center',
    marginTop: 32,
    fontFamily: 'Oufit',
  },
  error: {color: 'red', textAlign: 'center', marginBottom: 10},
});
