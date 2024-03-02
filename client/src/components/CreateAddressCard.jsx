import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URI, IndianStates } from "../constant";

function CreateAddressCard() {
  const [newAdd, setNewAdd] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const validateAddress = () => {
    if (
      !newAdd.street.trim() ||
      !newAdd.city.trim() ||
      !newAdd.state.trim() ||
      !newAdd.zip.trim()
    ) {
      toast.error("All fields are mandatory!");
      return false;
    }

    const zipCodePattern = /^[0-9]{6}$/;
    if (!zipCodePattern.test(newAdd.zip)) {
      toast.error("Please enter a valid ZIP code!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateAddress()) {
        throw new Error();
      }
      const response = await fetch(BASE_URI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdd),
      });
      const data = await response.json();
      console.log(data);
      setNewAdd({ street: "", city: "", state: "", zip: "" });
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  const handleChange = (e) => {
    setNewAdd({ ...newAdd, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-1 flex-col mx-auto px-4">
      <h1 className="text-xl font-bold mb-4">Address Updater</h1>
      <form onSubmit={handleSubmit} className="sm:w-full mb-4">
        <div className="flex flex-col -mx-3 mb-2">
          <div className="w-full px-3 mb-6 md:mb-2 flex-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-city"
            >
              Street
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              name="street"
              value={newAdd.street}
              onChange={handleChange}
              placeholder="Alfred Market"
            />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                City
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                name="city"
                value={newAdd.city}
                onChange={handleChange}
                type="text"
                placeholder="Marriot"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-state"
              >
                State
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  name="state"
                  value={newAdd.state}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {IndianStates.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Pincode
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
                name="zip"
                maxLength={6}
                value={newAdd.zip}
                onChange={handleChange}
                placeholder="400607"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white max-w-48 font-bold p-2 rounded shadow-lg hover:shadow-xl transition duration-200 ease-in-out flex justify-center items-center"
        >
          Add
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateAddressCard;
