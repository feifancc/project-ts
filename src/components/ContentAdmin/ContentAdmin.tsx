import {
  Pagination,
  Radio,
  Form,
  DatePicker,
  Select,
  Table,
  Popconfirm,
  Tag,
  Modal,
  Button,
  message,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import QueryString from "qs";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Article,
  Channel,
  deleteArticle,
  QueryArticle,
  queryArticle,
} from "../../requst/article";
import {
  pageChange,
  queryArticleAction,
  deleteArticleAction,
} from "../../store/actions/article";
import { State } from "../../store/reducers/article";

import "./ContentAdmin.scss";
import ImageHandle from "./ImageHandle/ImageHandle";

const { RangePicker } = DatePicker;

const { Option } = Select;

interface Props {
  article: State;
  queryPach: Function;
  pageChange: Function;
  channels: Array<Channel>;
  deleteArticleAction: Function;
}

const ContentAdmin: React.FC<Props> = (props) => {
  //props
  const {
    article: { article, page, per_page, total_count },
    queryPach,
    pageChange,
    deleteArticleAction,
    channels,
  } = props;
  const [modal1Visible, setModal1Visible] = useState(false);

  //tab表格
  const columns: ColumnsType<Article> = [
    {
      title: "封面",
      render: (_, row) => {
        return <ImageHandle row={row}></ImageHandle>;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (_, row) => {
        const { status: done } = row;
        let color = "warning";
        let val = "草稿";
        switch (done) {
          case 2:
            color = "success";
            val = "审核成功";
            break;

          default:
            break;
        }
        return <Tag color={color}>{val}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (_, row) => (
        <div>
          <Button type="primary" onClick={() => modify(row)}>
            修改
          </Button>
          <Popconfirm
            placement="top"
            title={"是否删除"}
            onConfirm={() => deleteRow(row)}
            okText="Yes"
            cancelText="No"
          >
            <Button>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const nav = useNavigate();

  //修改处理
  function modify(row: Article) {
    console.log(row);
    nav(`/index/submitDoc`, { replace: false, state: row });
  }

  //删除处理
  async function deleteRow(data: Article) {
    if (data.status === 2) return message.warning("审核成功的不能删除");
    const result = await deleteArticle(data.id);
    if (result.message === "OK") {
      deleteArticleAction(data.id);
    }
  }

  //加载
  const [loading, setLading] = useState(true);
  //请求
  async function quey(param: QueryArticle) {
    setLading(true);
    const result = await queryArticle(param);
    setLading(false);
    queryPach(result);
  }

  useEffect(() => {
    quey({ page, per_page: per_page });
  }, [page]);

  //提交筛选
  const submit = (e: any) => {
    console.log(e);
    //接口有问题status不能用
    quey({ channel_id: e.pindao, page: page, per_page: per_page });
  };

  return (
    <>
      {/* <ModifyData isShow={isShow} setIsShow={setIsShow}></ModifyData> */}
      <Modal
        title="20px to Top"
        style={{ top: 20 }}
        visible={modal1Visible}
        onOk={() => setModal1Visible(false)}
        onCancel={() => setModal1Visible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <Form onFinish={submit}>
        <Form.Item name="state" initialValue={-1} label="状态">
          <Radio.Group name="radiogroup">
            <Radio value={-1}>全部</Radio>
            <Radio value={0}>草稿</Radio>
            <Radio value={1}>待审核</Radio>
            <Radio value={2}>审核通过</Radio>
            <Radio value={3}>审核失败</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="pindao" label="频道">
          <Select placeholder="请选择频道" style={{ width: "300px" }}>
            {channels.map((channel) => {
              return (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item name="date" label="日期">
          <RangePicker />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            筛选
          </Button>
          <Button onClick={() => quey({ page, per_page: per_page })}>
            重置
          </Button>
        </Form.Item>
      </Form>
      <hr></hr>
      <h3>当前找到{total_count}数据</h3>
      <hr></hr>
      <Table
        columns={columns}
        loading={loading}
        rowKey={(row) => row.id}
        dataSource={article.results}
      />
      <Pagination
        onShowSizeChange={(e) => {}}
        onChange={(e) => {
          pageChange(e);
        }}
        defaultCurrent={page}
        defaultPageSize={5}
        total={total_count}
      />
    </>
  );
};

export default connect(
  (state: any) => {
    return {
      article: state.article,
      channels: state.article.channles,
    };
  },
  {
    queryPach: queryArticleAction,
    pageChange,
    deleteArticleAction,
  }
)(ContentAdmin);
