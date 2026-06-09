import React from 'react';
import Hero from '../components/Hero/Hero';
import Categories from '../components/Categories/Categories';
import NewArrivals from '../components/NewArrivals/NewArrivals';
import Trending from '../components/Trending/Trending';
import Reviews from '../components/Reviews/Reviews';
import Newsletter from '../components/Newsletter/Newsletter';

const Home = () => (
  <div>
    <Hero />
    <Categories />
    <NewArrivals />
    <Trending />
    <Reviews />
    <Newsletter />
  </div>
);

export default Home;