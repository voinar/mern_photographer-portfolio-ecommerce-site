// import products from '../data/products'
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
// import albumsData from '../data/albums.json';
import IconChevron from '../img/icons/icon-chevron.svg';
import Footer from '../components/Footer';

import AlbumCard from '../components/AlbumCard';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, albumsData: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Shop = () => {
  // const [albumsData, setAlbumsData] = useState([]);
  const [{ loading, error, albumsData }, dispatch] = useReducer(
    logger(reducer),
    {
      albumsData: [],
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/data');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      // setAlbumsData(result.data)
      // console.log(result)
    };
    fetchData();
  }, []);

  const [filterName, setFilterName] = useState('biegi');
  const [filterDate, setFilterDate] = useState('');

  const selectFilter = (e) => {
    // console.log(e.target.textContent);
    setFilterName(e.target.textContent);
    setFilterDate(e.target.textContent);
  };

  const selectAlbumByName = [
    ...new Map(albumsData.map((item) => [item['album'], item])).values(),
  ]
    .map((eventName) => {
      return <li onClick={selectFilter}>{eventName.album}</li>;
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  // const selectAlbumByLocation = [
  //   ...new Map(
  //     albumsData.albums.map((item) => [item['location'], item])
  //   ).values(),
  // ]
  //   .map((eventName) => {
  //     return <li onClick={selectFilter}>{eventName.location}</li>;
  //   })
  //   .filter((value, index, self) => self.indexOf(value) === index);

  const selectAlbumByDate = [
    ...new Map(albumsData.map((item) => [item['date'], item])).values(),
  ]
    .map((eventName) => {
      return <li onClick={selectFilter}>{eventName.date}</li>;
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  const mapAlbums = albumsData.map((image) => {
    if (image.album === filterName) {
      return (
        <>
          <AlbumCard image={image} />
        </>
      );
    }

    if (image.date === filterDate) {
      return (
        <>
          <AlbumCard image={image} />
        </>
      );
    }
    return null;
  });

  return (
    <>
      <div className="shop__container">
        <div className="shop__toolbar">
          <div className="shop__toolbar__title">
            <h1>
              Przeglądaj albumy{': '}
              <span>{filterName}</span>
            </h1>
          </div>

          <div className="shop__toolbar__elements">
            <ul className="shop__toolbar__element">
              <button>
                <span>Nazwa</span>
                <img src={IconChevron} alt="zobacz" />
              </button>
              <div className="shop__toolbar__element__list-items">
                <li
                  onClick={() => {
                    setFilterName('');
                  }}
                >
                  wszystkie
                </li>
                {selectAlbumByName}
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
        </div>
        <div className="shop__cards">
          {loading ? (
            <div>"loading"</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            mapAlbums
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
