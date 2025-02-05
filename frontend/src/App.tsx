import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState<string | null>(null);

  // Example fetch to get the customer list from the server/db
  useEffect(() => {
    fetch("http://localhost:8000/customer/")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => setError(error.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {error ? (
            <span style={{ color: 'red' }}>
              Erreur de connexion : Assurez-vous que le serveur backend est démarré
            </span>
          ) : (
            "Edit src/App.tsx and save to reload."
          )}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {customers.map(({ pk, name, email, created }) => (
          <p key={pk}>
            Customer name: {name}, email: {email}, created at: {created}
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
