// components/Dashboard.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5;
  const router = useRouter();

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
    return <div>Cargando.</div>;
  }

  // Pagination logic
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(quotes.length / quotesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleQuotePageRedirect = () => {
    router.push("/quote");
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo de Servicio</th>
              <th>Número de Horas</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Cliente</th>
              <th>Proveedor</th>
              <th>Dirección de Recolección</th>
              <th>Dirección de Entrega</th>
              <th>Detalles de Carga</th>
              <th>Peso</th>
              <th>CBM</th>
              <th>Tipo de Contenedor</th>
              <th>Costo Total</th>
            </tr>
          </thead>
          <tbody>
            {currentQuotes.map((quote) => (
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
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.activePageButton : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={handleQuotePageRedirect}
        className={styles.redirectButton}
      >
        Hacer una nueva cotización
      </button>
    </div>
  );
};

export default Dashboard;
