import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import MovieCarousel from '../components/home/MovieCarousel';

// Import data dari folder data
import { continueWatchingMovies, topRatingMovies, trendingMovies } from '../data';


const Home = () => {
  // State untuk mengelola film yang sedang ditonton
  const [watchingMovies] = useState(continueWatchingMovies);
  
  // Fungsi untuk menghapus film akan diimplementasikan nanti
  // const removeFromWatching = (movieTitle) => {
  //   setWatchingMovies(watchingMovies.filter(movie => movie.title !== movieTitle));
  // };

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <Hero />
        <MovieCarousel 
          title="Melanjutkan Tonton Film" 
          type="landscape" 
          movies={watchingMovies} 
        />

        <MovieCarousel 
          title="Top Rating Film dan Series Hari ini" 
          type="portrait" 
          movies={topRatingMovies} 
        />
        <MovieCarousel 
          title="Film Trending" 
          type="portrait" 
          movies={trendingMovies} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default Home;