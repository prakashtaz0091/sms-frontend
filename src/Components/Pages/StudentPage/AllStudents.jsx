import React, { useState, useEffect, useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit, MdSave } from "react-icons/md";
import { FaRegEye, FaUser } from "react-icons/fa";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { IoFilterSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import axios from "axios";
import {AuthContext} from "../../../context/AuthContext";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AllStudents = () => {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [originalRows, setOriginalRows] = useState([]); // Store original data before editing


  const { api } = useContext(AuthContext);

  // Load data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Optionally log the current access token
        const accessToken = localStorage.getItem("access_token");
        // console.log("Current Access Token:", accessToken);
  
        const response = await api.get("/student/");
        console.log(response.data);
        setRows(response.data);
        setFilteredRows(response.data);
        setOriginalRows(response.data);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching data:", error);
        // Log additional details from the error response
        if (error.response) {
          // console.error("Response data:", error.response.data);
        }
      }
    };
  
    fetchData();
  }, [api]);
  

  const filterRows = (criteria) => {
    const lowercasedCriteria = criteria.toLowerCase();

    const filtered = rows.filter((row) => {
      const { enrollmentId, name, gender, class: studentClass, phoneNo, fatherName } = row;

      const matchesEnrollmentId = enrollmentId.toLowerCase().includes(lowercasedCriteria);
      const matchesName = name.toLowerCase().includes(lowercasedCriteria);
      const matchesGender = gender.toLowerCase() === lowercasedCriteria; // Exact match for gender
      const matchesPhoneNo = phoneNo.toLowerCase().includes(lowercasedCriteria);
      const matchesFatherName = fatherName.toLowerCase().includes(lowercasedCriteria);
      const matchesClass = String(studentClass).toLowerCase() === lowercasedCriteria; // Exact match for class

      return (
        matchesEnrollmentId ||
        matchesName ||
        matchesGender ||
        matchesPhoneNo ||
        matchesFatherName ||
        matchesClass
      );
    });

    setFilteredRows(filtered.length > 0 ? filtered : [{ message: "No data found" }]);
  };

  const handleSearch = () => {
    filterRows(searchTerm);
  };

  const handleRefresh = () => {
    setFilteredRows(rows);
    setSearchTerm("");
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    
    if (confirmDelete) {
      const newRows = filteredRows.filter((_, i) => i !== index);
      setRows(newRows);
      setFilteredRows(newRows);
    }
  };

  const handleEdit = (index) => {
    const newRows = [...filteredRows];
    newRows[index].isEditing = true; // Mark the row as being edited
    setFilteredRows(newRows);
  };

  const handleCancel = (index) => {
    const newRows = [...filteredRows];
    newRows[index] = { ...originalRows[index], isEditing: false }; // Restore original row data
    setFilteredRows(newRows);
  };

  const handleSave = (index) => {
    const newRows = [...filteredRows];
    newRows[index].isEditing = false; // Mark the row as not being edited
    setFilteredRows(newRows);
  };

  const handleChange = (index, field, value) => {
    const newRows = [...filteredRows];
    newRows[index][field] = value; // Update the specific field
    setFilteredRows(newRows);
  };

  return (
    isLoading ? <div>Loading...</div> : 
    <>
      <div className="p-8 bg-pink-100">
        <div className="flex gap-4 bg-white rounded-3xl p-2">
          <div className="flex items-center space-x-2">
            <FaUser className="text-gray-700" />
            <span className="text-gray-700 font-medium">Students</span>
          </div>
          <div className="border-l border-gray-700 h-6"></div>
          <div>
            <span className="text-gray-700 font-medium">All Students</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-row gap-4 justify-end items-center py-10">
          <div>
            <div className="flex items-center bg-white rounded-full">
              <IoFilterSharp
                className="text-gray-600 ml-4 cursor-pointer"
                size={24}
                onClick={() => filterRows(searchTerm)} // Trigger filter on click
              />
              <div className="w-px h-6 bg-gray-600 mx-4"></div>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow px-4 py-2 text-gray-600 placeholder-gray-500 bg-transparent focus:outline-none"
              />
              <IoSearch
                className="text-gray-600 mr-4 cursor-pointer transition-colors duration-300 hover:text-blue-500"
                size={24}
                onClick={handleSearch} // Trigger search on click
              />
            </div>
          </div>
          <div
            className="border border-[#BCA8EA] p-2 bg-white rounded-full cursor-pointer transition-all duration-200 hover:bg-[#F3E8FF] hover:shadow-lg"
            onClick={handleRefresh}
          >
            <FiRefreshCcw className="text-gray-600 transition-transform duration-200 hover:rotate-180 text-xl" />
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl shadow-lg">
          <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg overflow-hidden">
            <thead>
              <tr>
                <th className="p-2 py-6">Enrollment ID</th>
                <th className="p-2 py-6">Name</th>
                <th className="p-2 py-6">Father's Name</th>
                <th className="p-2 py-6">Gender</th>
                <th className="p-2 py-6">Class</th>
                <th className="p-2 py-6">Roll No.</th>
                <th className="p-2 py-6">Phone No.</th>
                <th className="p-2 py-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows[0].message ? (
                  <tr>
                    <td colSpan="8" className="p-2 text-center text-gray-500">
                      {filteredRows[0].message}
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((row, index) => (
                    <tr
                      key={index}
                      className={`border border-gray-300 ${index % 2 === 0 ? "bg-[#BCA8EA]" : "bg-[#E3D6FF]"}`}
                    >
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.enrollmentId}
                            readOnly
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          row.enrollmentId
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.name}
                            onChange={(e) => handleChange(index, "name", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          row.studentFirstName + " " +row.studentMiddleName +" " + row.studentLastName
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.fatherName}
                            onChange={(e) => handleChange(index, "fatherName", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                            row.fatherFirstName + " " +row.fatherMiddleName +" " + row.fatherLastName
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <select
                            value={row.gender}
                            onChange={(e) => handleChange(index, "gender", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          row.gender
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.class}
                            onChange={(e) => handleChange(index, "class", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          row.classOfAdmission
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="number"
                            value={row.rollNo}
                            onChange={(e) => handleChange(index, "rollNo", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          row.rollNo
                        )}
                      </td>
                      <td className="p-2 text-center">
                        {row.isEditing ? (
                          <input
                            type="text"
                            value={row.phoneNo}
                            onChange={(e) => handleChange(index, "phoneNo", e.target.value)}
                            className="border rounded w-full py-1 px-2"
                          />
                        ) : (
                          row.phoneNumber
                        )}
                      </td>
                      <td className="p-2 text-center flex justify-center gap-2">
                        {row.isEditing ? (
                          <>
                            <button
                              onClick={() => handleSave(index)}
                              className="text-green-600"
                            >
                              <MdSave />
                            </button>
                            <button
                              onClick={() => handleCancel(index)}
                              className="text-red-600"
                            >
                              <MdCancel />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-blue-600"
                            >
                              <MdOutlineEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-600"
                            >
                              <RiDeleteBin6Line />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="8" className="p-2 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllStudents;
