import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {baseUrl} from '../../../utils/baseUrl';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const windowWidth = Dimensions.get('window').width;

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Books = () => {
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation();

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}books`);
      const newBooks = response.data;
      if (newBooks) {
        setBooks(newBooks);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(`${baseUrl}books`);
      const refreshedBooks = response.data;
      setBooks(refreshedBooks);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderBookItem = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('BookDetails', {bookId: item.id})}
      style={styles.booksItem}>
      <View>
        <Image source={{uri: item.coverImage}} style={styles.bookImage} />
        <Text style={styles.bookTitle}>{item.title}</Text>
        <View style={styles.priceArea}>
          <Text style={styles.bookDiscount}>{item.discountRate}%</Text>
          <Text style={styles.bookPrice}>{item.price.toLocaleString()} 원</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleLoadMore = debounce(() => {
    const floorThreshold = 0.8;
    const offsetThreshold = Math.floor(books.length * floorThreshold);

    if (!loading && !loadingMore && books.length >= offsetThreshold) {
      setLoadingMore(true);
      fetchBooks();
    }
  }, 500);

  return (
    <View style={styles.container}>
      {loadingMore && <Spinner visible={loadingMore} color="#00ff00" />}
      <View style={styles.header}>
        <Text style={styles.headerText}>자유톡</Text>
      </View>
      <FlatList
        horizontal={false}
        data={books}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={renderBookItem}
        contentContainerStyle={{alignItems: 'center'}} // Center the items vertically
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 48,
  },
  headerText: {
    color: '#000',
    fontSize: 20,
  },
  booksItem: {
    marginHorizontal: 1,
    marginBottom: 20,
  },
  bookImage: {
    width: windowWidth / 2,
    height: 260,
  },
  bookTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  priceArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  bookDiscount: {
    color: '#FF003E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookPrice: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Books;
