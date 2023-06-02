import React, { useState, useEffect } from "react";

const Header = ({
  status,
  setStatus,
  setFilterTodo,
  filterTodo,
  loadMoreBtn,
}) => {
  const [allCompleted, setAllCompleted] = useState(false);
  const [itemsCompleted, setItemsCompleted] = useState(0);

  const onAllCompletedHandler = (checked) => {
    setAllCompleted(checked);
  };
  useEffect(() => {
    setFilterTodo(
      filterTodo?.map((task) => {
        task.completed = allCompleted;
        return task;
      })
    );
  }, [allCompleted]);

  const checkCompleted = () => {
    setAllCompleted(filterTodo?.every((task) => task?.completed === true));
  };

  useEffect(() => {
    checkCompleted();
    setItemsCompleted(
      filterTodo?.filter((element) => element?.completed == true)
    );
  }, [filterTodo]);

  return (
    <div className="border-b px-4 pt-8 flex flex-col bg-blue-50">
      <div className="flex justify-between  items-center ">
        <div className="flex items-center">
          <span className="">Completed Todos :</span>
          <div className="w-6">{itemsCompleted?.length} </div> /
          <span className="w-6">  {filterTodo?.length}</span>
          
        </div>
        <div className="flex items-center gap-4">
          <span className="">Sort by</span>
          <select
            className="border rounded text-center p-2 outline-none"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="flex gap-2 border p-2 rounded">
          <span className="">Complete all</span>
          <input
            className="border rounded outline-none p-1"
            type="checkbox"
            checked={allCompleted}
            onChange={() => onAllCompletedHandler(!allCompleted)}
          />
        </div>
      </div>
      <button
        className="border rounded-md outline-none p-2 my-4 w-32 self-end bg-blue-600 text-white"
        onClick={loadMoreBtn}
      >
        Load more task 
      </button>
    </div>
  );
};
export default Header;
