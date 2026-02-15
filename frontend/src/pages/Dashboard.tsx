import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { LuLink } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Dashboard = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("http://localhost:3000/vault/data", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        if (data.payload) {
          setData(data.payload);
        }
      } catch (error) {
        console.error("Error fetching vaults:", error);
      }
    };
    fetchLinks();
  }, []);

  const handleDelete = async (_id:string) => {
    try {
      const response = await fetch("http://localhost:3000/vault", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link_ids : [_id] }),
      });
      if (response.ok) {
        setData(data.filter((vault) => vault._id !== _id));
      } else {
        console.error("Failed to delete vault");
      }
    } catch (error) {
      console.error("Error deleting vault:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full flex-col gap-4">
      <nav className="fixed top-0 bg-white/10 h-14 w-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="bg-white/70 size-9 rounded-full flex items-center justify-center mr-2">
            <LuLink className="size-4 text-black/80" />
          </div>
          <span className="font-semibold tracking-wider">Secure Vault</span>
        </div>
        <a href="/upload">
          <button className="bg-black/80 text-white px-4 py-1 rounded-md w-24 h-7 hover:bg-black transition-colors duration-300 flex items-center justify-center text-xs font-semibold tracking-wider">
            Upload
          </button>
        </a>
      </nav>
      <main>
        <h1 className="text-2xl font-bold">Your Vaults</h1>
        <p className="text-black">Manage your secure vaults here.</p>
        <div className="mt-6 flex flex-col gap-4">
          {data.map((vault: any) => (
            <div
              key={vault._id}
              className="flex justify-end items-center gap-4 h-24"
            >
              <div
                className="bg-black/80 p-4 rounded-lg shadow-md hover:bg-black/70 transition-colors duration-300 cursor-pointer w-full"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "http://localhost:5173/vault/" + vault.token,
                  );
                  alert("Link copied to clipboard!");
                }}
              >
                <h2 className="text-lg font-semibold">{vault.name}</h2>
                <h3>
                  <span className="text-sm text-gray-400">Url: </span>
                  <span className="text-sm text-white">
                    http://localhost:5173/vault/{vault.token}
                  </span>
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  Created on: {new Date(vault.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Expires on: {new Date(vault.expiresAt).toLocaleDateString()}
                </p>
                {vault.maxViews && (
                  <p className="text-gray-500 text-sm mt-1">
                    Views :{vault.maxViews}/ {vault.viewCount}
                  </p>
                )}
              </div>
              <div
                className=" cursor-pointer hover:scale-105 transition-all duration-300
              ease-in-out bg-black/80 rounded-md w-10 flex items-center justify-center h-full"
             onClick={()=>{
              handleDelete(vault._id)
             }} >
                <MdDeleteOutline className="size-5 text-red-500 cursor-pointer hover:text-red-400 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
