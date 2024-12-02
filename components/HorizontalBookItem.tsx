import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Book } from '@/src/types';
import { moderateScale, scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { openBottomSheet } from '@/src/redux/reducers/Drawer';
type Props = {
    book: Book
    onItemPress: () => void
}

const HorizontalBookItem: React.FC<Props> = ({ book, onItemPress }) => {

  return (
    <View style={styles.container}>
        <Pressable
        onPress={() => onItemPress(book)}
         style={{ flexDirection: 'row' }}>
        <Image source={{ uri: book.cover }} style={styles.image} />
        <View style={{ marginLeft: 10 , justifyContent: 'center' }}>
    <Text style={styles.title}>{book.title}</Text>
    <Text style={styles.artist}>{book.artist}</Text>
    </View>
    </Pressable>
  </View>
  )
}

export default HorizontalBookItem

const styles = StyleSheet.create({
    container: {
        padding: scale(10),
        backgroundColor: '#090917',
        borderRadius: moderateScale(10),
    },
    image: {
        width: moderateScale(60),
        height: moderateScale(60),
        borderRadius: moderateScale(10),
    },
    title: {
        color: '#fff',
        fontSize: moderateScale(13),
        fontWeight: 'bold',
        width: moderateScale(200),
    },
    artist: {
        color: '#fff',
        fontSize: moderateScale(11),
    },
})