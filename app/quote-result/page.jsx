// components/QuoteResult.jsx
"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/QuoteResult.module.css";

const QuoteResultPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(`/api/get-quote?id=${id}`);
        const data = await response.json();
        if (data.success) {
          setQuote(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Error fetching quote.");
      }
    };

    if (id) {
      fetchQuote();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.quoteResult}>
      <h1>Resultado de la Cotización</h1>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>Tipo de Servicio:</td>
            <td>{quote.serviceType}</td>
          </tr>
          <tr>
            <td>Número de Horas:</td>
            <td>{quote.hours}</td>
          </tr>
          <tr>
            <td>Origen:</td>
            <td>{quote.origin}</td>
          </tr>
          <tr>
            <td>Destino:</td>
            <td>{quote.destination}</td>
          </tr>
          <tr>
            <td>Cliente:</td>
            <td>{quote.client}</td>
          </tr>
          <tr>
            <td>Proveedor:</td>
            <td>{quote.executive}</td>
          </tr>
          <tr>
            <td>Dirección de Recolección:</td>
            <td>{quote.pickupAddress}</td>
          </tr>
          <tr>
            <td>Dirección de Entrega:</td>
            <td>{quote.deliveryAddress}</td>
          </tr>
          <tr>
            <td>Detalles de Carga:</td>
            <td>{quote.loadDetails}</td>
          </tr>
          <tr>
            <td>Peso:</td>
            <td>{quote.weight}</td>
          </tr>
          <tr>
            <td>CBM:</td>
            <td>{quote.cbm}</td>
          </tr>
          <tr>
            <td>Tipo de Contenedor:</td>
            <td>{quote.containerType}</td>
          </tr>
          <tr>
            <td>Costo Total:</td>
            <td>${quote.totalCost}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => (window.location.href = "/quote")}>
        Volver a Cotizar
      </button>
    </div>
  );
};

export default QuoteResultPage;
