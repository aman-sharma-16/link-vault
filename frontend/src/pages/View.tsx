import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();

  const [password, setPassword] = useState("");
  const [vaultData, setVaultData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [requiresPassword, setRequiresPassword] = useState(false);
  const [error, setError] = useState("");

  const fetchVault = async (providedPassword = "") => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`http://localhost:3000/vault/data/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: providedPassword }),
      });

      // Fix: Check for both 401 (Unauthorized) and 403 (Forbidden)
      if (res.status === 401 || res.status === 403) {
        // Optional: Try to read error message from server (e.g., "Incorrect Password")
        let errorMsg = "Password required";
        try {
          const errData = await res.json();
          if (errData.message) errorMsg = errData.message;
        } catch (e) {
          // Ignore JSON parse errors on auth failure
        }

        setRequiresPassword(true); // Ensure input is visible
        setVaultData(null);
        setError(errorMsg); // Set the specific error so the user knows why it failed
        setLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to retrieve vault.");
        setVaultData(null);
        // Important: If we are already in password mode, don't hide the input on generic errors
        // (This keeps the UI stable if there's a network blip or other 400 error)
        if (!requiresPassword) {
          setRequiresPassword(false);
        }
        setLoading(false);
        return;
      }

      const contentType = res.headers.get("Content-Type") || "";

      if (contentType.includes("application/json")) {
        const data = await res.json();
        setVaultData(data.data);
        setRequiresPassword(false);
      } else {
        const fileNameHeader = res.headers.get("Content-Disposition");
        let fileName = "file";
        if (fileNameHeader) {
          const match = fileNameHeader.match(/filename="?(.+)"?/);
          if (match?.[1]) fileName = match[1];
        }
        setVaultData({ type: "FILE", fileName });
        setRequiresPassword(false);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      setVaultData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset state when ID changes
    setRequiresPassword(false);
    setVaultData(null);
    fetchVault();
  }, [id]);

  const handleSubmitPassword = () => fetchVault(password);

  const handleDownloadFile = async () => {
    try {
      const res = await fetch(`http://localhost:3000/vault/data/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) throw new Error("Failed to download file");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = vaultData.fileName || "file";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError("Download failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">View Vault</h1>

      {/* Show password input if required */}
      {requiresPassword && (
        <>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              // Don't clear error immediately on type, or user misses the message
            }}
            className="border border-gray-300 rounded-md px-4 py-2 w-64"
          />
          <button
            onClick={handleSubmitPassword}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Unlock
          </button>

          {/* Error displayed INSIDE the password block */}
          {error && <p className="text-black">{error}</p>}
        </>
      )}

      {/* Show generic error only if NOT in password mode (to avoid duplicates) */}
      {!requiresPassword && error && (
        <h1 className="text-2xl font-bold text-black">{error}</h1>
      )}

      {/* TEXT VAULT */}
      {vaultData?.type === "TEXT" && (
        <>
          <div>Click on the text to copy it to clipboard</div>
          <div
            className="bg-gray-100 p-6 rounded-md w-full max-w-xl whitespace-pre-wrap"
            onClick={() => {
              navigator.clipboard.writeText(vaultData.textContent);
              alert("Text copied");
            }}
          >
            {vaultData.textContent}
          </div>
        </>
      )}

      {/* FILE VAULT */}
      {vaultData?.type === "FILE" && (
        <button
          onClick={handleDownloadFile}
          className="bg-black cursor-pointer text-white px-4 py-2 rounded-md"
        >
          Download File
        </button>
      )}
    </div>
  );
};

export default View;
