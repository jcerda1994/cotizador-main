// components/Dashboard.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5; // Número de citas por página
  const router = useRouter(); // Inicializa useRouter

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
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!quotes.length) {
    return <div>No quotes available.</div>;
  }

  // Lógica de paginación
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(quotes.length / quotesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Maneja la redirección
  const handleNewQuoteClick = () => {
    router.push("/new-quote"); // Redirige a la página de Nueva Cotización
  };

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre del Cliente</th>
            <th>Status</th>
            <th>ID</th>
            <th>Costo Total</th>
            <th>Margen</th>
            <th>Tipo de Servicio</th>
          </tr>
        </thead>
        <tbody>
          {currentQuotes.map((quote) => (
            <tr key={quote._id}>
              <td>{quote.client}</td>
              <td>{quote.status}</td>
              <td>{quote._id}</td>
              <td>${quote.totalCost}</td>
              <td>{quote.margin}%</td>
              <td>{quote.serviceType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles.pageButton} ${
              currentPage === i + 1 ? styles.activePage : ""
            }`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button className={styles.newQuoteButton} onClick={handleNewQuoteClick}>
        Nueva Cotización
      </button>
    </div>
  );
};

export default Dashboard;
