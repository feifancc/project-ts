import { Channel, QueryArticleRes } from "../../requst/article";
import { DELETEARTICLE, GETCHANNELS, PAGECHANGE, QUERYARTICLE } from "../CONST";

export const queryArticleAction = (data: QueryArticleRes) => {
  return {
    type: QUERYARTICLE,
    data,
  };
};
export const pageChange = (num: number) => {
  return {
    type: PAGECHANGE,
    data: num,
  };
};
export const channelsAction = (
  promise: Promise<{ channels: Array<Channel> }>
) => {
  return (pach: Function) => {
    promise.then((res) => {
      pach({
        type: GETCHANNELS,
        data: res.channels,
      });
    });
  };
};
export const deleteArticleAction = (data: string) => {
  return {
    type: DELETEARTICLE,
    data,
  };
};
