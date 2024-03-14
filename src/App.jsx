import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Articles from "./Components/Articles";
import SingleArticle from "./Components/SingleArticle";
import UserContext from "./Contexts/SignedInUser";
import Topics from "./Components/Topics";
import SingleTopic from "./Components/SingleTopic";
import ErrorPage from "./Components/ErrorPage";
import Users from "./Components/Users";

function App() {
  const signedOutUser = {
    username: "",
    name: "",
    avatar_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5GOMxZRRvTEzYHX3-XuiZ5PqYRXQJ4APh3-vmINzcX8MkxEHbD8nyR7DOx84Rd-Ff0xU&usqp=CAU",
  }
  
  const [signedInUser, setSignedInUser] = useState({
  username: "tickle122",
  name: "Tom Tickle",
  avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"});

  return (
    <>
      <UserContext.Provider value={{ signedInUser, setSignedInUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/articles"
            element={<Articles />}
          />
          <Route path={`/articles/:articleId`} element={<SingleArticle />} />
          <Route path="/topics" element={<Topics />} />
          <Route path={`/topics/:slug`} element={<SingleTopic />} />
          <Route path="*" element={<ErrorPage />}/>
          <Route path="/users" element={<Users signedOutUser={signedOutUser}/>} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
