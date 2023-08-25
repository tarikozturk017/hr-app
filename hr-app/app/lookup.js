import React, { useState, useEffect } from "react";
import axios from "axios";

const Lookup = () => {
  const [forms, setForms] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState("");
  const [accommodationFilter, setAccommodationFilter] = useState("");

  useEffect(() => {
    fetchForms();
  }, [selectedDepartment, employmentFilter, accommodationFilter]);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/get-submitted-forms"
      );
      setForms(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleEmploymentFilterChange = (e) => {
    setEmploymentFilter(e.target.value);
  };

  const handleAccommodationFilterChange = (e) => {
    setAccommodationFilter(e.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Submission Form Lookup</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter by Department:
          </label>
          <select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Search by Name or Email:
          </label>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter by Employment Status:
          </label>
          <select
            value={employmentFilter}
            onChange={handleEmploymentFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter by Accommodation Requested:
          </label>
          <select
            value={accommodationFilter}
            onChange={handleAccommodationFilterChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All</option>
            <option value="true">Requested</option>
            <option value="false">Not Requested</option>
          </select>
        </div>
      </div>
      <table className=" mt-12 w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr className="bg-white border-b ">
            <th scope="col" class="px-6 py-3">
              First Name
            </th>
            <th scope="col" class="px-6 py-3">
              Last Name
            </th>
            <th scope="col" class="px-6 py-3">
              ID
            </th>
            <th scope="col" class="px-6 py-3">
              Email
            </th>
            <th scope="col" class="px-6 py-3">
              Department
            </th>
            <th scope="col" class="px-6 py-3">
              Employment Status
            </th>
            <th scope="col" class="px-6 py-3">
              Accommodation Requested
            </th>
          </tr>
        </thead>
        <tbody>
          {forms.map((form) =>
            (selectedDepartment === "" ||
              form.selectedDepartment === selectedDepartment) &&
            (employmentFilter === "" ||
              (employmentFilter === "employed" && form.isEmployed) ||
              (employmentFilter === "unemployed" && !form.isEmployed)) &&
            (accommodationFilter === "" ||
              (accommodationFilter === "true" && form.accommodationRequested) ||
              (accommodationFilter === "false" &&
                !form.accommodationRequested)) &&
            (searchInput === "" ||
              form.firstName
                .toLowerCase()
                .includes(searchInput.toLowerCase()) ||
              form.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||
              form.email.toLowerCase().includes(searchInput.toLowerCase())) ? (
              <tr className="bg-white border-b " key={form._id}>
                <td className="px-6 py-4">{form.firstName}</td>
                <td className="px-6 py-4">{form.lastName}</td>
                <td className="px-6 py-4">{form.id}</td>
                <td className="px-6 py-4">{form.email}</td>
                <td className="px-6 py-4">{form.selectedDepartment}</td>
                <td className="px-6 py-4">
                  {form.isEmployed ? "Employed" : "Unemployed"}
                </td>
                <td className="px-6 py-4">
                  {form.accommodationRequested ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4">
                  {form.file ? (
                    <a
                      href={`http://localhost:3001/uploads/${form.file}`}
                      download
                      className="text-blue-500 hover:underline"
                    >
                      Download File
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                {/* Add more table data here */}
              </tr>
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Lookup;
