import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logotype from 'assets/images/logotype.svg';

const Header = (): JSX.Element => {
  const [isHamburgerOpen, setHamburgerOpen] = useState(true);

  useEffect(() => {
    setHamburgerOpen(!(window.innerWidth > 800));
  }, []);

  const handleMenuToggle = (event: React.MouseEvent): void => {
    if (event.target instanceof HTMLElement && event.target.className === 'hamburger-button') {
      setHamburgerOpen(!isHamburgerOpen);
      return;
    }

    setHamburgerOpen(true);
  };

  return (
    <header>
      <nav className='container header-container'>
        <Link className="logotype" to="/" onClick={handleMenuToggle}>
          <img src={logotype} alt="Creation Agency logotype" />
        </Link>
        { !isHamburgerOpen && <ul className="header-menu">
          <li onClick={handleMenuToggle}>
            <Link to="/create">Create</Link>
            {/* or write */}
          </li>
          <li onClick={handleMenuToggle}>
            <Link to="/profile">Profile</Link>
          </li>
          <li onClick={handleMenuToggle}>
            <Link to="/sign-out">Sign out</Link>
          </li>
        </ul> }
        <div onClick={handleMenuToggle}>
          <div className="hamburger-button">test</div>
        </div>
      </nav>
    </header>
  );
};

// const Header = (): JSX.Element => {
//   const { currentUser, signOut } = useContext(AuthContext);
//   return (
//     <header>
//       <div>
//         {/* USE CONSTANTS */}
//         <Link className='logotype' to='/'>
//           <img src={Logotype} alt="Creation Agency logotype" />
//         </Link>
//         <div>
//           <SearchBar></SearchBar>
//           <div className='links'>
//             <span>
//               <span>
//                 { currentUser &&
//                 <Link to={`/users/${(currentUser?.username).toLowerCase()}`}>
//                   { currentUser?.username }
//                 </Link>
//                 }
//               </span>
//                 <span>
//                   { currentUser?.username
//                     ? <span onClick={signOut}>Sign out</span>
//                     : <span>
//                         <Link to='/signin'>
//                           <h3>
//                             Sign in
//                           </h3>
//                         </Link>
//                       </span>}
//                 </span>
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// const Header = (): JSX.Element => {
//   const { currentUser, signOut } = useContext(AuthContext)

//   return (
//     <header>
//       <div className='header'>
//         <div className='container'>
//           <div className='logo'>
//             <Link to='/'>
//               <img src={Logotype} alt="Creation Agency logotype" />
//             </Link>
//           </div>
//           <div className='links'>
//             <span>
//               { currentUser?.username }
//             </span>
//             <span>
//               { currentUser?.username
//                 ? <span onClick={signOut}>Sign out</span>
//                 : <span>
//                     <Link to='/signin'>
//                       <h3>
//                         Sign in
//                       </h3>
//                     </Link>
//                   </span>}
//             </span>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

export default Header;
