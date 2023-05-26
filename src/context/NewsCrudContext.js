import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const newsCrudContext = createContext();

export function NewsCrudContextProvider({ children }) {
  const API_URL = "https://newsapi.org/v2/everything?";
  const pageSize = process.env.REACT_APP_PAGE_SIZE;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const [keyWord, setKeyWord] = useState("Today's News");
  const [news, setNews] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const LOCAL_STORAGE_KEY3 = "my-Favourites";
  const [myFav, setMyFav] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY3)) ?? []
  );

  // Search News
  const handleSetKeyword = async (search) => {
    try {
      const response = await axios.get(
        `${API_URL}q=${search}&pageSize=${pageSize}&page=${pageNo}&apiKey=${apiKey}`
      );
      const data = await response.data.articles;
      setNews(data);
    } catch (error) {
      console.error(error);
    }

    setKeyWord(search);
  };

  // Load More News
  const loadMoreNews = async (newPage) => {
    newPage++;
    setPageNo(newPage);

    try {
      const response = await axios.get(
        `${API_URL}q=${keyWord}&pageSize=${pageSize}&page=${newPage}&apiKey=${apiKey}`
      );
      const data = await response.data.articles;
      setNews((prevNews) => [...prevNews, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  // Update Fav Items
  const updateMyFav = (favItem) => {
    const favNews = {
      id: crypto.randomUUID(),
      ...favItem,
    };

    setMyFav((prevItem) => [...prevItem, favNews]);
  };

  // Delete Fav Items
  const removeMyFav = (favItem) => {
    const newFavList = myFav.filter((item) => {
      return item.title !== favItem.title;
    });

    setMyFav(newFavList);
  };

  // Clear Fav Items
  const clearMyFav = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY3, JSON.stringify(myFav));
    setMyFav([]);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY3, JSON.stringify(myFav));
  }, [myFav]);

  const value = {
    keyWord,
    news,
    pageNo,
    myFav,
    handleSetKeyword,
    loadMoreNews,
    updateMyFav,
    removeMyFav,
    clearMyFav,
  };

  return <newsCrudContext.Provider value={value}>{children}</newsCrudContext.Provider>;
}

export function useNewsCrud() {
  return useContext(newsCrudContext);
}
