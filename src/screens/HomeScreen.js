import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts, resetProducts} from '../redux/productSlice';
import {getUser, removeUser} from '../utils/storage';
import {useNavigation} from '@react-navigation/native';

const categories = [
  {key: 'Hotels', icon: 'bed-outline'},
  {key: 'Flights', icon: 'airplane-outline'},
  {key: 'Trains', icon: 'train-outline'},
  {key: 'Ferry', icon: 'boat-outline'},
  {key: 'Bus', icon: 'bus-outline'},
];

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {products, offset, loading, error, hasMore} = useSelector(
    state => state.product,
  );
  const user = getUser();

  useEffect(() => {
    dispatch(resetProducts());
    dispatch(fetchProducts({offset: 0, limit: 10}));
  }, [dispatch]);

  const loadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchProducts({offset, limit: 10}));
    }
  };

  const handleLogout = () => {
    removeUser();
    navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 32}}>
      {/* Header */}
      <View style={styles.headerBox}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: 40,
            marginTop: 30,
          }}>
          <Text style={styles.headerText}>Welcome</Text>
          <Image
            source={{
              uri:
                user?.avatar ||
                'https://randomuser.me/api/portraits/men/32.jpg',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.searchBox}>
          <Icon
            name="search-outline"
            size={20}
            color="#3D3D3D"
            style={{marginRight: 8}}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Where to go?"
            placeholderTextColor="#555"
          />
        </View>
      </View>
      <View style={styles.chipBox}>
        {categories.map(item => (
          <View key={item.key} style={styles.chip}>
            <View style={styles.chipIconBox}>
              <Icon name={item.icon} size={22} color="#000000" />
            </View>
            <Text style={styles.chipLabel}>{item.key}</Text>
          </View>
        ))}
      </View>
      {/* Explore */}
      <Text style={styles.sectionHeader}>Explore</Text>
      <FlatList
        data={products}
        horizontal
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap: 12, paddingLeft: 16}}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? <Text style={{margin: 10}}>Loading...</Text> : null
        }
        renderItem={({item}) => (
          <View style={styles.exploreCard}>
            <Image source={{uri: item.images?.[0]}} style={styles.exploreImg} />
            <Text style={styles.exploreTitle}>{item.title}</Text>
            <Text style={styles.explorePrice}>${item.price}</Text>
          </View>
        )}
      />
      <Text style={styles.sectionHeader}>Recommendation for you</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        renderItem={({item}) => (
          <View style={styles.recCard}>
            <Image source={{uri: item.images?.[0]}} style={styles.recImg} />
            <View style={{flex: 1, marginLeft: 12}}>
              <Text style={styles.recTitle}>{item.title}</Text>
              <Text style={styles.recDetails}>${item.price}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.sectionHeader}>Your Info</Text>
      <View style={styles.userCard}>
        <Text style={styles.userLabel}>Full Name:</Text>
        <Text style={styles.userValue}>{user?.fullName}</Text>
        <Text style={styles.userLabel}>Email:</Text>
        <Text style={styles.userValue}>{user?.email}</Text>
      </View>
      {/* Logout */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {error ? (
        <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F5F5F5'},
  headerBox: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#003B95',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 18,
    marginBottom: 14,
    justifyContent: 'space-evenly',
  },
  headerText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'semibold',
    fontFamily: 'Oufit',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    elevation: 2,
    marginBottom: 20,
  },
  searchInput: {flex: 1, fontSize: 16, padding: 0, color: '#3D3D3D'},
  chipBox: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 14,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    // Elevation for Android
    elevation: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -40, // moves up towards the header, tweak for effect
    marginBottom: 20,
  },

  chip: {
    alignItems: 'center',
    flex: 1,
  },
  chipIconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#B4D1FF',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    // Shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
  },
  chipLabel: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  sectionHeader: {
    marginTop: 22,
    marginBottom: 12,
    marginLeft: 20,
    fontWeight: 600,
    fontSize: 16,
    color: '#4B5563',
    fontStyle: 'semi-bold',
  },
  exploreCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    width: 160,
    shadowColor: '#000',
    elevation: 2,
  },
  exploreImg: {width: 140, height: 80, borderRadius: 12, marginBottom: 7},
  exploreTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#222',
    marginBottom: 2,
  },
  explorePrice: {
    fontSize: 14,
    color: '#003B95',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  recCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 7,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  recImg: {width: 54, height: 54, borderRadius: 9, backgroundColor: '#eee'},
  recTitle: {fontWeight: 'bold', fontSize: 14, color: '#222', marginBottom: 2},
  recDetails: {fontSize: 13, color: '#111'},
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 7,
    padding: 10,
    elevation: 2,
  },
  userLabel: {fontWeight: 'bold', fontSize: 13, color: '#222'},
  userValue: {fontSize: 12, marginBottom: 6, color: '#003B95'},
  button: {
    backgroundColor: '#003B95',
    padding: 14,
    borderRadius: 12,
    marginVertical: 22,
    marginHorizontal: 32,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
