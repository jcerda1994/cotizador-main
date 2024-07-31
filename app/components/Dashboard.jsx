// components/Dashboard.jsx
import { useEffect, useState } from "react";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/get-all-quotes");
        const data = await response.json();
        if (data.success) {
          setQuotes(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error fetching quotes.");
      }
    };

    fetchQuotes();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quotes.length) {
    return <div>No quotes available.</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Servicio</th>
            <th>Tiempo estimado</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Cliente</th>
            <th>Proveedor</th>
            <th>Dirección de Recolección</th>
            <th>Dirección de Entrega</th>
            <th>Detalles de Carga</th>
            <th>Peso pluma</th>
            <th>CBM</th>
            <th>Tipo de Contenedor</th>
            <th>Costo Total</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote._id}>
              <td>{quote._id}</td>
              <td>{quote.serviceType}</td>
              <td>{quote.hours}</td>
              <td>{quote.origin}</td>
              <td>{quote.destination}</td>
              <td>{quote.client}</td>
              <td>{quote.executive}</td>
              <td>{quote.pickupAddress}</td>
              <td>{quote.deliveryAddress}</td>
              <td>{quote.loadDetails}</td>
              <td>{quote.weight}</td>
              <td>{quote.cbm}</td>
              <td>{quote.containerType}</td>
              <td>${quote.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
