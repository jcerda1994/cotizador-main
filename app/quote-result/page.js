"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/QuoteResult.module.css"; // Ajusta la ruta según sea necesario

const QuoteResult = () => {
  const router = useRouter();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const queryId = new URLSearchParams(window.location.search).get("id");

      if (!queryId) {
        setError("No quote ID provided.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/get-quote?id=${queryId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const result = await response.json();
        if (result.success) {
          setQuote(result.data);
        } else {
          setError(result.message || "Error fetching quote.");
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const queryId = new URLSearchParams(window.location.search).get("id");
    if (queryId) {
      fetchQuote();
    }
  }, [window.location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!quote) return <div className={styles.error}>No quote found.</div>;

  // Si serviceConcepts ya es un objeto, no necesitas JSON.parse
  const serviceConcepts = Array.isArray(quote.serviceConcepts)
    ? quote.serviceConcepts
    : [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalls de la Cotización</h1>
      <div className={styles.quoteDetails}>
        <p>
          <strong>Tipo de Servicio:</strong> {quote.serviceType}
        </p>
        <p>
          <strong>Número de Horas:</strong> {quote.hours}
        </p>
        <p>
          <strong>Origen:</strong> {quote.origin}
        </p>
        <p>
          <strong>Destino:</strong> {quote.destination}
        </p>
        <p>
          <strong>Cliente:</strong> {quote.client}
        </p>
        <p>
          <strong>Ejecutivo:</strong> {quote.executive}
        </p>
        <p>
          <strong>Dirección de Recolección:</strong> {quote.pickupAddress}
        </p>
        <p>
          <strong>Dirección de Entrega:</strong> {quote.deliveryAddress}
        </p>
        <p>
          <strong>Mercancía:</strong> {quote.goods}
        </p>
        <p>
          <strong>Detalles de Carga:</strong> {quote.loadDetails}
        </p>
        <p>
          <strong>Peso:</strong> {quote.weight} kgs
        </p>
        <p>
          <strong>CBM:</strong> {quote.cbm}
        </p>
        <p>
          <strong>Tipo de Contenedor:</strong> {quote.containerType}
        </p>
      </div>
      <h2 className={styles.subtitle}>Conceptos del Servicio:</h2>
      <ul className={styles.conceptsList}>
        {serviceConcepts.map((concept, index) => (
          <li key={index} className={styles.conceptItem}>
            <strong>Concepto:</strong> {concept.concept},{" "}
            <strong>Costo:</strong> {concept.cost}
          </li>
        ))}
      </ul>
      <p>
        <strong>Costo Total:</strong> {quote.totalCost}
      </p>
      <button className={styles.returnButton} onClick={() => router.push("/")}>
        Volver a Cotizar
      </button>
    </div>
  );
};

export default QuoteResult;
