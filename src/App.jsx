import React, { useEffect, useState } from "react";
import { useGetTodos } from "./http/repository";
import { Todo } from "./components/Todo";
import Header from "./components/Header";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterTodo, setFilterTodo] = useState([]);
  //Status of the filter
  const [status, setStatus] = useState("all");
  //The default value of getting the todos from the repository .
  const [resultCount, setResultCount] = useState(40);
  //Thi state and function will be used to load more data from the server .
  const { data, refetch } = useGetTodos(resultCount);
  useEffect(() => {
    if (resultCount) {
      refetch(resultCount);
    }
  }, [resultCount]);

  const loadMoreBtn = () => {
    setResultCount((prevCount) => prevCount + 10);
  };



  const filterHandler = (array) => {
    let complete = array?.filter((element) => element.completed === true);

    if (status === "all") {
      setFilterTodo(array);
    } else if (status === "completed") {
      setFilterTodo(complete);
    }
  };

  useEffect(() => {
    setTodos(data?.results);
  }, [data]);

  useEffect(() => {
    filterHandler(todos);
  }, [status, todos]);

  return (
    <div className="text-center">
      <Header
        status={status}
        setStatus={setStatus}
        filterTodo={filterTodo}
        setFilterTodo={setFilterTodo}
        loadMoreBtn={loadMoreBtn}
        
      />
      <main className="grid grid-cols-4 gap-6 p-4 bg-teal-50">
        {filterTodo?.map((todo, index) => (
          <Todo
            key={index}
            task={todo}
            filterTodo={filterTodo}
            setFilterTodo={setFilterTodo}
          />
        ))}
      </main>
  
    </div>
  );
};

export default App;
