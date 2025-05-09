import React, { useState, useEffect } from 'react';
import addIcon from '../../assets/images/icons/plus.png';
import deleteIcon from '../../assets/images/icons/delete.png';
import checkIcon from '../../assets/images/icons/check.png';
// Import data watchlist dari folder data
import { watchlistMovies } from '../../data';

const WatchlistManager = () => {
  // State untuk menyimpan daftar film yang ingin ditonton
  const [watchlist, setWatchlist] = useState(() => {
    // Coba ambil data dari localStorage saat komponen dimuat
    const savedWatchlist = localStorage.getItem('watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : watchlistMovies;
  });
  
  // Simpan ke localStorage setiap kali watchlist berubah
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // State untuk form penambahan film
  const [newMovieTitle, setNewMovieTitle] = useState('');
  
  // State untuk menampilkan form
  const [showForm, setShowForm] = useState(false);

  // Handler untuk menambah film baru ke watchlist
  const handleAddToWatchlist = (e) => {
    e.preventDefault();
    
    if (!newMovieTitle.trim()) {
      alert('Judul film tidak boleh kosong!');
      return;
    }

    const newMovie = {
      id: watchlist.length > 0 ? Math.max(...watchlist.map(movie => movie.id)) + 1 : 1,
      title: newMovieTitle.trim(),
      status: "pending"
    };

    setWatchlist([...watchlist, newMovie]);
    setNewMovieTitle('');
    setShowForm(false);
  };

  // Handler untuk menandai film sudah ditonton
  const handleMarkAsWatched = (id) => {
    const updatedWatchlist = watchlist.map(movie => {
      if (movie.id === id) {
        return {
          ...movie,
          status: movie.status === "watched" ? "pending" : "watched"
        };
      }
      return movie;
    });

    setWatchlist(updatedWatchlist);
  };

  // Handler untuk menghapus film dari watchlist
  const handleRemoveFromWatchlist = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus film ini dari watchlist?')) {
      const filteredWatchlist = watchlist.filter(movie => movie.id !== id);
      setWatchlist(filteredWatchlist);
    }
  };

  return (
    <section className="watchlist-section">
      <div className="container">
        <div className="watchlist-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
          <h2 className="watchlist-title">Watchlist Saya</h2>
          <button 
            className="btn btn-add" 
            onClick={() => setShowForm(!showForm)}
            style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#5142FC', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
          >
            <img src={addIcon} alt="Add" style={{ width: '16px', height: '16px' }} />
            Tambah ke Watchlist
          </button>
        </div>

        {showForm && (
          <div className="watchlist-form" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#1F1D2B',border: '1px solid gray', borderRadius: '8px' }}>
            <h3>Tambah Film ke Watchlist</h3>
            <form onSubmit={handleAddToWatchlist} style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <input
                type="text"
                value={newMovieTitle}
                onChange={(e) => setNewMovieTitle(e.target.value)}
                placeholder="Judul film"
                style={{ flex: 1, padding: '8px', borderRadius: '4px', backgroundColor: '#2B2A3A', border: '1px solid #3A3950', color: 'white' }}
              />
              <button 
                type="submit" 
                style={{ padding: '8px 16px', backgroundColor: '#5142FC', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Tambah
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                style={{ padding: '8px 16px', backgroundColor: '#3A3950', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Batal
              </button>
            </form>
          </div>
        )}

        {watchlist.length > 0 ? (
          <div className="watchlist-items" style={{ backgroundColor: '#1F1D2B', borderRadius: '8px',border: '1px solid gray', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #3A3950' }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Judul Film</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((movie) => (
                  <tr key={movie.id} style={{ borderBottom: '1px solid #3A3950' }}>
                    <td style={{ padding: '15px' }}>{movie.title}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: movie.status === 'watched' ? '#4CAF50' : '#FFA500',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {movie.status === 'watched' ? 'Sudah Ditonton' : 'Belum Ditonton'}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button 
                          onClick={() => handleMarkAsWatched(movie.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                          title={movie.status === 'watched' ? 'Tandai belum ditonton' : 'Tandai sudah ditonton'}
                        >
                          <img src={checkIcon} alt="Mark" style={{ width: '20px', height: '20px', opacity: movie.status === 'watched' ? 1 : 0.5 }} />
                        </button>
                        <button 
                          onClick={() => handleRemoveFromWatchlist(movie.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                          title="Hapus dari watchlist"
                        >
                          <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state" style={{ textAlign: 'center', padding: '40px 0', backgroundColor: '#1F1D2B', borderRadius: '8px' }}>
            <p>Watchlist Anda kosong. Tambahkan film yang ingin Anda tonton!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WatchlistManager;