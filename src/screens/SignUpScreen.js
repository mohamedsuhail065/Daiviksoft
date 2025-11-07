import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../redux/userSlice';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen({navigation}) {
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
      console.log('Dispatched')
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up Account</Text>
      <Text style={styles.subtext}>
        Enter your personal data to create your account.
      </Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            placeholder="eg. John"
            style={[styles.input]}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            placeholder="eg. Francisco"
            style={[styles.input, {flex: 1}]}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="eg. johnfrans@gmail.com"
        style={styles.emalinput}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <View style={styles.passwordRow}>
        <View style={{flex: 1}}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Enter your password"
            style={[styles.input]}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={{
            position: 'absolute',
            right: 14,
            bottom: 14,
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
      <Text style={styles.hint}>Must be at least 8 characters.</Text>
      <View style={styles.passwordRow}>
        <View style={{flex: 1}}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm password"
            style={[styles.input]}
            secureTextEntry={!showConfirm}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <Pressable
          onPress={() => setShowConfirm(!showConfirm)}
          style={{
            position: 'absolute',
            right: 14,
            bottom: 14,
            height: 24,
            width: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          hitSlop={10}>
          <Icon name={showConfirm ? 'eye-off' : 'eye'} size={20} color="#ccc" />
        </Pressable>
      </View>
      {(localError || error) && (
        <Text style={styles.error}>{localError || error}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginTop: 24}}
        onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.linkText}>
          Already have an account?{' '}
          <Text style={{fontWeight: 'bold'}}>Log in</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 22,
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
  },
  emalinput: {
    borderRadius: 8,
    padding: 14,
    backgroundColor: '#F5F5F5',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 20,
  },
  column: {
    flex: 1,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 8,
  },
  hint: {color: '#757575', fontSize: 12, marginBottom: 20, fontFamily: 'Oufit'},
  button: {
    backgroundColor: '#003B95',
    padding: 16,
    borderRadius: 12,
    marginTop: 48,
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
