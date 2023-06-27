import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import {baseUrl} from '../../../utils/baseUrl';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;

const profileImg = require('../../../assets/profile_image.png');
const replyImg = require('../../../assets/reply_user.png');
const previewImg = require('../../../assets/image-preview.png');
const expertImg = require('../../../assets/EXPERT_ICON.png');

const BookDetails = ({route}) => {
  const {bookId} = route.params;
  const [book, setBook] = useState(null);

  const navigation = useNavigation();

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}books/${bookId}`);
      const bookData = response.data;
      setBook(bookData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookDetails();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: book ? book.title : 'Loading...',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <FontAwesome
          name="angle-left"
          size={28}
          color="#000"
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [book, navigation]);

  if (!book) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <View style={styles.mainContent}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image
              source={{uri: book.coverImage}}
              style={styles.bookImage}
              resizeMode="cover"
            />

            <View style={styles.detailsAreaMain}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <Text style={styles.bookDesc}>
                Description: {book.description}
              </Text>
              <View style={styles.priceArea}>
                <Text style={styles.bookDiscount}>{book.discountRate}%</Text>
                <Text style={styles.bookPrice}>
                  {book.price.toLocaleString()} 원
                </Text>
              </View>
            </View>

            <View style={styles.borderArea}></View>

            <View style={styles.commentMainSection}>
              <View style={styles.profileArea}>
                <View style={styles.profileImageInfo}>
                  <Image
                    source={profileImg}
                    style={styles.profileImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.profileUserName}>안녕 나 응애 </Text>
                  <Image
                    source={expertImg}
                    style={styles.skillsIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.timeAgo}>1일전</Text>
                </View>
                <View style={styles.profileSettings}>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    size={22}
                    color="#AFB9CA"
                  />
                </View>
              </View>

              <View style={styles.commentsArea}>
                <Text style={styles.commentText}>
                  어머 제가 있던 테이블이 제일 반응이 좋았나보네요🤭
                  우짤래미님도 아시겠지만 저도 일반인 몸매 그 이상도 이하도
                  아니잖아요?! 그런 제가 기꺼이 도전해봤는데 생각보다
                  괜찮았어요! 오늘 중으로 라이브 리뷰 올라온다고 하니 꼭
                  봐주세용~!
                </Text>

                <View style={styles.likeCommentArea}>
                  <Feather name="heart" size={14} color="#AFB9CA" />
                  <Text style={styles.likeCommentCount}>5</Text>

                  <AntDesign name="message1" size={14} color="#AFB9CA" />
                  <Text style={styles.likeCommentCount}>5</Text>
                </View>
              </View>

              <View style={styles.replyArea}>
                <View style={styles.profileArea}>
                  <View style={styles.profileImageInfo}>
                    <Image
                      source={replyImg}
                      style={styles.profileImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.profileUserName}>ㅇㅅㅇ</Text>

                    <Text style={styles.timeAgo}>1일전</Text>
                  </View>
                  <View style={styles.profileSettings}>
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      size={22}
                      color="#AFB9CA"
                    />
                  </View>
                </View>
                <View style={styles.commentsArea}>
                  <Text style={styles.commentText}>
                    오 대박! 라이브 리뷰 오늘 올라온대요? 챙겨봐야겠다
                  </Text>

                  <View style={styles.likeCommentArea}>
                    <Feather name="heart" size={14} color="#AFB9CA" />
                    <Text style={styles.likeCommentCount}>5</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.commentInputArea}>
        <View style={styles.commentInputImageText}>
          <Image
            source={previewImg}
            style={styles.previewImg}
            resizeMode="contain"
          />
          <TextInput
            style={styles.inputStyles}
            placeholder="댓글을 남겨주세요등록"
            placeholderTextColor="#AFB9CA"
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.sendInput}>등록</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  mainContent: {
    height: '95%',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  detailsAreaMain: {
    padding: 10,
  },
  bookDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  booksItem: {
    marginHorizontal: 1,
    marginBottom: 20,
  },
  bookImage: {
    width: windowWidth,
    height: 480,
  },
  bookTitle: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  priceArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
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
  profileArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImageInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileImage: {
    width: 34,
    height: 34,
    borderRadius: 100,
  },
  previewImg: {
    width: 24,
    height: 24,
  },
  skillsIcon: {
    width: 14,
    height: 14,
    borderRadius: 100,
  },
  profileUserName: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  timeAgo: {
    color: '#919EB6',
    fontSize: 8,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  profileSettings: {},
  commentsArea: {
    marginLeft: '10%',
  },
  commentText: {
    color: '#313B49',
    fontSize: 11,
    fontWeight: '400',
    marginHorizontal: 5,
  },
  likeCommentArea: {
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  likeCommentCount: {
    color: '#AFB9CA',
    fontSize: 11,
    fontWeight: '400',
    marginHorizontal: 5,
  },
  replyArea: {
    marginLeft: '10%',
    marginVertical: 10,
  },
  borderArea: {
    flexDirection: 'row',
    width: '100%',
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  commentMainSection: {
    paddingHorizontal: 10,
  },
  commentInputArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '5%',
    width: '100%',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  commentInputImageText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputStyles: {
    fontSize: 10,
    marginLeft: 10,
    color: '#000',
  },
  sendInput: {
    color: '#919EB6',
    fontSize: 12,
  },
  fixedTextInputContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  commentInputImageText: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
  },
  inputStyles: {
    fontSize: 10,
    marginLeft: 10,
    color: '#000',
    flex: 1,
  },
  sendInput: {
    color: '#919EB6',
    fontSize: 12,
  },
});

export default BookDetails;
