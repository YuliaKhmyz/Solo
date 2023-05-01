import React, { useEffect, useState } from 'react';
import './MyPage.css';
import Card from '../../types/Card';

function MyPage({ card }) {
  const [showMyCard, setShowMyCard] = useState<Card[]>([]);
  const [storage, setStorage] = useState([]);

  const checkStorage = () => {
    for (let i = 0; i < localStorage.length; i++) {
      storage.push(localStorage.getItem(localStorage.key(i)));
    }
    const myArt = storage.map((el) => JSON.parse(el)).flat();
    if (myArt) return setShowMyCard(myArt);
  };

  // const myArt = JSON.parse(localStorage.getItem('card'));

  const handleRemoveArt = (card: Card) => {
    localStorage.removeItem(`${card.id}`);
    setShowMyCard(showMyCard.filter((x) => x !== card));
  };

  const deleteAll = () => {
    localStorage.clear();
    setShowMyCard([]);
  };

  // setShowMyCard(myArt);

  return (
    <div className="main-container">
      <div className="greeting">
        <div className="greeting-content">
          <br />
          <br />
          <h3 className="display-9 text-center text-white">
            Welcome to Your Favorites!
          </h3>
          <p className="lead text-center text-white">
            {' '}
            Here you can compile your own Art Collection!
          </p>
          <img
            src="https://assets.vogue.ru/photos/6002adbcbbc157de5445e974/16:9/w_1920,h_1080,c_limit/N7JZ6QGG7NGJ7DCPRGHBTKHRTE.jpg"
            className="img"
            alt="pic"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary search-button ml-1 mb-5"
          onClick={() => {
            checkStorage();
          }}
        >
          Show My Collection
        </button>
        <button
          type="submit"
          className="btn btn-danger search-button ml-1 mb-5"
          onClick={() => {
            deleteAll();
          }}
        >
          Delete All Favorites
        </button>
      </div>
      {showMyCard.map((card) => (
        <div className="result-container" data-id={card.id}>
          <div className="card mb-2">
            <div className="row">
              <div className="col-md-4 image-col">
                <img
                  src={card.img}
                  className="img-fluid rounded-start"
                  alt="pic"
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
              onClick={() => handleEditArt(card)}
            >
              Add notes
            </button>
            <button
              type="button"
              className="btn add-btn btn-danger ml-1"
              onClick={() => handleRemoveArt(card)}
            >
              Delete from My Collection
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyPage;
