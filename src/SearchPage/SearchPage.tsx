import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react';
import Card from '../../types/Card';
import './SearchPage.css';
import MyArtView from '../MyArt/MyArt';

function SearchPage() {
  const [searchword, setSearchWord] = useState('');
  const [searchResult, setSearchResult] = useState<number[]>([]);
  const [showCard, setShowCard] = useState<Card[]>([]);
  const [storage, setStorage] = useState([]);
  const [showAddCard, setAddShowCard] = useState<Card[]>([]);

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
          .slice(0, 11);
        setSearchResult(items);
        setSearchWord('');
      });
  };

  const items = useEffect(() => {
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

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
  };

  const handleRemoveArt = (card: Card) => {
    setShowCard(showCard.filter((x) => x !== card));
    console.log(showCard);
  };

  const handleEditArt = (card: Card) => {
    document.getElementsByClassName('review').style.display = 'block';
  };

  const handleAddArt = (card: Card) => {
    showCard.filter((x) => x === card);
    setStorage([]);
    storage.push(card);
    console.log(storage);
    localStorage.setItem(`${card.id}`, JSON.stringify(storage));
  };

  const deleteAll = () => {
    setShowCard([]);
  };

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
        <div className="result-container" data-id={card.id}>
          <div className="card mb-2">
            <div className="row">
              <div className="col-md-4 image-col">
                <img
                  src={card.img}
                  className="img-fluid rounded-start"
                  alt="no pic in api"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {card.artist} <br /> <br />
                    {card.title}
                  </h5>
                  <h6 className="card-title mb-2">{card.bio}</h6>
                  <input
                    className="review"
                    placeholder="add your notes"
                    style={{ display: 'none' }}
                  ></input>
                  <p className="card-text">{card.notes}</p>
                  <p className="card-text">
                    <a href={card.link}>Link to the Metropolitan Museum site</a>
                    <a href={card.wiki}>Link to the Wikipedia page</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 d-md-block">
            <button
              type="button"
              className="btn add-btn btn-primary ml-1"
              onClick={() => handleAddArt(card)}
            >
              Add to My Favorites
            </button>
            <button
              type="button"
              className="btn add-btn btn-danger ml-1"
              onClick={() => handleRemoveArt(card)}
            >
              Delete from collection
            </button>
          </div>
        </div>
      ))}
      <button
        type="submit"
        className="btn btn-danger search-button ml-1 mb-5"
        onClick={() => {
          deleteAll();
        }}
      >
        Clear All
      </button>
    </div>
  );
}

export default SearchPage;
