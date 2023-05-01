import React, { useEffect, useState } from 'react';
import './MyArt.css';
import Card from '../types/Card';

type MyArtProps = {
  card: Card;
};

function MyArtView({ card }: MyArtProps) {
  const [showCard, setShowCard] = useState<Card[]>([]);
  const [showAddCard, setAddShowCard] = useState<Card[]>([]);

  // const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
  //   setSearchWord(event.target.value);
  // };

  // const searchArt = () => {
  //   fetch(
  //     `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${searchword}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const items = data.objectIDs
  //         .sort(() => Math.random() - 0.5)
  //         .slice(0, 10);
  //       setSearchResult(items);
  //       setSearchWord('');
  //     });
  // };

  // useEffect(() => {
  //   searchResult.forEach((el) =>
  //     fetch(
  //       `https://collectionapi.metmuseum.org/public/collection/v1/objects/${String(
  //         el
  //       )}`
  //     )
  //       .then((response) => response.json())
  //       .then((card) => {
  //         return setShowCard((prev) => [
  //           ...prev,
  //           {
  //             id: card.objectID,
  //             title: card.title,
  //             link: card.objectURL,
  //             artist: card.artistDisplayName,
  //             bio: card.artistDisplayBio,
  //             img: card.primaryImage,
  //             wiki: card.objectWikidata_URL,
  //             notes: '',
  //           },
  //         ]);
  //       })
  //   );
  // }, [searchResult]);

  // //   Надо записать массив в реслокалс

  // const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
  //   event.preventDefault();
  // };

  const handleRemoveArt = (card: Card) => {
    setShowCard(showCard.filter((x) => x !== card));
  };

  const handleEditArt = (card: Card) => {
    // document.getElementsByClassName('review').style.display = 'block';
  };

  // const handleAddArt = (card: Card) => {
  //   setShowCard(showCard.filter((x) => x === card));

    return (
      <div className="card" data-id={card.id}>
        <div className="row">
          <div className="col-md-4 image-col">
            <img src={card.img} className="img-fluid rounded-start" alt="pic" />
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
    );
  };
}

export default MyArtView;
