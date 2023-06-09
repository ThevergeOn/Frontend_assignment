import config from "../config.json";

export const fetchData = {
  get: async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    config.todos = data.results;
    return data;
  },
};
