import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (): JSX.Element => {
  return (
    <footer>
      <ul className="categories">
        <li>
          <Link to="/articles?categories=test">Test</Link>
        </li>
        <li>
          <Link to="/articles?categories=test">Test</Link>
        </li>
        <li>
          <Link to="/articles?categories=test">Test</Link>
        </li>
        <li>
          <Link to="/articles?categories=test">Test</Link>
        </li>
      </ul>
      <div className="copyright">
        <small>All Rights Reserved &copy; Copyright, nikivavlt</small>
      </div>
    </footer>
  );
};

export default Footer;
