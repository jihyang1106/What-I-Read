import React, { useState } from 'react';
import { Modal, Input, Form } from 'antd';
import axios from 'axios';
import { ConsoleSqlOutlined } from '@ant-design/icons';
export default function BookModal({ open, changeOpen, bookInfo }) {
  /** form 리액트 훅 */
  const [form] = Form.useForm();

  /** TextArea */
  const [textarea, setTextArea] = useState('');

  /**취소 버튼, x버튼 */
  const handleCancle = () => {
    changeOpen(!open);
  };

  const title = bookInfo.title;

  /** 폼 전송 - bookInfo를 다 전달해주기 위해선 매개변수에 북인포를 전달해야해서 일단 함수를 리턴해줬다. 그 함수에 매개변수에 인풋밸류들을 넣어준다. */
  const handleSubmit = (bookInfo) => async (inputvalue) => {
    console.log(bookInfo);
    console.log(inputvalue);

    const { author, categoryName, cover, link, title } = bookInfo;
    const { content } = inputvalue;

    const data = await axios({
      method: 'post',
      url: 'http://localhost:5000/book/record',
      data: {
        author,
        categoryName,
        cover,
        link,
        title,
        content,
      },
    });

    console.log(data);

    if (data) {
      alert('기록완료!');
    } else {
      alert('기록실패!');
    }
  };

  // form.setFieldsValue({
  //   title: '책제목',
  // });

  return (
    <>
      <Modal
        open={open}
        title="기록하기"
        okText="저장"
        cancelText="취소"
        onOk={form.submit}
        onCancel={handleCancle}
      >
        <hr />
        <Form
          form={form}
          onFinish={handleSubmit(bookInfo)}
          initialValues={{
            title: bookInfo.title,
            author: bookInfo.author,
          }}
        >
          <Form.Item name="title" label="제목">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="author" label="저자">
            <Input readOnly />
          </Form.Item>
          <Form.Item name="content" label="기록할 책 내용">
            <Input.TextArea
              value={textarea}
              onChange={(e) => setTextArea(e.target.value)}
              placeholder="기록할 내용을 입력해주세요"
              autoSize={{ minRows: 3 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
