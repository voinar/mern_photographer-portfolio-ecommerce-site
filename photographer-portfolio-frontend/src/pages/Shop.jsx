// import products from '../data/products'
import { Link } from 'react-router-dom';
import albumsData from '../data/albums.json';
import IconChevron from '../img/icons/icon-chevron.svg';
import Footer from '../components/Footer';

const Shop = () => {
  return (
    <>
      <div className="shop__container">
        <div className="shop__toolbar">
        <h1 className="shop__title">Przeglądaj albumy</h1>
          <h2>Szukaj</h2>
          <div className="shop__toolbar__elements">
            <div className="shop__toolbar__element">
              <span>Nazwa</span>
              <img src={IconChevron} alt="zobacz" />
            </div>
            <div className="shop__toolbar__element">
              <span>Miejsce</span>
              <img src={IconChevron} alt="zobacz" />
            </div>
            <div className="shop__toolbar__element">
              <span>Data</span>
              <img src={IconChevron} alt="zobacz" />
            </div>
          </div>
        </div>
        <div className="shop__cards">
          {albumsData.albums.map((image) => {
            return (
              <>
                <Link to={`/album/${image.event}`}>
                  <div className="shop__card">
                    <img src={image.url} alt="" />
                    <div className="shop__card__info">
                      <div className="shop__card__title">
                        <span>{image.event}</span>
                      </div>
                      <div className="shop__card__date">
                        <span>11/11/2022</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shop;
