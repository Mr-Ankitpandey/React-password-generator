import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);

  const passRef = useRef(null);

  //password generate logic
  const generatePassword = () => {
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let pass = "";

    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += "!@#$%&*";

    for (let i = 1; i <= length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      let characterPicked = str.charAt(randomIndex);
      pass += characterPicked;
    }
    setPassword(pass);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    passRef.current.select();
  };

  const notify = () => toast("Copied to Clipboard");

  const handleClick = () => {
    copyPassword();
    notify();
  };

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharacterAllowed]);

  return (
    <>
      <div className="flex flex-col gap-5 max-w-120 m-auto border rounded-3xl p-8 select-none">
        <h1 className="text-2xl">Password Generator</h1>

        <input
          type="text"
          placeholder="Password"
          value={password}
          readOnly={true}
          ref={passRef}
          className="outline-none border-none px-3 py-2 rounded-lg bg-gray-200 text-black"
        />

        <input
          type="range"
          min={0}
          max={50}
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />

        <div className="flex flex-col gap-4 text-xl">
          <label htmlFor="number">
            <input
              type="checkbox"
              id="number"
              className="mx-2 w-5 h-5"
              checked={isNumberAllowed}
              onChange={(e) => setIsNumberAllowed(e.target.checked)}
            />
            Include Numbers
          </label>
          <label htmlFor="character">
            <input
              type="checkbox"
              id="character"
              className="mx-2 h-5 w-5"
              checked={isCharacterAllowed}
              onChange={(e) => setIsCharacterAllowed(e.target.checked)}
            />
            Include Characters
          </label>
        </div>

        <button
          className="bg-blue-500 px-m py-2 rounded-lg text-xl max-w-90 m-auto px-8"
          onClick={handleClick}
        >
          Copy Password
        </button>
        <button
          className="bg-red-700 px-m py-2 rounded-lg text-xl max-w-90 m-auto px-8 "
          onClick={() => {
            setLength(8);
            setIsCharacterAllowed(false);
            setIsNumberAllowed(false);
          }}
        >
          Reset Password
        </button>

        <div>
          <ToastContainer autoClose={3000} />
        </div>
      </div>
    </>
  );
}

export default App;
