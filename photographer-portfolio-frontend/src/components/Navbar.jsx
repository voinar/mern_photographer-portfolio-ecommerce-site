import navLogo from '../img/logo.png';
import categoryData from '../data/data.json';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import Context from '../contexts/Context';

// import iconSun from "../img/icons/icon-sun.svg";
// import iconMoon from "../img/icons/icon-moon.svg";

const Navbar = () => {
  // const { darkMode, setDarkMode } = useContext(Context);
  const { darkMode } = useContext(Context);

  console.log('darkMode ' + darkMode)

  return (
    <nav className={darkMode ? `${'navbar'}` : `${'navbar'}`}>
    {/* <nav className={darkMode ? `${'navbar navbar--dark'}` : `${'navbar'}`}> */}
      <div className="navbar__logo">
        <Link to="/witaj">
          <img src={navLogo} alt="logo" />
        </Link>
      </div>
      <ul className="navbar__content">
        {categoryData.categories.map((category) => {
          if (category === 'sklep') {
            return (
              <li key={category} className="navbar__section-link">
                <Link
                  className="navbar__section-link navbar__section-link__shop"
                  to={category}
                >
                  {category}
                </Link>
              </li>
            );
          }
          if (category !== 'sklep') {
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
