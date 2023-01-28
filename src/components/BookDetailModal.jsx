import React from 'react';
import { Modal, Input, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { CopyOutlined } from '@ant-design/icons';
/** 설명 css  */
const FixedDiv = styled.div`
  margin: 10px;
  font-weight: bold;
`;

export default function BookDetailModal({ isopen, changeIsOpen }) {
  /**취소 버튼, x버튼 */
  const handleCancle = () => {
    changeIsOpen(!isopen);
  };

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
        <Input defaultValue={'모두의 네트워크'} readOnly />
        <FixedDiv>저자 </FixedDiv>
        <Input defaultValue={'미즈구치 카츠야'} readOnly />
        <FixedDiv>설명 </FixedDiv>
        <Input.TextArea
          defaultValue={
            '네트워크를 전혀 몰라도 괜찮다! 초보자와 비전공자를 위한 가장 쉬운 네트워크 입문서 [모두의 네트워크]는 이제 막 네트워크를 공부하기 시작했거나 공부해야겠다고 마음먹은 초급자를 대상으로 한 입문서다. 네트워크의 개념, 비트, 바이트부터 OSI 계층, 무선 랜 구조까지 160개의 일러스트와 유쾌한 캐릭터들의 대화로 설명해 그림책을 읽듯 쉽고 재미있게 네트워크 관련 지식을 익힐 수 있다. [모두의 네트워크]로 누구나 쉽게 네트워크를 익혀 보자!'
          }
          readOnly
          autoSize
        />
        <FixedDiv>자세히 보기 </FixedDiv>
        <Input.Group compact>
          <Input
            style={{
              width: 'calc(100% - 200px)',
            }}
            defaultValue="https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=151491282"
          />
          <Tooltip title="copy url">
            <Button icon={<CopyOutlined />} />
          </Tooltip>
        </Input.Group>
      </Modal>
    </>
  );
}
