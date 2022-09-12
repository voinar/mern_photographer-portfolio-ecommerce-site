import navLogo from '../img/logo.png';
import categoryData from '../data/data.json';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../contexts/Context';

// import iconSun from "../img/icons/icon-sun.svg";
// import iconMoon from "../img/icons/icon-moon.svg";

const Navbar = () => {
  const { darkMode } = useContext(Context);

  // console.log(darkMode)

  return (
    <nav className={darkMode ? `${'navbar navbar--dark'}` : `${'navbar'}`}>
      <div className="navbar__logo">
        <Link to="/witaj">
          <img src={navLogo} alt="logo" />
        </Link>
      </div>
      <ul className="navbar__content">
        {categoryData.categories.map((category) => {
          if (category === 'galerie') {
            return (
              <ul key={category} className="navbar__section__dropdown">
                galeria
                {categoryData.dropdownCategories.map((dropdownCategory) => {
                  return (
                    <li
                      key={dropdownCategory}
                      className="navbar__section__dropdown-link"
                    >
                      <Link to={dropdownCategory}>{dropdownCategory}</Link>
                    </li>
                  );
                })}
              </ul>
            );
          } else if (category !== 'galerie') {
            return (
              <li key={category} className="navbar__section-link">
                <Link to={category}>{category}</Link>
              </li>
            );
          } else return null;
        })}
        {/* {darkMode ? (
          <li>
            <img src={iconMoon} className="navbar__darkmode-toggle" onClick={()=>{setDarkMode(!darkMode)}} alt="toggle dark mode" />
          </li>
        ) : (
          <li>
            <img src={iconSun} className="navbar__darkmode-toggle" onClick={()=>{setDarkMode(!darkMode)}}alt="toggle dark mode" />
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default Navbar;
