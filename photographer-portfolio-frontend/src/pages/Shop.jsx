// import products from '../data/products'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import albumsData from '../data/albums.json';
import IconChevron from '../img/icons/icon-chevron.svg';
import Footer from '../components/Footer';

const Shop = () => {

  const [albumsData, setAlbumsData] = useState([]);
  useEffect(()=>{
    const fetchData = async () => {
      const result = await axios.get('/api/data')
      setAlbumsData(result.data)
      // console.log(result)
    }
    fetchData();
  },[])

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
          <Link to={`/album/${image.album}`}>
            <div className="shop__card">
              <img src={image.url} alt="" />
              <div className="shop__card__info">
                {/* <div className="shop__card__title">
                    <span>{image.album}</span>
                  </div> */}
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
                {/* <div className="shop__card__title">
                    <span>{image.album}</span>
                  </div> */}
                <div className="shop__card__date">
                  <span>{image.date}</span>
                </div>
              </div>
            </div>
          </Link>
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
        <div className="shop__cards">{mapAlbums}</div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
