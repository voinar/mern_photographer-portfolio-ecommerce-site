// import products from '../data/products'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import albumsData from '../data/albums.json';
import IconChevron from '../img/icons/icon-chevron.svg';
import Footer from '../components/Footer';


const Shop = () => {
  const [filterName, setFilterName] = useState('biegi')
  const [filterLocation, setFilterLocation] = useState('')
  const [filterDate, setFilterDate] = useState('')


  const selectFilter = (e) => {
    console.log(e.target.textContent);
    setFilterName(e.target.textContent)
  };

  const selectAlbumByName = [
    ...new Map(albumsData.albums.map((item) => [item['album'], item])).values(),
  ]
    .map((eventName) => {
      return <li onClick={selectFilter}>{eventName.album}</li>;
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  const selectAlbumByLocation = [
    ...new Map(
      albumsData.albums.map((item) => [item['location'], item])
    ).values(),
  ]
    .map((eventName) => {
      return <li onClick={selectFilter}>{eventName.location}</li>;
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  const selectAlbumByDate = [
    ...new Map(albumsData.albums.map((item) => [item['date'], item])).values(),
  ]
    .map((eventName) => {
      return <li onClick={selectFilter}>{eventName.date}</li>;
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <>
      <div className="shop__container">
        <div className="shop__toolbar">
          <h1 className="shop__title">Przeglądaj albumy</h1>

          <div className="shop__toolbar__elements">
            <ul className="shop__toolbar__element">
              <button>
                <span>Nazwa</span>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <div className="shop__toolbar__element__list-items">
                {selectAlbumByName}
              </div>
            </ul>
            <ul className="shop__toolbar__element">
              <button>
                <span>Miejsce</span>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <div className="shop__toolbar__element__list-items">
                {selectAlbumByLocation}
              </div>
            </ul>
            <ul className="shop__toolbar__element">
              <button>
                <span>Data</span>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <div className="shop__toolbar__element__list-items">
                {selectAlbumByDate}
              </div>
            </ul>
          </div>
          <h2>{filterName}</h2>
        </div>
        <div className="shop__cards">
          {albumsData.albums.map((image) => {
            if (image.album === filterName) {
              return (
                <>
                  <Link to={`/album/${image.album}`}>
                    <div className="shop__card">
                      <img src={image.url} alt="" />
                      <div className="shop__card__info">
                        <div className="shop__card__title">
                          <span>{image.album}</span>
                        </div>
                        <div className="shop__card__date">
                          <span>{image.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            } if (image.location === filterLocation) {
              return (
                <>
                  <Link to={`/album/${image.album}`}>
                    <div className="shop__card">
                      <img src={image.url} alt="" />
                      <div className="shop__card__info">
                        <div className="shop__card__title">
                          <span>{image.album}</span>
                        </div>
                        <div className="shop__card__date">
                          <span>{image.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            }
            if (image.date === filterDate) {
              return (
                <>
                  <Link to={`/album/${image.album}`}>
                    <div className="shop__card">
                      <img src={image.url} alt="" />
                      <div className="shop__card__info">
                        <div className="shop__card__title">
                          <span>{image.album}</span>
                        </div>
                        <div className="shop__card__date">
                          <span>{image.date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </>
              );
            }
          }

          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
