import React from 'react';
import { Modal, Input, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';

/** 설명 css  */
const FixedDiv = styled.div`
  margin: 10px;
  font-weight: bold;
`;

export default function BookDetailModal({ isopen, changeIsOpen, bookInfo }) {
  /**취소 버튼, x버튼 */
  const handleCancle = () => {
    changeIsOpen(!isopen);
  };

  /**글꼴 설정 */
  const fontStyle = { fontFamily: 'LineSeedKR-Bd' };
  /** 책 설명이 없을 때 */
  const defaultValue = bookInfo.description ? bookInfo.description : '';

  return (
    <>
      <Modal
        open={isopen}
        title="책 세부 정보"
        cancelText="확인"
        onCancel={handleCancle}
        footer={null}
        maskClosable={false}
      >
        <hr />
        <FixedDiv>책 제목 </FixedDiv>
        <Input defaultValue={bookInfo.title} readOnly style={fontStyle} />
        <FixedDiv>저자 </FixedDiv>
        <Input defaultValue={bookInfo.author} readOnly style={fontStyle} />
        <FixedDiv>설명 </FixedDiv>
        <Input.TextArea
          defaultValue={defaultValue}
          readOnly
          autoSize
          style={fontStyle}
        />
        <FixedDiv>자세히 보기 </FixedDiv>
        <Input.Group compact>
          <Input
            style={{
              width: 'calc(100% - 200px)',
              fontFamily: 'LineSeedKR-Bd',
            }}
            defaultValue={bookInfo.link}
          />
          <Tooltip title="copy url">
            <Button icon={<CopyOutlined />} />
          </Tooltip>
        </Input.Group>
      </Modal>
    </>
  );
}
