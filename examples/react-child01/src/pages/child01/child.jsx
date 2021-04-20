import React from 'react';
import { Button } from 'antd';

export default () => {
  return (
    <div>
      <h4>child01-child（umi3 + antd4）</h4>
      <Button
        danger
        onClick={() => {
          window.getHistory().push('/child02/child');
        }}
      >
        跳到child02-child
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
