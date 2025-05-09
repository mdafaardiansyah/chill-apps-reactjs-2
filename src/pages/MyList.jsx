import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import MovieList from '../components/home/MovieList';
import WatchlistManager from '../components/home/WatchlistManager';

const MyList = () => {
  return (
    <div className="mylist-page">
      <Header />
      <main className="main-content">
        <div className="container" style={{ paddingTop: '40px' }}>
          <h1 style={{ marginBottom: '30px', fontSize: '28px' }}>Daftar Saya</h1>
          <MovieList />
          <WatchlistManager />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyList;