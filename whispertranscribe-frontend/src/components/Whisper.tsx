import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

interface Transcript {
  filename: string;
  transcript: string;
}

interface Results {
  results: Transcript[];
}

const Whisper: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Transcript[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files && event.target.files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    // setResults([]);

    if (!file) {
      setError("Please select a file to upload.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      const lastDotIndex = file.name.lastIndexOf(".");
      const fileName = lastDotIndex > 0 ? file.name.substring(0, lastDotIndex) : file.name;
      formData.append(fileName, file);
      const response = await axios.post<Results>(API_BASE_URL + '/whisper', formData);
      setResults([
        ...results,
        ...response.data.results
      ]);
    } catch (error) {
      setError("An error occurred while uploading the file.");
    }

    setLoading(false);
  };

  const handleDownload = (transcript: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ marginTop: 40 }}>Whisper Transcription</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: 40 }}>
        <input type="file" onChange={handleFileChange}  disabled={loading} />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Transcribe"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      {results.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2>Transcripts</h2>
          {results.map((result) => (
            <div key={result.filename} style={{ marginTop: 20 }}>
              <h3>{result.filename}</h3>
              <button onClick={() => handleDownload(result.transcript, result.filename)}>Download</button>
              <p
              style={{
                height: '100px',
overflow: 'auto',
width: '500px',
border: '1px solid #ddd',
padding: '20px',
boxSizing: 'border-box',
              }}
              >{result.transcript}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Whisper;
