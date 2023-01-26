import React from 'react';
import HeaderPart from './HeaderPart';
import { Layout } from 'antd';

const { Content } = Layout;

const contentStyle = {
  textAlign: 'center',
  height: '240px',
  lineHeight: '200px',
  color: '#fff',
  backgroundColor: 'lightgray',
  marginTop: '10px',
};

export default function main() {
  return (
    <>
      <HeaderPart />
      <Content style={contentStyle}>Content</Content>
    </>
  );
}
