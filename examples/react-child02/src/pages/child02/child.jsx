import React from 'react';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <h4>child02-child（umi2 + antd3）</h4>
      <Button
        type="primary"
        onClick={() => {
          window.getHistory().push('/child01/child');
        }}
      >
        跳到child01-child
      </Button>
      <Button
        type="link"
        onClick={() => {
          window.getHistory().push('/home');
        }}
      >
        back to home
      </Button>
    </div>
  );
};
