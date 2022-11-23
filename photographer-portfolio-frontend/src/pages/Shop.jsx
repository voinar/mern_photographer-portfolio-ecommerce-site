import {
  React,
  useEffect,
  useState,
  Helmet,
  AlbumCard,
  v4,
  IconStepsEye,
  IconStepsCart,
  IconStepsPhoto,
  // IconSportsGymnast,
  // IconSportsRunner,
  // IconSportsHandball,
  // IconSportsLifter,
} from '../imports';

import { storage } from '../firebase/config';
import { ref, listAll } from 'firebase/storage';

function Shop() {
  // Create a reference under which you want to list
  const [foldersList, setFoldersList] = useState([]);

  // Find all the prefixes and items.
  useEffect(() => {
    const listAlbums = () => {
      const listRef = ref(storage, 'albums/');
      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            let albumName = folderRef._location.path
              .slice(7)
              .replaceAll('_', ' ');

            setFoldersList((prevFoldersList) => [
              ...prevFoldersList,
              // {
              //   albumName,
              //   coverImage: `https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/albums%2F${folderRef._location.path.slice(
              //     7
              //   )}%2Fmale%2Fcover.jpg?alt=media&amp;token=a9586b20-d423-4ef6-807e-2ca64610af45`,
              //   )}%2Fmale%2Fcover.jpg?alt=media&amp;token=86c43d72-fd6d-412b-a7e5-0ece13d815b5`,
              // },
              {
                albumName,
                coverImage: `https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/albums%2F${folderRef._location.path.slice(
                  7
                )}%2Fmale%2Fcover.jpg?alt=media`,
              },
            ]);
          });
        })
        .catch((error) => {
          console.log('error', error);
        });
    };
    listAlbums();
  }, []);

  return (
    <>
      <Helmet>
        <title>Sklep: Kacper Porada Fotografia</title>
      </Helmet>
      <div className="shop__container">
        <div className="shop__steps__cards">
          <div className="shop__steps__card">
            <div className="shop__steps__number">
              <span>1.</span>
            </div>
            <div className="shop__steps__explanation">
              <p>Przeglądaj albumy i dodaj zdjęcia do koszyka</p>
            </div>
            <div className="shop__steps__icon shop__steps__icon--eye">
              <img src={IconStepsEye} alt="pierwszy krok" />
            </div>
          </div>
          <div className="shop__steps__card">
            <div className="shop__steps__number">
              <span>2.</span>
            </div>
            <div className="shop__steps__explanation">
              <p>Wprowadź swój adres email i dokonaj płatności</p>
            </div>
            <div className="shop__steps__icon shop__steps__icon--cart">
              <img src={IconStepsCart} alt="drugi krok" />
            </div>
          </div>
          <div className="shop__steps__card">
            <div className="shop__steps__number">
              <span>3.</span>
            </div>
            <div className="shop__steps__explanation">
              <p>Otrzymaj na email zdjęcia cyfrowe najwyższej jakości</p>
            </div>
            <div className="shop__steps__icon shop__steps__icon--photo">
              <img src={IconStepsPhoto} alt="trzeci krok" />
            </div>
          </div>
        </div>
        <h1>Przeglądaj wydarzenia:</h1>
        <div className="shop__cards">
          {/* <div className="shop__cards__background-image">
            <img src={IconSportsRunner} alt="" />
          </div> */}
          {foldersList.map((folder) => {
            return (
              <li key={v4()}>
                <AlbumCard
                  image={folder.coverImage}
                  albumName={folder.albumName}
                  collection={folder.albumName}
                />
              </li>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Shop;
