import { connect } from "react-redux";

function DataShow() {
  return <div>没有数据可以展示</div>;
}

export default connect((state) => ({ token: state }))(DataShow);
