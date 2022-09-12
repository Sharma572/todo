import React, { useState, useEffect } from "react";
import { Button, TextField,Box } from "@mui/material";


// Get data from Local Storge
const getData = () => {
  let listData = localStorage.getItem("lists");
  console.log(listData);
  if (listData) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

export const Todo1 = () => {
  const [inputValue, setInputvalue] = useState("");
  const [items, setItems] = useState(getData());
  const [editIndex, setEditIndex] = useState(null);
  const [editdata, setEditData] = useState("");
  // console.log(inputValue);

  function addItems() {
    // console.log(inputValue);
    if (!inputValue) {
    } else {
      setItems([...items, inputValue]);
      setInputvalue(""); // For cleaning input when items is added
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
    const updatedItems = [...items];
    updatedItems[id] = editdata;
    setInputvalue("");
    setItems(updatedItems);
    setEditIndex(null);
  };

  //   Add data to Local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <h1 style={{textAlign:"center"}}>Todo From React</h1>
    <Box id="todo-container" sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItem:'center' ,width:"50%", m:"auto",border:'1px solid blue',p:2}}>
       <Box sx={{display: 'flex',width:"80%", m:"auto",justifyContent: 'center',alignItem:'center'}}>
       <TextField
        value={inputValue}
        onChange={(e) => {
          setInputvalue(e.target.value);
        }}
        id="standard-basic"
        placeholder="Add List...."
        variant="standard"
      />
      <Button
        variant="contained"
        color="success"
        sx={{ ml: 2 }}
        disabled={!inputValue.length}
        onClick={addItems}
      >
        Add
      </Button>
       </Box>

      <Box sx={{display: 'flex',flexDirection:"column",width:"80%", m:"auto",justifyContent: 'center',alignItem:'center'}}>
        {items.map((ele, id) => {
          return (
            <ul key={id}  style={{
              display: "flex",
              flexDirection:'column',
              alignItems: "center",
              width:"100%",
              justifyContent: "space-between",
              
            }}>
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  width:"80%",
                  justifyContent: "space-between",
                  
                }}
              >
                {id === editIndex ? (
                 <TextField
                 value={editdata}
                 onChange={(e) => {
                   setEditData(e.target.value);
                    }}
                    sx={{mt:2 , mb:1}}
                 id="standard-basic"
                 variant="standard"
               />
                ) : (
                  <p>{ele}</p>
                )}
                {id === editIndex ? (

<Button
        variant="contained"
        color="success"
        sx={{ ml: 2 }}
        disabled={!editdata.length}
        onClick={() => editConfirm(id)}
      >
        Submit
      </Button>

        
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        itemDelete(id);
                      }}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                    {/* when we Click this button than we are setting setEditIndex to id and we are checking that our id === editIndex if true then submit btn renders otherWise Delete btn render */}
                    
                

                    <Button variant="outlined" color="primary"  onClick={() => {
                        setEditData(ele);
                        setEditIndex(id);
                      }}>
                      Edit
                    </Button>{" "}
                  </>
                )}
              </li>
            </ul>
          );
        })}
      </Box>
      </Box>
    </>
  );
};
