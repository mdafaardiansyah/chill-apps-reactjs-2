import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import addIcon from '../../assets/images/icons/plus.png';
import deleteIcon from '../../assets/images/icons/delete.png';
import editIcon from '../../assets/images/icons/edit.png';
// Import data film favorit dan genre dari folder data
import { favoriteMovies as initialFavoriteMovies, MOVIE_GENRES } from '../../data';

const MovieList = () => {
  // State untuk menyimpan daftar film favorit
  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    // Coba ambil data dari localStorage saat komponen dimuat
    const savedMovies = localStorage.getItem('favoriteMovies');
    return savedMovies ? JSON.parse(savedMovies) : initialFavoriteMovies;
  });
  
  // Simpan ke localStorage setiap kali favoriteMovies berubah
  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, [favoriteMovies]);

  // State untuk form penambahan/edit film
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: ''
  });

  // State untuk mode edit
  const [editMode, setEditMode] = useState(false);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  
  // State untuk menampilkan form
  const [showForm, setShowForm] = useState(false);

  // Handler untuk perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handler untuk menambah film baru
  const handleAddMovie = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.genre || !formData.rating) {
      alert('Semua field harus diisi!');
      return;
    }

    const newMovie = {
      id: favoriteMovies.length > 0 ? Math.max(...favoriteMovies.map(movie => movie.id)) + 1 : 1,
      title: formData.title,
      genre: formData.genre,
      rating: parseFloat(formData.rating)
    };

    setFavoriteMovies([...favoriteMovies, newMovie]);
    resetForm();
  };

  // Handler untuk mengedit film
  const handleEditMovie = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.genre || !formData.rating) {
      alert('Semua field harus diisi!');
      return;
    }

    const updatedMovies = favoriteMovies.map(movie => {
      if (movie.id === currentMovieId) {
        return {
          ...movie,
          title: formData.title,
          genre: formData.genre,
          rating: parseFloat(formData.rating)
        };
      }
      return movie;
    });

    setFavoriteMovies(updatedMovies);
    resetForm();
  };

  // Handler untuk menghapus film
  const handleDeleteMovie = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus film ini?')) {
      const filteredMovies = favoriteMovies.filter(movie => movie.id !== id);
      setFavoriteMovies(filteredMovies);
    }
  };

  // Handler untuk memulai edit film
  const startEditMovie = (movie) => {
    setFormData({
      title: movie.title,
      genre: movie.genre,
      rating: movie.rating.toString()
    });
    setEditMode(true);
    setCurrentMovieId(movie.id);
    setShowForm(true);
  };

  // Reset form setelah submit
  const resetForm = () => {
    setFormData({
      title: '',
      genre: '',
      rating: ''
    });
    setEditMode(false);
    setCurrentMovieId(null);
    setShowForm(false);
  };

  return (
    <section className="movie-list-section">
      <div className="container">
        <div className="movie-list-header">
          <h2 className="movie-list-title">Film Favorit Saya</h2>
          <button 
            className="btn btn-add" 
            onClick={() => setShowForm(!showForm)}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#1F1D2B', border: '1px solid gray', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}
          >
            <img src={addIcon} alt="Add" style={{ width: '16px', height: '16px' }} />
            Tambah Film
          </button>
        </div>

        {showForm && (
          <div className="movie-form" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#1F1D2B',border: '1px solid gray', borderRadius: '8px' }}>
            <h3>{editMode ? 'Edit Film' : 'Tambah Film Baru'}</h3>
            <form onSubmit={editMode ? handleEditMovie : handleAddMovie} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="title">Judul Film</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#2B2A3A', border: '1px solid #3A3950', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="genre">Genre</label>
                <select
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#2B2A3A', border: '1px solid #3A3950', color: 'white' }}
                >
                  <option value="">Pilih Genre</option>
                  {MOVIE_GENRES.map((genre, index) => (
                    <option key={index} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label htmlFor="rating">Rating (1-5)</label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#2B2A3A', border: '1px solid #3A3950', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="submit" 
                  style={{ padding: '8px 16px', backgroundColor: '#5142FC', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  {editMode ? 'Simpan Perubahan' : 'Tambah Film'}
                </button>
                <button 
                  type="button" 
                  onClick={resetForm}
                  style={{ padding: '8px 16px', backgroundColor: '#3A3950', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {favoriteMovies.length > 0 ? (
          <div className="movie-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {favoriteMovies.map((movie) => (
              <div key={movie.id} className="movie-card" style={{ backgroundColor: '#1F1D2B', borderRadius: '8px', padding: '15px',border: '1px solid gray', position: 'relative' }}>
                <div className="movie-actions" style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '5px' }}>
                  <button 
                    onClick={() => startEditMovie(movie)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px' }} />
                  </button>
                  <button 
                    onClick={() => handleDeleteMovie(movie.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                  </button>
                </div>
                <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>{movie.title}</h3>
                <p style={{ color: '#8E8E8E', marginBottom: '5px' }}>{movie.genre}</p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ color: '#FFD700', marginRight: '5px' }}>★</span>
                  <span>{movie.rating}/5</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px 0' }}>
            <p>Belum ada film favorit. Tambahkan film favorit Anda!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieList;