import { useParams } from 'react-router-dom';
import axios from 'axios';

import photographyData from '../data/staticData.json';
import Footer from '../components/Footer';
import chevronUp from '../img/icons/chevron-up.svg';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, currentAlbumData: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const SectionContent = () => {
  let { category } = useParams();

  return (
    <>
      {/* <span>{photographyData.images[0].url}</span> */}
      <main>
        <ul className="section__photos">
          {photographyData.images.map((image) => {
            if (image.category === category) {
              return (
                <li className="section__photos__images" key={`${image.url}`}>
                  <div className="section__photos__images__image">
                    <img src={`${image.url}`} alt={`${image.description}`} />
                    <span className="section__photos__description">
                      {image.description}
                      {/* {image.url} */}
                    </span>
                  </div>
                </li>
              );
            } else return null;
          })}
        </ul>
        <div className="section__photos__see-more">
          <div className="section__photos__see-more__container">
            <div className="section__photos__see-more__icon">
              <img src={chevronUp} alt="facebook" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SectionContent;

// {this.state.productCategories.categories.map((category) => {
//   return (
//     <Route
//       key={`${category.name}`}
//       path={`${category.name}`}
//       element={
//         <ProductListing
//           category={`${category.name}`}
//         />
//       }
//     />
//   );
// })}
