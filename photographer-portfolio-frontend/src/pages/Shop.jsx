// import albumsData from '../data/albums.json';
// import products from '../data/products'
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
// import logger from 'use-reducer-logger';
import IconChevron from '../img/icons/icon-chevron.svg';
import Footer from '../components/Footer';

import { v4 as uuidv4 } from 'uuid';

import AlbumCard from '../components/AlbumCard';
import LoadingSpinner from '../components/LoadingSpinner';

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
  const [{ loading, albumsData, error }, dispatch] = useReducer(
    // logger(reducer),
    reducer,
    {
      loading: true,
      albumsData: [],
      error: '',
    }
  );
  // console.log('albums state: ' + JSON.stringify(albumsData));

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // console.log(result);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const [filterName, setFilterName] = useState('');
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
      return (
        <li key={uuidv4()} onClick={selectFilter}>
          {eventName.album}
        </li>
      );
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
    ...new Map(albumsData.map((item) => [item['eventDate'], item])).values(),
  ]
    .map((event) => {
      return (
        <li key={uuidv4()} onClick={selectFilter}>
          {event.eventDate}
        </li>
      );
    })
    .filter((value, index, self) => self.indexOf(value) === index);

  const mapAlbums = albumsData.map((image) => {
    if (filterName === '' && image.imageMedium.slice(-5) === '0.jpg')
      return (
        <li key={image._id}>
          <AlbumCard image={image} />
          <span>{image.eventName}</span>
        </li>
      );

    if (image.album === filterName) {
      return (
        <li key={image._id}>
          <AlbumCard image={image} />
        </li>
      );
    }

    if (image.eventDate === filterDate) {
      return (
        <li key={image._id}>
          <AlbumCard image={image} />
        </li>
      );
    }
    return null;
  });

  return (
    <>
      {/* {loading === true ? "loading" : "loaded"} */}
      <div className="shop__container">
        <div className="shop__toolbar">
          <div className="shop__toolbar__title">
            <h1>
              Przeglądaj albumy: <span>{filterName}</span>
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
                  key={uuidv4()}
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
            <LoadingSpinner />
          ) : error ? (
            <div className="alert__container alert__container--red alert__container--standard">
              {error}
            </div>
          ) : (
            <ul>{mapAlbums}</ul>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
