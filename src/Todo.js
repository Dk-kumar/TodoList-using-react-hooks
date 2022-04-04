/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import "./Todo.css";

export function Todo() {
  let initialToDo = [{ text: "Learning react hooks", id: 0 }];
  const myRef = React.createRef("");

  let [list, setList] = useState(initialToDo);
  let [errors, setErrors] = useState("Type somthing");
  let [time, setTime] = useState(new Date());
  let [emptyMsg, setMsg] = useState("");

  useEffect(() => {
    myRef.current.value = "";
    if (list.length === 0) {
      setMsg(() => {
        emptyMsg = "Todo list is empty now";
      });
    }
  }, [list]);

  useEffect(() => {
    let timerID = setInterval(() => renderTime(), 1000);
    return () => {
      clearInterval(timerID);
    };
  });

  /**
   * Adding Todo
   * @returns
   */
  const addList = () => {
    if (!validatingForms()) return null;

    setList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: myRef.current.value,
      },
    ]);
  };

  /**
   * Removing Todo
   * @param {*} id
   */
  const removeList = (id) => {
    setList(
      list.filter((data) => {
        return data.id !== id;
      })
    );
  };

  /**
   * Upading Todo
   * @param {*} updateId
   */
  const updateList = (updateId) => {
    let val = list.filter((data) => {
      return data.id === updateId;
    });
    myRef.current.value = val[0].text;
  };

  /**
   * Validating forms
   * @returns Boolean
   */
  const validatingForms = () => {
    let isValid = false;

    if (myRef.current.value) {
      setErrors((errors = "Type somthing"));
      return (isValid = true);
    }
    setErrors((errors = "Field can't be empty"));
    return isValid;
  };

  const renderHeading = () => {
    return (
      <div className="header">
        <div className="heading">
          <p>Todo List</p>
        </div>
        <div className="timer">
          <span>{time.toLocaleTimeString()}</span>
        </div>
      </div>
    );
  };

  const renderTime = () => {
    setTime(new Date());
  };

  const renderList = () => {
    return (
      <div className="listing-todo">
        <ul>
          {list.map((data) => {
            return (
              <li onClick={() => updateList(data.id)} key={data.id}>
                <span
                  className="remove-list"
                  onClick={() => removeList(data.id)}
                >
                  Remove
                </span>
                {data.text}
              </li>
            );
          })}
        </ul>
        <span>{emptyMsg}</span>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        {renderHeading()}
        <div className="input-wrapper">
          <div className="input-box">
            <input
              type="text"
              ref={myRef}
              placeholder={errors}
              id="input-box"
              autoComplete="off"
              required
            />
          </div>
          <div className="submit-btn">
            <button onClick={addList}>Submit</button>
          </div>
        </div>
        {renderList()}
      </div>
    </>
  );
}
