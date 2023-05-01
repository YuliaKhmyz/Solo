import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';
import Card from '../../types/Card';
import './SearchPage.css';
import MyArtView from '../MyArt/MyArt.tsx';

function SearchPage() {
  const [searchword, setSearchWord] = useState('');
  const [searchResult, setSearchResult] = useState<number[]>([]);
  const [showCard, setShowCard] = useState<Card[]>([]);
  // const [showAddCard, setAddShowCard] = useState<Card[]>([]);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchWord(event.target.value);
  };

  const searchArt = () => {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchword}`
    )
      .then((response) => response.json())
      .then((data) => {
        const items = data.objectIDs
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
        setSearchResult(items);
        setSearchWord('');
      });
  };

  useEffect(() => {
    searchResult.forEach((el) =>
      fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${String(
          el
        )}`
      )
        .then((response) => response.json())
        .then((card) => {
          return setShowCard((prev) => [
            ...prev,
            {
              id: card.objectID,
              title: card.title,
              link: card.objectURL,
              artist: card.artistDisplayName,
              bio: card.artistDisplayBio,
              img: card.primaryImage,
              wiki: card.objectWikidata_URL,
              notes: '',
            },
          ]);
        })
    );
  }, [searchResult]);

  // //   Надо записать массив в реслокалс

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  // const handleRemoveArt = (card: Card) => {
  //   setShowCard(showCard.filter((x) => x !== card));
  // };

  // const handleEditArt = (card: Card) => {
  //   // document.getElementsByClassName('review').style.display = 'block';
  // };

  // const handleAddArt = (card: Card) => {
  //   setShowCard(showCard.filter((x) => x === card));
  // };

  return (
    <div className="main-container">
      <div className="greeting">
        <div className="greeting-content">
          <br />
          <br />
          <h3 className="display-9 text-center text-white">
            Welcome to My Metropolitan!
          </h3>
          <p className="lead text-center text-white">
            {' '}
            Here you can explore the Metropolitan Art Collection!
          </p>
          <img
            src="https://404content.bm.digital/v1/storage/image/fit/833/755/078/506/849/681.jpg?h=600&q=90"
            className="img"
            alt="pic"
          />
        </div>
      </div>
      <div className="search-container d-flex">
        <h5 className="input-group-text search-button">Search Art Piece</h5>
        <form className="input-form" onSubmit={handleFormSubmit}>
          <div className="input-group">
            <input
              type="text"
              aria-label="Artist"
              className="form-control ml-1"
              placeholder="Rembrandt"
              value={searchword}
              onChange={handleSearch}
            />
            {/* <input type="text" aria-label="" className="form-control" /> */}
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-primary search-button ml-1"
          onClick={() => {
            searchArt();
          }}
        >
          Search
        </button>
      </div>
      {showCard.map((card) => (
        <MyArtView key={card.id} card={card} />
      ))}
    </div>
  );
}

export default SearchPage;
