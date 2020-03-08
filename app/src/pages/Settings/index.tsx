import React from 'react';
import { store } from 'ice';

const Settings = () => {
  const [state, actions] = store.useModel('materials');
  const { collections } = state;

  return (
    <>
      <h2>设置</h2>
      <div>
        {
          collections.map(item => {
            return (
              <div key={item.url}>
                <div>title: {item.title}</div>
                <div>description: {item.description}</div>
                <div>是否官方: {item.official}</div>
                <div>url: {item.url}</div>
              </div>
            );
          })
        }
      </div>
    </>
  )
};

export default Settings;
