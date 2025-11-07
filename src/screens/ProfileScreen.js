import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getUser, removeUser} from '../utils/storage';
import {useNavigation} from '@react-navigation/native';
import BottomNavigation from '../components/BottomNavigation';

const settings = [
  {icon: 'card-outline', label: 'Your Card'},
  {icon: 'shield-outline', label: 'Security'},
  {icon: 'notifications-outline', label: 'Notification'},
  {icon: 'globe-outline', label: 'Languages'},
  {icon: 'help-circle-outline', label: 'Help and Support'},
];

export default function ProfileScreen() {
  const user = getUser();
  const navigation = useNavigation();

  const logout = () => {
    removeUser();
    navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topBox}>
          <Image
            source={{
              uri:
                user?.avatar ||
                'https://randomuser.me/api/portraits/men/32.jpg',
            }}
            style={styles.avatar}
          />
          <View style={{flex: 1, marginLeft: 14}}>
            <Text style={styles.name}>{user?.fullName || 'User Name'}</Text>
            <Text style={styles.email}>{user?.email || 'user@mail.com'}</Text>
          </View>
          <Icon
            name="create-outline"
            size={22}
            color="#171725"
            style={{marginHorizontal: 8}}
          />
        </View>

        {/* Settings */}
        <Text style={styles.settingHeader}>Setting</Text>
        <FlatList
          data={settings}
          keyExtractor={item => item.label}
          scrollEnabled={false}
          style={{marginTop: 9}}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.optionBox} key={item.label}>
              <Icon
                name={item.icon}
                size={25}
                color="#222"
                style={{marginRight: 16}}
              />
              <Text style={styles.optionLabel}>{item.label}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        <TouchableOpacity onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <BottomNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
      paddingBottom: 170,
  },

  topBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 78,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ddd',
  },
  name: {
    fontWeight: 600,
    fontSize: 18,
    color: '#1A1A1A',
    fontStyle: 'semibold',
    fontFamily: 'Oufit',
  },
  email: {fontSize: 14, color: '#8E8E8E', marginTop: 8, fontFamily: 'Oufit'},
  settingHeader: {
    marginTop: 80,
    fontWeight: '500',
    fontSize: 18,
    color: '#858585',
    marginBottom: 5,
    marginLeft: 6,
    fontFamily: 'Jost',
    letterSpacing: 0.5,
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 4,
    marginHorizontal: 4,
  },
  optionLabel: {
    fontSize: 16,
    color: '#171725',
    fontWeight: 600,
    fontFamily: 'Jost',
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E9EBED',
    marginRight: 32,
    marginLeft: 45,
  },
  logoutText: {
    color: '#D32D2F',
    fontWeight: 600,
    fontSize: 16,
    paddingTop: 8,
    letterSpacing: 1,
    textAlign: 'center',
    fontFamily: 'Jost',
  },
});
