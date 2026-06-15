"use client";
import React, { useState, useEffect } from "react";

export default function Storage() {
  const [localValue, setLocalValue] = useState("");
  const [sessionValue, setSessionValue] = useState("");
  const [cookieValue, setCookieValue] = useState("");

  const [storedLocal, setStoredLocal] = useState("");
  const [storedSession, setStoredSession] = useState("");
  const [storedCookie, setStoredCookie] = useState("");

  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let cookie of cookies) {
      cookie = cookie.trim();

      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length);
      }
    }

    return "";
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  };

 
  useEffect(() => {
    setStoredLocal(localStorage.getItem("localData") || "");
    setStoredSession(sessionStorage.getItem("sessionData") || "");
    setStoredCookie(getCookie("cookieData"));
  }, []);


  const saveLocalStorage = () => {
    localStorage.setItem("localData", localValue);
    setStoredLocal(localValue);
    setLocalValue("");
  };

  
  const saveSessionStorage = () => {
    sessionStorage.setItem("sessionData", sessionValue);
    setStoredSession(sessionValue);
    setSessionValue("");
  };

  
  const saveCookie = () => {
    setCookie("cookieData", cookieValue, 7);
    setStoredCookie(cookieValue);
    setCookieValue("");
  };

  const clearAll = () => {
    localStorage.removeItem("localData");
    sessionStorage.removeItem("sessionData");
    deleteCookie("cookieData");

    setStoredLocal("");
    setStoredSession("");
    setStoredCookie("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          React Storage Example
        </h1>

        {/* Local Storage */}
        <div className="border rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Local Storage
          </h2>

          <input
            type="text"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            placeholder="Enter Local Storage Data"
            className="w-50 border p-3 rounded mb-3"
          />

          <button
            onClick={saveLocalStorage}
            className="bg-black hover:bg-black text-white px-4 py-2 rounded cursor-pointer ml-10"
          >
            Save Local Storage
          </button>

          <p className="mt-3">
            <strong>Stored Value:</strong>{" "}
            {storedLocal || "No data stored"}
          </p>
        </div>

        {/* Session Storage */}
        <div className="border rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Session Storage
          </h2>

          <input
            type="text"
            value={sessionValue}
            onChange={(e) => setSessionValue(e.target.value)}
            placeholder="Enter Session Storage Data"
            className="w-50 border p-3 rounded mb-3"
          />

          <button
            onClick={saveSessionStorage}
            className="bg-black hover:bg-black text-white px-4 py-2 rounded cursor-pointer ml-10"
          >
            Save Session Storage
          </button>

          <p className="mt-3">
            <strong>Stored Value:</strong>{" "}
            {storedSession || "No data stored"}
          </p>
        </div>

        {/* Cookies */}
        <div className="border rounded-lg p-5 mb-6">
          <h2 className="text-xl font-semibold mb-3 text-black">
            Cookies
          </h2>

          <input
            type="text"
            value={cookieValue}
            onChange={(e) => setCookieValue(e.target.value)}
            placeholder="Enter Cookie Data"
            className="w-50 border p-3 rounded mb-3 "
          />

          <button
            onClick={saveCookie}
            className="bg-black hover:bg-black text-white px-4 py-2 rounded cursor-pointer ml-10"
          >
            Save Cookie (7 Days)
          </button>

          <p className="mt-3">
            <strong>Stored Value:</strong>{" "}
            {storedCookie || "No data stored"}
          </p>
        </div>


        <button
          onClick={clearAll}
          className="w-40 bg-black hover:bg-black text-white py-3 rounded-lg font-semibold cursor-pointer "
        >
          Clear All Storage
        </button>
      </div>
    </div>
  );
}