import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Book } from '@/src/types'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
type Props = {
    book: Book
}

const HorizontalBookItem: React.FC<Props> = ({ book }) => {
  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
        <Image source={{ uri: book.cover }} style={styles.image} />
        <View style={{ marginLeft: 10 , justifyContent: 'center' }}>
    <Text style={styles.title}>{book.title}</Text>
    <Text style={styles.artist}>{book.artist}</Text>
    </View>
    </View>
  </View>
  )
}

export default HorizontalBookItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#090917',
        borderRadius: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    title: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        width: moderateScale(200),
    },
    artist: {
        color: '#fff',
        fontSize: 12,
    },
})