import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ArticleIdContext from "./Contexts/ArticleId";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";

function App() {
  const [articleId, setArticleId] = useState(null);

  return (
    <>
      <ArticleIdContext.Provider value={{ articleId, setArticleId }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path={`/articles/:articleId`} element={<SingleArticle />} />
        </Routes>
      </ArticleIdContext.Provider>
    </>
  );
}

export default App;
