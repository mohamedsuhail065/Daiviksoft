import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../redux/userSlice';
import {StyleSheet, Text, View} from 'react-native';

export default function SignUpSCreen({navigation}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  const {error} = useSelector(state => state.user);

  const handleSignUp = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setLocalError('All fields are required');
      return;
    }
    if (password.length < 8) {
      setLocalError('Password must be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }
    dispatch(
      signUp({fullName: `${firstName} ${lastName}`.trim(), email, password}),
    );
  };
  return (
    <View>
      <Text style={styles.header}>Sign Up Account</Text>
      <Text>Enter your personal data to create your account.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    fontSize: '24px',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtext: {
    fontSize: '14px',
    textAlign: 'center',
    color: '#3D3D3D',
  },
});
