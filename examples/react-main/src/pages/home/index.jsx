import React from 'react';
import { Link } from 'umi';

export default () => {
  return (
    <div>
      <div>main app</div>
      <Link to="/child01/child">to child01</Link>
      <br />
      <Link to="/child02/child">to child02</Link>
    </div>
  );
};
