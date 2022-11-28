import {
  React,
  Store,
  useContext,
  useEffect,
  useState,
  useNavigate,
  Helmet,
  LoadingSpinner,
  AlbumCard,
  v4,
  IconChevron,
  IconStepsEye,
  IconStepsCart,
  IconStepsPhoto,
  // IconSportsGymnast,
  // IconSportsRunner,
  // IconSportsHandball,
  // IconSportsLifter,
  textContent,
} from '../imports';

import { storage } from '../firebase/config';
import { ref, listAll } from 'firebase/storage';

function Shop() {
  const {
    state,
    // , dispatch: contextDispatch
  } = useContext(Store);

  // Create a reference under which you want to list
  const [foldersList, setFoldersList] = useState([]);

  // const backgroundImage = () => {
  //   const images = [
  //     IconSportsGymnast,
  //     IconSportsRunner,
  //     IconSportsHandball,
  //     IconSportsLifter,
  //   ];
  //   return images[Math.floor(Math.random() * images.length)];
  // };

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

  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  return (
    <>
      <Helmet>
        <title>
          {
            textContent[
              textContent.findIndex((obj) => {
                return obj.language === state.languageSelected;
              })
            ]?.shop?.helmet
          }
        </title>
      </Helmet>
      <div className="shop__container">
        <div className="shop__steps__cards">
          <div className="shop__steps__card">
            <div className="shop__steps__number">
              <span>1.</span>
            </div>
            <div className="shop__steps__explanation">
              <p>
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.shop?.steps1
                }
              </p>
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
              <p>
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.shop?.steps2
                }
              </p>
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
              <p>
                {
                  textContent[
                    textContent.findIndex((obj) => {
                      return obj.language === state.languageSelected;
                    })
                  ]?.shop?.steps3
                }
              </p>
            </div>
            <div className="shop__steps__icon shop__steps__icon--photo">
              <img src={IconStepsPhoto} alt="trzeci krok" />
            </div>
          </div>
        </div>
        <h1>
          {
            textContent[
              textContent.findIndex((obj) => {
                return obj.language === state.languageSelected;
              })
            ]?.shop?.header
          }
        </h1>
        <div className="shop__cards">
          {/* <div className="shop__cards__background-image">
            <img src={backgroundImage()} alt="" />
          </div>
          <div className="shop__cards__background-image shop__cards__background-image--large">
            <img src={backgroundImage()} alt="" />
          </div> */}


          {foldersList.length === 0 ? <LoadingSpinner/> : (foldersList.map((folder) => {
            return (
              <li key={v4()}>
                <AlbumCard
                  image={folder.coverImage}
                  albumName={folder.albumName}
                  collection={folder.albumName}
                />
              </li>
            );
          }))}
        </div>
        <br />
        <div className="cart__return">
          <button onClick={goBack} className="btn--back">
            <img src={IconChevron} alt="zobacz" />
          </button>
          <h1>
            {
              textContent[
                textContent.findIndex((obj) => {
                  return obj.language === state.languageSelected;
                })
              ]?.shop?.back
            }
          </h1>
        </div>
      </div>
    </>
  );
}

export default Shop;
