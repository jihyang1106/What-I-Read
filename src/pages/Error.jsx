import { Button, Result } from 'antd';
import React from 'react';

const goToWeb = () => {
  window.location.href = '/';
};

const Error = () => {
  return (
    <>
      {' '}
      <Result
        status="warning"
        title="There are some problems with your operation."
        extra={
          <Button type="text" onClick={goToWeb}>
            Go to Website
          </Button>
        }
      />
    </>
  );
};

export default Error;
