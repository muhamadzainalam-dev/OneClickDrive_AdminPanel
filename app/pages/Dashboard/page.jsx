"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { IoMdThumbsUp } from "react-icons/io";

export default function Dashboard() {
  const router = useRouter();

  const [carsList, setCarsList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editModeOn, setEditModeOn] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState("all");
  const [btnLoader, setBtnLoader] = useState({ id: null, type: null });
  const [savingNow, setSavingNow] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const notifyUpdate = () =>
    toast(
      <div className="flex items-center">
        <IoMdThumbsUp className="mr-2 text-green-500 text-xl" />
        Info Saved!
      </div>
    );

  useEffect(() => {
    const ok = localStorage.getItem("isLoggedIn");
    if (!ok) window.location.href = "/";
  }, []);

  const loadCarsData = async () => {
    try {
      const res = await fetch("/pages/api/listings/FetchListing/");
      const stuff = await res.json();
      setCarsList(stuff);
    } catch (err) {
      console.log("error loading cars", err);
    }
  };

  useEffect(() => {
    loadCarsData();
  }, []);

  const startEditing = (item) => {
    setEditing(item);
    setEditModeOn(true);
  };

  const logoutNow = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      localStorage.clear(); // lazy way 😅
      window.location.href = "/";
    }, 800);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border border-gray-700 rounded-2xl p-4 bg-gradient-to-l from-gray-900 to-gray-800 shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src="/Logo2.png"
            alt="Logo"
            className="h-16 w-16 object-contain bg-[#ef8221] rounded-full"
          />
          <h1 className="text-xl sm:text-2xl font-bold">Admin Panel</h1>
        </div>
        <button
          onClick={logoutNow}
          disabled={logoutLoading}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-wait text-white px-4 py-2 rounded text-sm font-medium min-w-[90px]"
        >
          {logoutLoading ? <div className="loader" /> : "Logout"}
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">
            <tr>
              <th className="px-6 py-4 text-left">#</th>
              <th className="px-6 py-4 text-left">Car</th>
              <th className="px-6 py-4 text-left">Owner</th>
              <th className="px-6 py-4 text-left hidden sm:table-cell">
                Price
              </th>
              <th className="px-6 py-4 text-left hidden sm:table-cell">
                Location
              </th>
              <th className="text-left">
                {/* Status dropdown filter */}
                <div className="flex items-center gap-2">
                  Status
                  <select
                    value={filterByStatus}
                    onChange={(e) => setFilterByStatus(e.target.value)}
                    className="px-1 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm dark:text-white"
                  >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {[...carsList]
                .filter((item) =>
                  filterByStatus === "all"
                    ? true
                    : item.status === filterByStatus
                )
                .sort((a, b) => {
                  const sortWeight = { pending: 1, approved: 2, rejected: 3 };
                  return sortWeight[a.status] - sortWeight[b.status];
                })
                .map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.025 }}
                    className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3 font-medium">{item.title}</td>
                    <td className="px-6 py-3">{item.owner}</td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      {item.price}
                    </td>
                    <td className="px-6 py-3 hidden sm:table-cell">
                      {item.location}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.status === "approved"
                            ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-white"
                            : item.status === "rejected"
                            ? "bg-red-100 text-red-600 dark:bg-red-600 dark:text-white"
                            : "bg-yellow-500 text-yellow-800 dark:bg-yellow-600 dark:text-white"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-1 py-3">
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                        {/* Approve Button */}
                        <button
                          onClick={async () => {
                            setBtnLoader({ id: item.id, type: "approve" });
                            const updatedStatus = {
                              ...item,
                              status: "approved",
                            };

                            try {
                              await fetch(`/pages/api/listings/${item.id}`, {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(updatedStatus),
                              });
                              await loadCarsData(); // just reload everything again
                              notifyUpdate();
                            } catch (err) {
                              console.log("approve failed", err);
                            } finally {
                              setBtnLoader({ id: null, type: null });
                            }
                          }}
                          className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded transition"
                        >
                          {btnLoader.id === item.id &&
                          btnLoader.type === "approve" ? (
                            <div className="loader" />
                          ) : (
                            "Approve"
                          )}
                        </button>

                        {/* Reject Button */}
                        <button
                          onClick={async () => {
                            setBtnLoader({ id: item.id, type: "reject" });
                            const updatedStatus = {
                              ...item,
                              status: "rejected",
                            };

                            try {
                              await fetch(`/pages/api/listings/${item.id}`, {
                                method: "PUT",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(updatedStatus),
                              });
                              await loadCarsData(); // reload after rejection
                              notifyUpdate();
                            } catch (err) {
                              console.log("rejection failed", err);
                            } finally {
                              setBtnLoader({ id: null, type: null });
                            }
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
                        >
                          {btnLoader.id === item.id &&
                          btnLoader.type === "reject" ? (
                            <div className="loader" />
                          ) : (
                            "Reject"
                          )}
                        </button>

                        {/* Edit Button */}
                        <button
                          onClick={() => startEditing(item)}
                          className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-3 py-1 rounded transition"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editModeOn && editing && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg p-6 relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button
                onClick={() => setEditModeOn(false)}
                className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>

              <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

              <div className="space-y-4">
                <InputField
                  label="Car"
                  value={editing.title}
                  onChange={(val) => setEditing({ ...editing, title: val })}
                />
                <InputField
                  label="Owner"
                  value={editing.owner}
                  onChange={(val) => setEditing({ ...editing, owner: val })}
                />
                <InputField
                  label="Price"
                  value={editing.price}
                  onChange={(val) => setEditing({ ...editing, price: val })}
                />
                <InputField
                  label="Location"
                  value={editing.location}
                  onChange={(val) => setEditing({ ...editing, location: val })}
                />

                {/* Status dropdown */}
                <div>
                  <label className="block mb-1">Status</label>
                  <select
                    value={editing.status}
                    onChange={(e) =>
                      setEditing({ ...editing, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Footer buttons */}
              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => setEditModeOn(false)}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setSavingNow(true);
                    try {
                      await fetch(`/pages/api/listings/${editing.id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(editing),
                      });
                      await loadCarsData(); // reload to reflect edit
                      notifyUpdate();
                      setEditModeOn(false);
                    } catch (err) {
                      console.error("save failed", err);
                    } finally {
                      setSavingNow(false);
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded min-w-[120px] flex items-center justify-center"
                >
                  {savingNow ? <div className="loader" /> : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast messages */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </motion.div>
  );
}

// basic input
function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-sm">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-blue-400/30"
      />
    </div>
  );
}
