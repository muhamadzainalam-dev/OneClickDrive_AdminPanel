"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { IoMdThumbsUp } from "react-icons/io";

export default function Dashboard() {
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loadingAction, setLoadingAction] = useState({ id: null, type: null });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const notify = () =>
    toast(
      <div className="flex items-center">
        <IoMdThumbsUp className="mr-2 text-green-500 text-xl" />
        Info Successfully Updated
      </div>
    );

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) router.push("/");
  }, [router]);

  const fetchListings = async () => {
    const res = await fetch("/pages/api/listings/FetchListing/");
    const data = await res.json();
    setListings(data);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleEdit = (listing) => {
    setEditingListing(listing);
    setIsEditOpen(true);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("isLoggedIn");
      router.push("/");
    }, 1000);
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 border border-gray-700 rounded-2xl p-4 bg-gradient-to-l from-gray-900 to-gray-800 shadow-md">
        <div className="flex items-center gap-4">
          <img
            src="/Logo2.png"
            alt="Logo"
            className="h-16 w-16 object-contain bg-[#ef8221] rounded-full"
          />
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
            Admin's Dashboard
          </h1>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded text-sm font-medium min-w-[90px]"
        >
          {isLoggingOut ? <div className="loader" /> : "Logout"}
        </button>
      </div>

      <div className="w-full overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-800">
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
                <div className="flex items-center gap-2">
                  Status
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
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
              {[...listings]
                .filter(
                  (item) =>
                    statusFilter === "all" || item.status === statusFilter
                )
                .sort((a, b) => {
                  const priority = { pending: 1, approved: 2, rejected: 3 };
                  return priority[a.status] - priority[b.status];
                })
                .map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
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
                            : "bg-yellow-500 text-yellow-700 dark:bg-yellow-600 dark:text-white"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-1 py-3">
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
                        <button
                          onClick={async () => {
                            setLoadingAction({ id: item.id, type: "approve" });
                            const updated = { ...item, status: "approved" };
                            await fetch(`/pages/api/listings/${item.id}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(updated),
                            });
                            await fetchListings();
                            setLoadingAction({ id: null, type: null });
                            notify();
                          }}
                          className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded transition"
                        >
                          {loadingAction.id === item.id &&
                          loadingAction.type === "approve" ? (
                            <div className="loader" />
                          ) : (
                            "Approve"
                          )}
                        </button>

                        <button
                          onClick={async () => {
                            setLoadingAction({ id: item.id, type: "reject" });
                            const updated = { ...item, status: "rejected" };
                            await fetch(`/pages/api/listings/${item.id}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify(updated),
                            });
                            await fetchListings();
                            setLoadingAction({ id: null, type: null });
                            notify();
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded transition"
                        >
                          {loadingAction.id === item.id &&
                          loadingAction.type === "reject" ? (
                            <div className="loader" />
                          ) : (
                            "Reject"
                          )}
                        </button>

                        <button
                          onClick={() => handleEdit(item)}
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
        {isEditOpen && editingListing && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md sm:max-w-lg p-6 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setIsEditOpen(false)}
                className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>

              <h2 className="text-xl font-bold mb-4">Edit Listing</h2>

              <div className="space-y-4">
                <InputField
                  label="Car"
                  value={editingListing.title}
                  onChange={(val) =>
                    setEditingListing({ ...editingListing, title: val })
                  }
                />
                <InputField
                  label="Owner"
                  value={editingListing.owner}
                  onChange={(val) =>
                    setEditingListing({ ...editingListing, owner: val })
                  }
                />
                <InputField
                  label="Price"
                  value={editingListing.price}
                  onChange={(val) =>
                    setEditingListing({ ...editingListing, price: val })
                  }
                />
                <InputField
                  label="Location"
                  value={editingListing.location}
                  onChange={(val) =>
                    setEditingListing({ ...editingListing, location: val })
                  }
                />

                <div>
                  <label className="block mb-1">Status</label>
                  <select
                    value={editingListing.status}
                    onChange={(e) =>
                      setEditingListing({
                        ...editingListing,
                        status: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setIsSaving(true);
                    await fetch(`/pages/api/listings/${editingListing.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(editingListing),
                    });
                    await fetchListings();
                    setIsSaving(false);
                    setIsEditOpen(false);
                    notify();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded min-w-[120px] flex items-center justify-center"
                >
                  {isSaving ? <div className="loader" /> : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="block mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}
