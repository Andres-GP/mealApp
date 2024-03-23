import { View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from '../helpers/image';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import {  HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loader from '../components/loader';
import YouTubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import tw from 'twrnc';

const ios = Platform.OS=='ios';

export default function RecipeDetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getMealData(item.idMeal);
    },[])

    const getMealData = async (id)=>{
        try{
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        //   console.log('got meal data: ',response.data);
          if(response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
          }
        }catch(err){
          console.log('error: ',err.message);
        }
    }

    const ingredientsIndexes = (meal)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = url=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
    }

    const handleOpenLink = url=>{
        Linking.openURL(url);
    }

  return (
    <View style={tw`flex-1 bg-white relative`}>
        <StatusBar style={"light"} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}
        >
        
        {/* recipe image */}
        <View style={tw`flex-row justify-center`}>
            <CachedImage
                uri={item.strMealThumb}
                style={{width: wp(100), height: hp(50)}}

            />
        </View>

        {/* back button */}
        <Animated.View entering={FadeIn.delay(200).duration(1000)} style={tw`w-full absolute flex-row justify-between items-center pt-14`}>
            <Pressable onPress={()=> navigation.goBack()} style={tw`p-2 rounded-full ml-5 bg-white`}>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
            </Pressable>
            <Pressable onPress={()=> setIsFavourite(!isFavourite)} style={tw`p-2 rounded-full mr-5 bg-white`}>
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "#fbbf24": "gray"} />
            </Pressable>
        </Animated.View>

        {/* meal description */}
        {
            loading? (
                <Loader style={tw`mt-16`} />
            ):(
                <View style={tw`px-4 flex justify-between space-y-4 pt-5`}>
                    {/* name and area */}
                    <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={tw`space-y-2`}>
                        <Text style={{ ...tw`font-bold flex-1 text-neutral-700`, fontSize: hp(3)}}>
                            {meal?.strMeal}
                        </Text>
                        <Text style={{ ...tw`font-medium flex-1 text-neutral-500 mt-1`, fontSize: hp(2)}}>
                            {meal?.strArea}
                        </Text>
                    </Animated.View>

                    {/* misc */}
                    <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={tw`flex-row justify-between mt-4`}>
                        <View style={tw`flex rounded-full bg-amber-300 p-2 t`}>
                            <View 
                                style={{ ...tw`bg-white rounded-full flex items-center justify-center`, height: hp(6.5), width: hp(6.5)}}
                            >
                                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View style={tw`flex items-center py-2 space-y-1`}>
                                <Text style={{...tw`font-bold text-neutral-700`, fontSize: hp(2)}}>
                                    35
                                </Text>
                                <Text style={{...tw`font-bold text-neutral-700`, fontSize: hp(1.3)}}>
                                    Mins
                                </Text>
                            </View>
                        </View>
                        <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                            <View 
                                style={{...tw`bg-white rounded-full flex items-center justify-center`, height: hp(6.5), width: hp(6.5)}}
                            >
                                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View style={tw`flex items-center py-2 space-y-1`}>
                                <Text style={{ ...tw`font-bold text-neutral-700`, fontSize: hp(2)}}>
                                    03
                                </Text>
                                <Text style={{ ...tw`font-bold text-neutral-700`, fontSize: hp(1.3)}}>
                                    Servings
                                </Text>
                            </View>
                        </View>
                        <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                            <View 
                                style={{ ...tw`bg-white rounded-full flex items-center justify-center`, height: hp(6.5), width: hp(6.5)}}
                            >
                                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View style={tw`flex items-center py-2 space-y-1`}>
                                <Text style={{ ...tw`font-bold text-neutral-700`, fontSize: hp(2)}}>
                                    103
                                </Text>
                                <Text style={{ ...tw`font-bold text-neutral-700`, fontSize: hp(1.3)}}>
                                    Cal
                                </Text>
                            </View>
                        </View>
                        <View style={tw`flex rounded-full bg-amber-300 p-2`}>
                            <View 
                                style={{ ...tw`bg-white rounded-full flex items-center justify-center`, height: hp(6.5), width: hp(6.5)}}
                            >
                                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View style={tw`flex items-center py-2 space-y-1`}>
                                <Text style={{ ...tw`font-bold text-neutral-700`, fontSize: hp(2)}}>
                                    103
                                </Text>
                                <Text style={{ ...tw`font-bold text-neutral-700`, fontSize: hp(1.3)}}>
                                    Easy
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* ingredients */}
                    <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={tw`space-y-4`}>
                        <Text style={{ ...tw`font-bold flex-1 text-neutral-700 mt-5`, fontSize: hp(2.5)}}>
                            Ingredients
                        </Text>
                        <View style={tw`space-y-2 mt-4`}>
                            {
                                ingredientsIndexes(meal).map(i=>{
                                    return (
                                        <View key={i} style={tw`flex-row items-center space-x-4 mb-3`}>
                                            <View style={{ ...tw`bg-amber-300 rounded-full mr-2`, height: hp(1.5), width: hp(1.5)}} />
                                            <View style={tw`flex-row space-x-2`}>
                                                <Text style={{...tw`font-extrabold text-neutral-700 mr-1`, fontSize: hp(1.7)}}>{meal['strMeasure'+i]}</Text>
                                                <Text style={{...tw`font-medium text-neutral-600`, fontSize: hp(1.7)}}>{meal['strIngredient'+i]}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </Animated.View>
                    {/* instructions */}
                    <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={tw`space-y-4`}>
                        <Text style={{ ...tw`font-bold flex-1 text-neutral-700 mt-3`, fontSize: hp(2.5)}}>
                            Instructions
                        </Text>
                        <Text style={{...tw`text-neutral-700 mt-3`, fontSize: hp(1.6)}}>
                            {
                                meal?.strInstructions
                            }
                        </Text>
                    </Animated.View>

                    {/* recipe video */}

                    {
                        meal.strYoutube && (
                            <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} style={tw`space-y-4`}>
                                <Text style={{...tw`font-bold flex-1 text-neutral-700 mt-6 mt-4 mb-3`, fontSize: hp(2.5)}}>
                                    Recipe Video
                                </Text>
                                <View>
                                    {/* YoutubeIfram uses webview and it does not work properly on android (until its fixed we'll just show the video on ios) */}
                                    {
                                        ios? (
                                            <YouTubeIframe
                                                webViewProps={{
                                                    overScrollMode: "never" // a fix for webview on android - which didn't work :(
                                                }}
                                                videoId={getYoutubeVideoId(meal.strYoutube)}
                                                height={hp(30)}
                                            />
                                        ):(
                                            <TouchableOpacity style={tw`mb-5`} onPress={()=> handleOpenLink(meal.strYoutube)}>
                                                <Text style={{...tw`text-blue-600`, fontSize: hp(2)}}>{meal.strYoutube}</Text>
                                            </TouchableOpacity>
                                            
                                        )
                                    }
                                    
                                </View>
                            </Animated.View>
                        )
                    }


                </View>
            )
        }
        </ScrollView>
    </View>
    
  )
}