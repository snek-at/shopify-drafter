import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import React from 'react';
import { StyleSheet, Dimensions, View, Text} from 'react-native';

import { Draft } from "../types";
import * as Colors from "../styles/Colors"

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenHeight - 300,
    backgroundColor: "white",
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    fontSize: 13,
    fontStyle: 'italic',
},
})

interface Props {
  route: any,
  navigation: any,
}

export default function CardCarousel (drafts: any){

  function renderItem ({item, index}: any, parallaxProps: any){
    return (
      <View style={styles.item}>
        <ParallaxImage
            source={item.thumbnail}
            containerStyle={styles.imageContainer}
            style={styles.image}
            {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={1}>
            { item.name }
        </Text>
        <Text style={styles.subtitle} numberOfLines={3}>
            { item.description }
        </Text>
      </View>
    );
  }

  const ENTRIES1 = [
    {
      title: 'Beautiful and dramatic Antelope Canyon',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      thumbnail: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
      title: 'Earlier this morning, NYC',
      subtitle: 'Lorem ipsum dolor sit amet',
      thumbnail: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
      title: 'White Pocket Sunset',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
      thumbnail: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
      title: 'Acrocorinth, Greece',
      subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
      thumbnail: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
      title: 'The lone tree, majestic landscape of New Zealand',
      subtitle: 'Lorem ipsum dolor sit amet',
      thumbnail: 'https://avatars.githubusercontent.com/u/55298934?v=4',
    },
  ];

  return (
    <Carousel
      sliderWidth={screenWidth}
      sliderHeight={screenWidth}
      itemWidth={screenWidth - 60}
      data={drafts.drafts}
      renderItem={renderItem}
      hasParallaxImages={true}
    />
  );
}