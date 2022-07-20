import { Card } from "antd";

import "./ModifyData.scss";

interface Props {
  isShow: boolean;
  setIsShow: Function;
}

export default function ModifyData(props: Props) {
  const { isShow } = props;
  console.log(isShow);

  return (
    <Card
      className={`container ${isShow ? "" : "show"} `}
      title="Card title"
      bordered={false}
      style={{ width: 300 }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}
