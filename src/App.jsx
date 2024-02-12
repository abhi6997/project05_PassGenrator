import { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()-_=+[]{}|;:'\",.<>?/";

    for (let i = 0; i <length; i++) {
      let a = Math.floor(Math.random() * str.length );
      pass = pass + str.charAt(a);
      
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed,setPassword]);

  const copyPasswordToClipBoard = ()=>{
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(0,9)
    window.navigator.clipboard.writeText(password)
  }

  useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed])
  return (
    <>
      <div className="w-1/2 m-auto flex flex-col items-center rounded-lg  bg-gray-400 my-8 gap-4 py-8">
        <h1 className="flex rounded-lg text-2xl">Password Generator</h1>
        <div className="w-4/6 flex ">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 rounded-l-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="rounded-r-lg bg-blue-950 px-4 text-white" onClick={copyPasswordToClipBoard}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-10"><div className="flex items-center gap-x-1">
          <input type="range"
          min={6}
          max={100}
          value ={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}} />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked = {numberAllowed}
          id="numberInput"
          className="cursor-pointer"
          onChange={()=>{setNumberAllowed((prev)=>!prev)}} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked = {charAllowed}
          id="charInput"
          className="cursor-pointer"
          onChange={()=>{setCharAllowed((prev)=>!prev)}} />
          <label htmlFor="charInput">Charecters</label>
        </div></div>
        
      </div>
    </>
  );
}

export default App;
