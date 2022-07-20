import req from "axios";
import QueryString from "qs";

export interface QueryArticle {
  status?: string;
  channel_id?: string;
  begin_pubdate?: string;
  end_pubdate?: string;
  page?: string | number;
  per_page?: string | number;
}

export interface QueryArticleRes {
  page: number;
  per_page: number;
  results: Array<Article>;
  total_count: number;
}

export interface Article {
  comment_count: number;
  cover: { images: string[]; type: number };
  id: string;
  like_count: number;
  pubdate: string;
  read_count: number;
  status: number;
  title: string;
}

export const queryArticle = async (query: QueryArticle) => {
  const qs = QueryString.stringify(query);

  const { data } = await req.get(`mp/articles?${qs}`);
  return data as QueryArticleRes;
};

export interface Channel {
  id: string;
  name: string;
}

export const getChannels = async () => {
  const { data } = await req.get("channels");
  return data as Array<Channel>;
};

export interface PostArticle {
  title: string;
  content: string;
  cover: {
    type: number;
    images: string[];
  };
  channel_id: number;
}

export const postArticle = async (param: PostArticle) => {
  const { data } = await req.post("mp/articles", param);
  return data;
};

interface DeleteArticleRes {
  data?: null;
  message: string;
}

export const deleteArticle = async (id: string) => {
  const data = await req.delete(`mp/articles/${id}`);
  return data as unknown as DeleteArticleRes;
};
