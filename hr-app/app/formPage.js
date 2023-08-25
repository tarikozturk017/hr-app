import { useState } from "react";
import axios from "axios";

const FormPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState();
  const [isEmployed, setIsEmployed] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [accommodationRequested, setAccommodationRequested] = useState(false);
  const [file, setFile] = useState(null); // New state for the file

  const departments = ["HR", "IT", "Finance", "Marketing", "Operations"];

  const handleEmploymentChange = (e) => {
    setIsEmployed(e.target.checked);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleAccommodationRequestChange = (e) => {
    setAccommodationRequested(e.target.checked);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Update the file state with the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName,
      lastName,
      id,
      isEmployed,
      email,
      selectedDepartment,
      accommodationRequested,
      file,
    };

    // console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/submit-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        }
      );
      console.log(response.data.message); // Data stored successfully
      setFirstName("");
      setLastName("");
      setId();
      setIsEmployed(false);
      setAccommodationRequested(false);
      setEmail("");
      setSelectedDepartment("");
      setFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            autocomplete="off"
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label
            for="floating_first_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            First name
          </label>
        </div>
        <div class="relative z-0 w-full mb-6 group">
          <input
            autocomplete="off"
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label
            for="floating_last_name"
            class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Last name
          </label>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative z-0 w-full mb-6 group">
          <input
            autocomplete="off"
            type="number"
            name="floating_id"
            id="floating_id"
            class="remove-arrow block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label
            for="floating_id"
            class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            ID
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="floating_department" className="text-gray-500">
            Department
          </label>
          <select
            id="floating_department"
            name="floating_department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
          >
            <option value="" disabled>
              Select a department
            </option>
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="accommodation" className="text-gray-500 mb-2 block">
          Employment Status
        </label>
        <label htmlFor="employment_status" className="flex items-center">
          <input
            type="checkbox"
            id="employment_status"
            name="employment_status"
            checked={isEmployed}
            onChange={handleEmploymentChange}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-gray-500">Currently employed</span>
        </label>
      </div>

      <div class="relative z-0 w-full mb-6 group">
        <input
          autoComplete={"off"}
          type="email"
          name="floating_email"
          id="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="accommodation" className="text-gray-500 mb-2 block">
          Accommodation Request
        </label>
        <label htmlFor="accommodation_request" className="flex items-center">
          <input
            type="checkbox"
            id="accommodation_request"
            name="accommodation_request"
            checked={accommodationRequested}
            onChange={handleAccommodationRequestChange}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-gray-500">
            Click to Request Accommodation
          </span>
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <label htmlFor="file" className="text-gray-500">
          Upload File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleFileChange}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
        />
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  );
};
export default FormPage;
