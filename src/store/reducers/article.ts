import { Channel, QueryArticleRes } from "../../requst/article";
import { DELETEARTICLE, GETCHANNELS, PAGECHANGE, QUERYARTICLE } from "../CONST";

export interface State {
  article: QueryArticleRes;
  page: number;
  per_page: number;
  total_count: number;
  channles: Array<Channel>;
}

export default function queryArticleReducer(
  preState: State,
  action: { type: string; data: any }
) {
  const { type, data } = action;
  switch (type) {
    case QUERYARTICLE:
      return (preState = {
        ...preState,
        article: data,
        total_count: data.total_count,
      });

    case PAGECHANGE:
      return (preState = { ...preState, page: data });

    case GETCHANNELS:
      return (preState = { ...preState, channles: data });
    case DELETEARTICLE:
      const newArtiles = preState.article.results.filter((item) => {
        return data !== item.id;
      });
      return (preState = {
        ...preState,
        article: { ...preState.article, results: newArtiles },
      });

    default:
      return (preState = {
        page: 1,
        per_page: 5,
        channles: [],
        total_count: 0,
        article: { page: 1, per_page: 5, results: [], total_count: 5 },
      });
  }
}
