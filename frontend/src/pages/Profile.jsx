import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useExpense } from '../context/ExpenseContext'



const Profile = () => {
    const { user, logoutUser } = useAuth()
    const { categories, fetchCategories, addCategory } = useExpense()

    const [categoryName, setCategoryName] = useState("")

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(categoryName === undefined || categoryName === "") {
            alert("Enter valid Category")
            return
        }

        addCategory(categoryName)
        setCategoryName("")
    }


  return (
    <div className="container w-4/5 mx-auto h-full flex flex-col items-center justify-center ">
    {/* User Info */}
    <div className="text-center mb-6">
      <div className="avatar mb-4">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src={user?.avatar} alt="User Avatar" />
        </div>
      </div>
      <h2 className="text-2xl font-bold">{user?.username}</h2>
      <p className="text-gray-500">{user?.email}</p>
      <button onClick={logoutUser} className="btn btn-error mt-4">
        Log Off
      </button>
    </div>

    {/* Add/Edit Category Form */}
    <form onSubmit={handleSubmit} className="flex gap-4 items-center mb-6 w-full max-w-md">
      <input
        type="text"
        name="categoryName"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="Add a new category"
        className="input input-bordered flex-grow"
        required
      />
      <button type="submit" className="btn btn-primary">
        {/* {formData.id ? "Update" : "Add"} */}
        Add
      </button>
    </form>

    {/* Categories Table */}
    <div className="w-full max-w-md">
        <div>
            <h2 className='my-2 text-xl'>Your Categories</h2>
        </div>
      <table className="table w-full border rounded-lg">
        <thead>
          <tr className="border border-white">
            <th className="text-left px-4 py-2">#</th>
            <th className="text-left px-4 py-2">Category Name</th>
            {/* <th className="text-center px-4 py-2">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id} className="">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 capitalize">{category.categoryName}</td>
              {/* <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleEdit(category)}
                  className="btn btn-sm btn-info mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Profile