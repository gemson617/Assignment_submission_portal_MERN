import React, { useState, useEffect, useRef, useReducer } from "react";
import axios from 'axios';
import "./index.css";




export default function TodoComp() {
  const [name, setName] = useState("");
  const [ showCompleted, setShowCompleted] = useState(false);

  const addAssignment = () => {
    // alert(name)
    axios.post('http://localhost:5000/addAssignment', {name:name})
    .then((res)=>{
      console.log(res.data);
    })
  }

  return (
    <div className="bg-fixed gradient-background">
      <div class="flex items-center flex-col ml-0 m-1 w-full p-4 pt-10  pr-4">
        <div class="">
          <h1 class="text-2xl text- ml-0 text-white sm:max-2xl:text-3xl font-sans underline">
            Add Todo
          </h1>
        <form >
            <div class="">
                <input type="text" class="w-96 p-2 m-2 rounded border-l-2 border-l-slate-900 focus:border-l-4 focus:border-b-blue-900  focus:outline-none font-sans text-slate-900 font-semibold uppercase shadow-xl"  placeholder="Enter Todo" value={name} name="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <input type="submit" onClick={addAssignment} value="submit" class=" border-2 border-green-400 rounded p-2 py-1 bg-slate-50 font-serif font-medium ml-2 hover:bg-green-400 ease-linear duration-300"  />
        </form>
        </div>
      </div>
    </div>
  );
}
