import { useEffect, useState } from "react";
import { LuLink } from "react-icons/lu";
import { Link } from "react-router-dom";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [type, setType] = useState<"TEXT" | "FILE">("FILE");
  const [expiresAt, setExpiresAt] = useState<string>("10"); // default 10 minutes
  const [password, setPassword] = useState("");
  const [maxViews, setMaxViews] = useState<number | null>(null);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setFile(null);
    setTextContent("");
    setExpiresAt("10");
    setPassword("");
    setMaxViews(null);
    setUrl("");
  }, []);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file && type === "FILE") {
      alert("Please select a file to upload.");
      return;
    }
    if (!textContent && type === "TEXT") {
      alert("Please enter text content.");
      return;
    }

    const formData = new FormData();
    if (type === "TEXT") {
      formData.append("textContent", textContent);
    } else {
      formData.append("file", file as any);
    }
    formData.append("type", type);
    formData.append("expiresAt", expiresAt.toString());
    formData.append("password", password);
    if (maxViews !== null) {
      formData.append("maxViews", maxViews.toString());
    }

    fetch("http://localhost:3000/vault", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("File uploaded successfully!");
          setFile(null);
          setTextContent("");
          setExpiresAt("10");
          setPassword("");
          setMaxViews(null);
          setUrl(
            data.payload?.token
              ? `http://localhost:5173/vault/${data.payload.token}`
              : "",
          );
        } else {
          alert("Upload failed: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Upload error:", err);
        alert("Upload failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center pt-24 h-full flex-col gap-4 overflow-y-scroll">
      <nav className="fixed top-0 bg-white/10 h-14 w-full flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="bg-white/70 size-9 rounded-full flex items-center justify-center mr-2">
            <LuLink className="size-4 text-black/80" />
          </div>
          <span className="font-semibold tracking-wider">Secure Vault</span>
        </div>
        <Link to="/dashboard">
          <button className="bg-black/80 text-white px-4 py-1 rounded-md w-24 h-7 hover:bg-black transition-colors duration-300 flex items-center justify-center text-xs font-semibold tracking-wider">
            Dashboard
          </button>
        </Link>
      </nav>
      <main className="w-160 items-center bg-white/5 shadow-md flex flex-col gap-y-4 p-4 rounded-lg">
        <h1 className="text-3xl font-bold">Upload File</h1>
        <div className="flex gap-4 w-full justify-center">
          <button
            className={`px-4 h-9 w-1/2 rounded-lg cursor-pointer ${type === "FILE" ? "bg-green-800 text-white" : "bg-gray-200"}`}
            onClick={() => setType("FILE")}
          >
            File
          </button>
          <button
            className={`px-4 h-9 w-1/2 rounded-lg cursor-pointer ${type === "TEXT" ? "bg-green-800 text-white" : "bg-gray-200/70"}`}
            onClick={() => setType("TEXT")}
          >
            Text
          </button>
        </div>
        {type === "FILE" ? (
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border h-9 rounded-md px-4 flex items-center justify-center cursor-pointer"
          />
        ) : (
          <textarea
            className="border p-2 w-full"
            placeholder="Enter text content here..."
            value={textContent}
            rows={4}
            onChange={(e) => setTextContent(e.target.value)}
          />
        )}
        <div className="flex flex-col gap-2 w-full">
          <label>
            Expires in (minutes):
            <input
              type="number"
              className="border p-1 ml-2 w-full rounded-md my-1"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)} // convert minutes to seconds
            />
          </label>
          <label>
            Password (optional):
            <input
              type="text"
              className="border p-1 ml-2 w-full rounded-md my-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Max Views (optional):
            <input
              type="number"
              className="border p-1 ml-2 w-full rounded-md my-1"
              value={maxViews !== null ? maxViews : ""}
              onChange={(e) =>
                setMaxViews(e.target.value ? Number(e.target.value) : null)
              }
            />
          </label>
          <label className="text-xs font-semibold">
            <input
              type="checkbox"
              className="ml-2 size-3 mr-2"
              checked={maxViews === 1}
              onChange={(e) => setMaxViews(e.target.checked ? 1 : null)}
            />
            One Time View
          </label>
        </div>
        <button
          className="px-4  bg-black/80 hover:bg-black h-9 w-48 cursor-pointer rounded-full text-white "
          onClick={handleUpload}
        >
          Upload
        </button>
      </main>
      <footer className="w-160 flex flex-col items-center">
        <div>
          {url && (
            <div
              className="bg-white/5 border border-green-400 text-black px-4 py-2 rounded mt-4 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(url);
                alert("Link copied to clipboard!");
              }}
            >
              <p className="font-semibold">
                Your secure link:(click on the box to copy)
              </p>
              <a href={url} className="text-black underline break-all">
                {url}
              </a>
            </div>
          )}
        </div>
        <p className="text-sm text-black mt-4">
          &copy; {new Date().getFullYear()} Secure Vault. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Upload;
