import './App.css';
import React, { useState } from 'react';
import SearchPage from '../SearchPage/SearchPage.tsx';
import MyPage from '../MyPage/MyPage.tsx';

type pageType = 'search' | 'favorites';

function App() {
  const [page, setPage] = useState<pageType>('search');

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg">
        <img
          src="https://i.pinimg.com/736x/ce/68/c6/ce68c65361fa2462a0b5e6796367dc8b.jpg"
          className="img-fluid logo rounded-start w-8"
          alt="logo"
        />
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button
                type="button"
                className="btns nav-link mr-4"
                onClick={() => setPage('search')}
              >
                Search the Metropolitan Museum of Art
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btns nav-link"
                onClick={() => setPage('favorites')}
              >
                My Favorite Art Pieces
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* <img width={400} src={logo} alt="react" /> */}
      {page === 'search' ? <SearchPage /> : <MyPage />}
      {/* <TweetsList /> */}
    </div>
  );
}

// if (page ===)

export default App;
