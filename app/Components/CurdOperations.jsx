"use client"
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
export default function CrudOperations() {
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const createUser = async () => {
    if (!name || !email) {
      return alert("Please fill all fields");
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const newUser = await response.json();

      setUsers((prev) => [
        ...prev,
        {
          ...newUser,
          id: prev.length ? Math.max(...prev.map(user => user.id)) + 1 : 1,
        },
      ]);

      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };


  const handleEdit = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };


  const updateUser = async () => {
    try {
      const response = await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingId,
          name,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const updatedUser = await response.json();

      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingId
            ? { ...user, ...updatedUser }
            : user
        )
      );

      setEditingId(null);
      setName("");
      setEmail("");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };


  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure want to delete?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      );
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-3xl font-bold text-center mb-8">
          Details of Users
        </h1>

        {/* FORM */}

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* BUTTON */}

        <div className="mb-8">
          {editingId ? (
            <button
              onClick={updateUser}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
            >
              Update User
            </button>
          ) : (
            <button
              onClick={createUser}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
            >
              Add User
            </button>
          )}
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="text-center text-xl font-semibold">
            Loading...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Email</th>
                  <th className="border p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-3">
                      {user.id}
                    </td>

                    <td className="border p-3">
                      {user.name}
                    </td>

                    <td className="border p-3">
                      {user.email}
                    </td>

                    <td className="border p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className=" text-white px-1 py-2 rounded-4xl cursor-pointer"
                      >
                        <GrEdit className="text-lg color-blue-700 text-blue-700" />
                      </button>

                      <button
                        onClick={() => deleteUser(user.id)}
                        className=" text-white px-2 py-2 rounded-4xl cursor-pointer"
                      >
                        <MdDelete className="text-lg color-red-700 text-red-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}