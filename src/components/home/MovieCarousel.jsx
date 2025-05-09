import React, { useRef, useState } from 'react';
import arrowLeftIcon from '../../assets/images/icons/arrow-left.png';
import arrowRightIcon from '../../assets/images/icons/arrow-right.png';
import heartIcon from '../../assets/images/icons/heart.png';
import heartFilledIcon from '../../assets/images/icons/heart-filled.png';
import ShareMovieModal from './ShareMovieModal';

const MovieCarousel = ({ title, type = 'landscape', movies }) => {
  const carouselRef = useRef(null);
  
  // State untuk menyimpan film yang disukai
  const [likedMovies, setLikedMovies] = useState([]);
  
  // State untuk modal detail film
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // State untuk modal berbagi film
  const [showShareModal, setShowShareModal] = useState(false);

  const scrollLeft = () => {
    if (carouselRef.current) {
      // Menghitung lebar item untuk scroll yang lebih akurat
      const scrollAmount = carouselRef.current.clientWidth / 2;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      // Menghitung lebar item untuk scroll yang lebih akurat
      const scrollAmount = carouselRef.current.clientWidth / 2;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="carousel-section">
      <div className="container">
        <div className="carousel-header">
          <h2 className="carousel-title">{title}</h2>
        </div>

        <div className="scroll-container" style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div className="scroll-arrow scroll-arrow-left" onClick={scrollLeft} style={{ position: 'absolute', left: '0', zIndex: 10, cursor: 'pointer', padding: '10px', backgroundColor: 'rgba(31, 29, 43, 0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)' }}>
            <img src={arrowLeftIcon} alt="Scroll Left" style={{ width: '24px', height: '24px' }} />
          </div>

          <div className="movie-carousel" ref={carouselRef} style={{ display: 'flex', overflowX: 'auto', scrollBehavior: 'smooth', width: '100%', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style jsx>{`
              .movie-carousel::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {movies.map((movie, index) => (
              <div key={index} className={`movie-card movie-card-${type}`} style={{ position: 'relative' }}>
                <div className="movie-poster" style={{ position: 'relative', cursor: 'pointer' }} onClick={() => {
                  setSelectedMovie(movie);
                  setShowModal(true);
                }}>
                  <img src={movie.poster} alt={movie.title} />
                  {movie.info && type === 'landscape' && (
                    <div className="movie-info">
                      <h3>{movie.title}</h3>
                      <div className="rating">
                        <span>★ {movie.rating}/5</span>
                      </div>
                    </div>
                  )}
                  {movie.badge && (
                    <span className={`badge badge-${movie.badge.type}`}>{movie.badge.text}</span>
                  )}
                  
                  <div className="movie-actions" style={{ 
                    position: 'absolute', 
                    bottom: '10px', 
                    right: '10px', 
                    display: 'flex', 
                    gap: '5px',
                    zIndex: 5
                  }}>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (likedMovies.includes(movie.title)) {
                          setLikedMovies(likedMovies.filter(title => title !== movie.title));
                        } else {
                          setLikedMovies([...likedMovies, movie.title]);
                        }
                      }}
                      style={{ 
                        background: 'rgba(31, 29, 43, 0.7)', 
                        border: 'none', 
                        borderRadius: '50%', 
                        width: '32px', 
                        height: '32px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <img 
                        src={likedMovies.includes(movie.title) ? heartFilledIcon : heartIcon} 
                        alt="Like" 
                        style={{ width: '16px', height: '16px' }} 
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-arrow scroll-arrow-right" onClick={scrollRight} style={{ position: 'absolute', right: '0', zIndex: 10, cursor: 'pointer', padding: '10px', backgroundColor: 'rgba(31, 29, 43, 0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', top: '50%', transform: 'translateY(-50%)' }}>
            <img src={arrowRightIcon} alt="Scroll Right" style={{ width: '24px', height: '24px' }} />
          </div>
        </div>
      </div>
      
      {/* Modal Detail Film */}
      {showModal && selectedMovie && (
        <div className="movie-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: '#1F1D2B',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'auto',
            position: 'relative',
            padding: '20px'
          }}>
            <button 
              className="close-modal" 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            
            <div className="modal-header" style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div className="modal-poster" style={{ flexShrink: 0, width: '150px' }}>
                <img src={selectedMovie.poster} alt={selectedMovie.title} style={{ width: '100%', borderRadius: '8px' }} />
              </div>
              <div className="modal-info">
                <h2 style={{ marginBottom: '10px' }}>{selectedMovie.title}</h2>
                <div className="modal-rating" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
                  <span>{selectedMovie.rating}/5</span>
                </div>
                <div className="modal-actions" style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                  <button 
                    className="btn-watch" 
                    style={{ 
                      backgroundColor: '#5142FC', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 16px', 
                      borderRadius: '4px', 
                      cursor: 'pointer' 
                    }}
                  >
                    Tonton Sekarang
                  </button>
                  <button 
                    className="btn-like" 
                    onClick={() => {
                      if (likedMovies.includes(selectedMovie.title)) {
                        setLikedMovies(likedMovies.filter(title => title !== selectedMovie.title));
                      } else {
                        setLikedMovies([...likedMovies, selectedMovie.title]);
                      }
                    }}
                    style={{ 
                      backgroundColor: likedMovies.includes(selectedMovie.title) ? '#E53935' : '#3A3950', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 16px', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <img 
                      src={likedMovies.includes(selectedMovie.title) ? heartFilledIcon : heartIcon} 
                      alt="Like" 
                      style={{ width: '16px', height: '16px' }} 
                    />
                    {likedMovies.includes(selectedMovie.title) ? 'Disukai' : 'Suka'}
                  </button>
                  <button 
                    className="btn-share" 
                    onClick={() => setShowShareModal(true)}
                    style={{ 
                      backgroundColor: '#3A3950', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 16px', 
                      borderRadius: '4px', 
                      cursor: 'pointer'
                    }}
                  >
                    Bagikan
                  </button>
                </div>
              </div>
            </div>
            
            <div className="modal-description">
              <h3 style={{ marginBottom: '10px' }}>Deskripsi</h3>
              <p style={{ color: '#8E8E8E', lineHeight: '1.6' }}>
                {selectedMovie.description || 'Film ini adalah bagian dari koleksi film populer di Chill Movie Apps. Tonton sekarang untuk menikmati pengalaman menonton yang seru!'}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal Berbagi Film */}
      {showShareModal && selectedMovie && (
        <ShareMovieModal 
          movie={selectedMovie} 
          isOpen={showShareModal} 
          onClose={() => setShowShareModal(false)} 
        />
      )}
    </section>
  );
};

export default MovieCarousel;