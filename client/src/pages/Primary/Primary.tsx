import React from 'react';
import Articles from 'pages/Articles/Articles';
import { Link } from 'react-router-dom';

import './styles.scss';

const Primary = (state: any): JSX.Element => {
  return (
  // section tag
    <div className='primary'>
      <span className='write'>
        <Link className='link' to='/editor'>
          Write
        </Link>
      </span>
      <Articles></Articles>
    </div>
  );
};

export default Primary;
