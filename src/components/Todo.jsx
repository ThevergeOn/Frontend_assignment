import React, { useMemo, useState, useEffect } from "react";
import { LazyImage } from "./LazyImage";
import Modal from "./Modal";

export const Todo = ({ task, filterTodo, setFilterTodo }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  const handleRemove = (id) => {
    setFilterTodo(filterTodo?.filter((element) => element?.login?.uuid !== id));
  };

  const handleCompleted = (id) => {
    setFilterTodo(
      filterTodo?.map((task) => {
        if (task?.login?.uuid === id) {
          task.completed = !task.completed;
        }
        return task;
      })
    );
  };

  var formattedNames = [];
  const getNames = (names) => {
    if (names === Object(names)) {
      // Object here
      if (names.name != undefined && names.name != null) {
        if (Object.keys(names.name).length > !2) {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += value;
          }
        } else {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += key + value;
          }
        }
        return formattedNames;
      } else {
        return "No name";
      }
    } else if (Array.isArray(names)) {
      if (names.name != undefined && names.name != null) {
        if (names.name.length > !2) {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += value;
            return formattedNames;
          }
        } else {
          for (const [key, value] of Object.entries(names.name)) {
            formattedNames += key + value;
            return formattedNames;
          }
        }
      } else {
        return "No name";
      }
    }
  };
  const userName = useMemo(() => getNames(task), []);
  const getLocation = ({ location: { street, ...rest } }) => {
    const myStreetName = street.name;
    const myStreetNumber = street.number;
    const myPostcode = rest.postcode;
    const myCity = rest.city;
    const myState = rest.state;
    const myCountry = rest.country;

    return (
      <div className="flex flex-col gap-2 text-left">
        <span className="">
          Address : {myStreetName + " " + myStreetNumber}
        </span>
        <span className=""> Postcode: {myPostcode}</span>
      </div>
    );
  };
  const userLocation = useMemo(() => getLocation(task), []);
  const getPicture = () => {
    return <LazyImage src={task?.picture?.large} alt={task?.picture?.large} />;
  };

  return (
    <div className="p-2 border shadow rounded flex flex-col justify-between bg-white">
        <button className="border w-28 rounded self-center" onClick={openModal}>Open modal</button>
      <div className="font-bold mb-2 overflow-ellipsis overflow-hidden ">
        {userName}
      </div>

      <div className="w-full ">{getPicture()}</div>

      <div className="text-blue-400 m-2 text-sm">{userLocation}</div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
            <span className="">Complete : </span>

          <input
            type="checkbox"
            checked={task?.completed}
            className="mt-1"
            onChange={() => {
              handleCompleted(task.login.uuid);
            }}
          />
        </div>
        <button
          type="button"
          className="border border-red-500 bg-red-500 text-white outline-none p-1 rounded"
          onClick={() => {
            handleRemove(task.login.uuid);
          }}
        >
          <span>Remove ✕</span>
        </button>
      </div>

   <Modal isOpen={isOpen} onClose={closeModal} userLocation={userLocation} userName={userName} picture={getPicture()} />
    </div>
  );
};
