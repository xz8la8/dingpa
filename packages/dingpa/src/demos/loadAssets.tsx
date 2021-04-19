import React from 'react';
import loadAssets from '../loadAssets';
import { createSandbox } from '../sandbox';

const sandbox = createSandbox('jiuchidingpa');
let unloadAssets;
export default () => {
  return (
    <div>
      <button
        onClick={() => {
          sandbox.active();
          loadAssets(['https://unpkg.com/dayjs@1.8.21/dayjs.min.js'], []).then((unload) => {
            console.log(dayjs().format());
            unloadAssets = unload;
          });
        }}
      >
        load
      </button>
      <button
        onClick={() => {
          unloadAssets();
          sandbox.inactive();
          try {
            console.log(dayjs().format());
          } catch (error) {
            console.error(error);
          }
        }}
      >
        unload
      </button>
    </div>
  );
};
