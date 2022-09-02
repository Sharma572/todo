import React, { useState } from "react";

export const Todo1 = () => {
  const [inputValue, setInputvalue] = useState("");
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editdata, setEditData] = useState("");
  // console.log(inputValue);

  function addItems() {
    // console.log(inputValue);
    if (!inputValue) {
    } else {
      setItems([...items, inputValue]);
      setInputvalue(""); // For cleaning input when items is added
      // console.log(inputValue);
    }
  }

  const itemDelete = (index) => {
    setItems(
      items.filter((e, id) => {
        return id !== index;
      })
    );
  };

  const editConfirm = (id) => {
    const updatedItems = [...items]
    updatedItems[id] = editdata;
    setInputvalue("");
    setItems(updatedItems);
    setEditIndex(null)
  };

  return (
    <>
      <h1>Todo From React</h1>
      <input
        type="text"
        placeholder="Add Items"
        value={inputValue}
        onChange={(e) => {
          setInputvalue(e.target.value);
        }}
      />
      <button disabled={!inputValue.length} onClick={addItems}>
        Add
      </button>
      <div>
        {items.map((ele, id) => {
          return (
            <ul key={id}>
              
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "40%",
                }}
              >
                {id === editIndex ? 
                <input
                  type="text"
                  value={editdata}
                  onChange={(e) => {
                    setEditData(e.target.value);
                  }}
                />
               : 
                <h2>{ele}</h2>
              }
              {
                id === editIndex ? <button disabled={!editdata.length} onClick={()=> editConfirm(id)}>Submit</button> : <><button
                onClick={() => {
                  itemDelete(id);
                }}
              >
                Delete
              </button>
              {/* when we Click this button than we are setting setEditIndex to id and we are checking that our id === editIndex if true then submit btn renders otherWise Delete btn render */}
              <button onClick={() =>{setEditData(ele); setEditIndex(id)}}>Edit</button> </>
              }   
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};
