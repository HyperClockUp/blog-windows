import React from "react";
import { get } from "../../network/request";

const DailyArticle = () => {
  const [article, setArticle] = React.useState("");

  const fetchArticle = React.useCallback(async () => {
    const url = "https://v2.alapi.cn/api/one";
    const res = await get(url, {
    });
    console.log(res);
  }, []);

  React.useEffect(()=>{
    fetchArticle();
  },[fetchArticle]);

  return <div>{article}</div>;
};
