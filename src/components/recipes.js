import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loader from './loader';
import { CachedImage } from '../helpers/image';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';

export default function Recipes({categories, meals}) {
    const navigation = useNavigation();  return (
    <View style={tw`space-y-3`}>
      <Text style={{ ...tw`font-semibold text-neutral-600 mx-4`, fontSize: hp(3) }}>Recipes</Text>
      <View>
        {
            categories.length==0 || meals.length==0?(
                <Loader style={tw`mt-20`} />
            ) : (
                <MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, i}) => <RecipeCard item={item} index={i} navigation={navigation} />}
                    onEndReachedThreshold={0.1}      
                />
            )
        }
            
      </View>
    </View>
  )
}

const RecipeCard = ({item, index, navigation})=>{
    let isEven = index%2==0;
    return (
        <Animated.View 
            entering={
                FadeInDown.delay(index*100).duration(600).springify().damping(12)
            } 
            style={{ 
                ...tw`mx-auto px-5 pt-5 shadow-xl overflow-visible`, 
                paddingLeft: isEven? 15 : 8, paddingRight: isEven ? 8 : 15
            }}
        >                      
            <Pressable style={tw`max-w-xs rounded-lg bg-white p-2 duration-150`} onPress={()=> navigation.navigate('RecipeDetail', {...item})}>
                    <CachedImage
                        uri={item.strMealThumb}
                        style={{ ...tw`w-full rounded-lg object-cover object-center`, width: wp(40), height: hp(15)}}
                    />
                    <Text style={tw`my-3 font-bold text-gray-500`}>
                        {
                            item.strMeal.length>20? item.strMeal.slice(0,20)+'...': item.strMeal
                        }
                    </Text>
            </Pressable>
        </Animated.View>
    )
}
