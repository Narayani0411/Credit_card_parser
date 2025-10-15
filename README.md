## 📁 Project Structure

```

CREDIT_CARD/
├── backend/              # Flask backend for image upload & processing
│   └── app.py
├── frontend/             # React frontend interface
│   ├── public/
│   ├── src/
│   └── package.json
├── myenv/                # Python virtual environment (ignored in git)
├── temp_uploads/         # Temporary storage for uploaded files
├── .gitignore
├── README.md

````

---

## 🚀 Features

- Upload credit card images through a web interface.
- Parse and extract key details (e.g., card number, expiry date).
- Real-time UI built with React.
- Image processing and OCR handled in Python backend.

---

## 🛠️ Tech Stack

- **Frontend**: React, JavaScript, HTML/CSS
- **Backend**: Python, Flask
- **OCR/Parsing**: (e.g., Tesseract or any library you used)
- **Other**: Node.js, Virtualenv

---

## 🖥️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Narayani0411/Credit_card_parser.git
cd Credit_card_parser
````

---

### 2. Setup Backend (Flask + Python)

> Make sure you have Python 3 installed

```bash
cd backend
python -m venv ../myenv
../myenv/Scripts/activate     # On Windows
python app.py
```

---

### 3. Setup Frontend (React)

```bash
cd ../frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`
Backend (API) runs at: `http://localhost:5000`

---

## 🧪 Example Use

1. Navigate to the frontend.
2. Upload a pdf of a credit card statement (demo or masked).
3. The backend will process the pdf and return the parsed results.
4. Results are displayed dynamically on the UI.

---





