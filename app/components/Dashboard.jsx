import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import styles from "../styles/Dashboard.module.css"; // Asegúrate de crear un archivo CSS correspondiente

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Crea una instancia de useRouter

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/get-all-quotes");
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const result = await response.json();
        if (result.success) {
          setQuotes(result.data);
        } else {
          setError(result.message || "Error fetching quotes.");
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard de Cotizaciones</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo de Servicio</th>
            <th>Cliente</th>
            <th>Origen</th>
            <th>Destino</th>
            <th>Costo Total</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((quote) => (
            <tr key={quote._id}>
              <td>{quote._id}</td>
              <td>{quote.serviceType}</td>
              <td>{quote.client}</td>
              <td>{quote.origin}</td>
              <td>{quote.destination}</td>
              <td>{quote.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => router.push("/quote")}
        className={styles.newQuoteButton} // Clase CSS para el botón
      >
        Hacer una nueva cotización
      </button>
    </div>
  );
};

export default Dashboard;
