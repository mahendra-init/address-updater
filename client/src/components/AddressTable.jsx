import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { BASE_URI, IndianStates } from "../constant";
import { ToastContainer, toast } from "react-toastify";

const AddressTable = () => {
  const columns = [
    {
      title: "Street",
      dataIndex: "street",
      key: "street",
      sorter: (a, b) => a.street.localeCompare(b.street),
      ellipsis: true,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a, b) => a.city.localeCompare(b.city),
      ellipsis: true,
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      sorter: (a, b) => a.state.localeCompare(b.state),
      ellipsis: true,
    },
    {
      title: "Pincode",
      dataIndex: "zip",
      key: "zip",
      sorter: (a, b) => a.zip - b.zip,
      ellipsis: true,
    },
    {
      title: "Action",
      render: (_, record) => (
        <div className="flex space-x-3">
          <button
            onClick={() => {
              setId(record._id);
              setStreet(record.street);
              setCity(record.city);
              setZipCode(record.zip);
              setState(record.state);
              setIsModalOpen(true);
            }}
            className="bg-green-500 hover:bg-green-600 text-white max-w-48 font-bold p-2 rounded shadow-lg hover:shadow-xl transition duration-200 ease-in-out flex justify-center items-center"
          >
            Update
          </button>
          <button
            onClick={() => handleDelete(record._id)}
            className="bg-red-500 hover:bg-red-600 text-white max-w-48 font-bold p-2 rounded shadow-lg hover:shadow-xl transition duration-200 ease-in-out flex justify-center items-center"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [Id, setId] = useState("");
  const [Street, setStreet] = useState("");
  const [City, setCity] = useState("");
  const [State, setState] = useState("");
  const [ZipCode, setZipCode] = useState();

  const handleDelete = (id) => {
    fetch(`${BASE_URI}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Deleted", data);
      });
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const newAdd = {
        _id: Id,
        street: Street,
        city: City,
        state: State,
        zip: ZipCode,
      };

      console.log(newAdd);
      fetch(`${BASE_URI}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdd),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          toast.success("Address updated successfully");
          setId("");
          setStreet("");
          setCity("");
          setState("");
          setZipCode("");
        });
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAddresses();
  }, [data]);

  const fetchAddresses = () => {
    fetch(BASE_URI)
      .then((response) => response.json())
      .then((addressess) => {
        setData(addressess.data);
      });
  };

  return (
    <>
      <Table
        rowKey={"_id"}
        columns={columns}
        dataSource={[...data]}
        pagination={true}
      />

      <Modal
        title={"Update Address"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
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
                value={Street}
                onChange={(e) => setStreet(e.target.value)}
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
                  value={City}
                  onChange={(e) => setCity(e.target.value)}
                  type="text"
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
                    value={State}
                    onChange={(e) => setState(e.target.value)}
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
                  value={ZipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white max-w-48 font-bold p-2 rounded shadow-lg hover:shadow-xl transition duration-200 ease-in-out flex justify-center items-center"
          >
            Update
          </button>
        </form>
      </Modal>
      <ToastContainer />
    </>
  );
};
export default AddressTable;
