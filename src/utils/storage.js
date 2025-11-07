import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();
export const saveUser = user => {
  storage.set('user', JSON.stringify(user));
};

export const getUser = () => {
  const userStr = storage.getString('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const removeUser = () => storage.delete('user');
