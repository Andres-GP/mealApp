import { View, Text, ScrollView, Image, TextInput, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import Categories from '../components/categories';
import axios from 'axios';
import Recipes from '../components/recipes';
import tw from 'twrnc';

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState('Beef');
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchValue, setSearchValue] = useState('');


  useEffect(()=>{
    getCategories();
    getRecipes();
  },[])

  const handleChangeCategory = category=>{
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  }

  const handleSearch = () => {
    // Filtrar los elementos de meals basándote en el valor ingresado en el TextInput
    if(searchValue.length > 0){
      const filteredMeals = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(searchValue.toLowerCase())
      );
      setMeals(filteredMeals);
    } else {
      getRecipes()
    }
  };

  const getCategories = async ()=>{
    try{
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      // console.log('got categories: ',response.data);
      if(response && response.data){
        setCategories(response.data.categories);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  const getRecipes = async (category="Beef")=>{
    try{
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      // console.log('got recipes: ',response.data);
      if(response && response.data){
        setMeals(response.data.meals);
      }
    }catch(err){
      console.log('error: ',err.message);
    }
  }
  return (
    <View style={tw`flex-1 bg-white`}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        style={tw`space-y-6 pt-14`}
      >
        {/* greetings and punchline */}
        <View style={tw`mx-4 space-y-2 mb-3`}>
          <Text style={{ ...tw`text-neutral-600 mb-2`, fontSize: hp(1.7)}}>Hello, Human!</Text>
          <View>
            <Text style={{ ...tw`font-semibold text-neutral-600`, fontSize: hp(3.8)}}>Make your own food,</Text>
          </View>
          <Text style={{ ...tw`font-semibold text-neutral-600`, fontSize: hp(3.8)}}>
            stay at <Text style={tw`text-amber-400`}>home</Text>
          </Text>
        </View>

        {/*TODO search bar mejorar ui y conectar*/}
        {/*TODO conectar android simulator*/}
        <View style={tw`mx-4 flex-row items-center rounded-full bg-black/5 p-[6px] mb-3`}>
        <TextInput
            placeholder='Search any recipe'
            placeholderTextColor='gray'
            style={{
              ...tw`flex-1 pl-3 tracking-wider items-center`
            }}
            value={searchValue}
            onChangeText={(text) => setSearchValue(text)}
          />
          <Pressable style={tw`bg-white rounded-full p-3`} onPress={handleSearch}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </Pressable>
        </View>

        {/* categories */}
        <View style={tw`mb-4`}>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}