import React, { useState, useRef } from 'react';
import './App.css';

// --- Main App Component ---
export default function App() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const resetForNewUpload = () => {
    setExtractedData(null);
    setError('');
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      resetForNewUpload();
      setFile(selectedFile);
      setFileName(selectedFile.name);
      // Removed e.target.value='' to prevent double popup
    } else {
      setError('Please select a valid PDF file.');
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      resetForNewUpload();
      setFile(droppedFile);
      setFileName(droppedFile.name);
    } else {
      setError('Please drop a valid PDF file.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleParse = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setIsLoading(true);
    setExtractedData(null);
    setError('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/parse', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Server error.');

      setExtractedData(data);
    } catch (err) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- UI ---
  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h1>Credit Card Statement Parser</h1>
          <p>Upload a PDF statement to extract key details automatically.</p>
        </div>

        <div className="upload-section">
          <div
            className="drop-zone"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {/* Label handles the click to open file input */}
            <label htmlFor="file-input" className="w-full h-full flex items-center justify-center cursor-pointer">
              <input
                id="file-input"
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <p>{fileName ? `📄 Selected: ${fileName}` : '📁 Drag & drop a PDF or click to upload'}</p>
            </label>
          </div>

          <button
            onClick={handleParse}
            disabled={!file || isLoading}
            className="parse-btn"
          >
            {isLoading ? 'Parsing...' : 'Parse Statement'}
          </button>
        </div>

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {extractedData && <ResultsDisplay data={extractedData} />}
      </div>
    </div>
  );
}

// --- Sub-components ---
const LoadingSpinner = () => (
  <div className="spinner">
    <div className="loader"></div>
    <p>Extracting data, please wait...</p>
  </div>
);

const ErrorMessage = ({ message }) => (
  <div className="error-box">
    <strong>Error: </strong>{message}
  </div>
);

const ResultsDisplay = ({ data }) => {
  const displayLabels = {
    issuer: 'Card Issuer',
    card_number: 'Card Number (Last 4)',
    due_date: 'Payment Due Date',
    total_due: 'Total Amount Due',
    statement_period: 'Statement Period',
  };

  return (
    <div className="results-container">
      <h2>Extracted Details</h2>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <strong>{displayLabels[key] || key}: </strong>
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};