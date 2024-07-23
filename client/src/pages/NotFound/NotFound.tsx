import React from 'react';
import { Link } from 'react-router-dom';

import routes from 'utils/constants/routes';

const NotFound = (): JSX.Element => {
  return (
    <section className="not-found">
      <div className="center">
        <h2>The page cannot be found</h2>
        <p>404</p>
        <p>The page you are looking for might have been removed or temporarily unavailable.</p>
        <p>Please check out one of these pages instead</p>
        {/* USE CoNSTANT */}
        <Link to={routes.Main} className="button primary">Go back to main page</Link>
      </div>
    </section>
  );
};

export default NotFound;
