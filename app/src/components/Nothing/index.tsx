import React, { ReactElement, ReactNode } from 'react';

export default function Nothing(props: { children?: ReactNode }): ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '15vh',
      }}
    >
      <img style={{ width: '20vw' }} src='//img.alicdn.com/tfs/TB1WNNxjBHH8KJjy0FbXXcqlpXa-780-780.png' alt='nothing' />
      <span style={{ padding: 20, fontSize: 14, color: 'rgba(0,0,0,0.5)' }}>{props.children}</span>
    </div>
  );
}
