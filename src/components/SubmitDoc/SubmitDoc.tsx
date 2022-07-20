import { Form, Input, Radio, Select, Upload, Button, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

import { connect } from "react-redux";
import { Channel, postArticle } from "../../requst/article";
import { useEffect, useState } from "react";
import { RcFile, UploadFile } from "antd/lib/upload";
import TextArea from "antd/lib/input/TextArea";
import { useLocation } from "react-router-dom";

const { Option } = Select;

interface Props {
  channels: Array<Channel>;
}

function SubmitDoc(props: Props) {
  const { channels } = props;

  const loc = useLocation();
  useEffect(() => {
    console.log(loc);
  });

  let state = "";

  //提交
  const submit = async (e: any) => {
    let imgs: (string | undefined)[] = [];
    if (e.type === 0) {
      imgs = fileList.map((file) => {
        return file.url;
      });
    }
    if (state === "submit") {
      const data = await postArticle({
        ...e,
        cover: { type: e.type, images: imgs },
        draft: false,
      });
    } else if (state === "storage") {
      const data = await postArticle({
        ...e,
        cover: { type: e.type, images: imgs },
        draft: true,
      });
      console.log(data);
    }
    state = "";
  };

  const [isShow, setIsSHow] = useState(false);

  /**
   *
   * @param img
   * @param callback
   */

  //文件列表
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  //上传文件状态改变事件
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    //替换url
    newFileList.forEach((file) => {
      file.url = file.xhr && JSON.parse(file.xhr.responseText).data.url;
    });
    setFileList(newFileList);
  };
  //删除文件事件
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <>
      <Form onFinish={submit} style={{ width: "40%" }}>
        <Form.Item name="title" label="标题" rules={[{ required: true }]}>
          <Input placeholder="请输入文章的标题" />
        </Form.Item>
        <Form.Item name="channel_id" label="频道" rules={[{ required: true }]}>
          <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
          >
            {channels.map((channle) => {
              return (
                <Option key={channle.id} value={channle.id}>
                  {channle.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="type"
          label="封面"
          initialValue={0}
          rules={[{ required: true }]}
        >
          <Radio.Group
            onChange={(e) => {
              if (e.target.value === 1) {
                setIsSHow(true);
              } else {
                setIsSHow(false);
              }
            }}
          >
            <Radio value={0}>三图</Radio>
            <Radio value={1}>无图</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="" rules={[{ required: true }]} hidden={isShow}>
          <ImgCrop rotate>
            <Upload
              name="image"
              action="http://geek.itheima.net/v1_0/upload"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 3 && "+ Upload"}
            </Upload>
          </ImgCrop>
          {/* <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            onChange={upload}
            action={(e) => {
              console.log(e);

              return "http://geek.itheima.net/v1_0/upload";
            }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload> */}
        </Form.Item>
        <Form.Item name="content" label="内容" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="maxLength is 60" maxLength={60} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" onClick={() => (state = "submit")}>
            发不文章
          </Button>
          <Button htmlType="submit" onClick={() => (state = "storage")}>
            存入草稿
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default connect((state: any) => {
  return {
    channels: state.article.channles,
  };
}, {})(SubmitDoc);
