// QuoteForm.js
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/QuoteForm.module.css"; // Adjust the path if necessary

const QuoteForm = () => {
  const router = useRouter();
  const [quoteData, setQuoteData] = useState({
    serviceType: "",
    hours: "",
    origin: "",
    destination: "",
    client: "",
    executive: "",
    pickupAddress: "",
    deliveryAddress: "",
    goods: "",
    loadDetails: "",
    weight: "",
    cbm: "",
    containerType: "",
    serviceConcepts: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddConcept = () => {
    setQuoteData((prevData) => ({
      ...prevData,
      serviceConcepts: [...prevData.serviceConcepts, { concept: "", cost: "" }],
    }));
  };

  const handleRemoveConcept = (index) => {
    setQuoteData((prevData) => ({
      ...prevData,
      serviceConcepts: prevData.serviceConcepts.filter((_, i) => i !== index),
    }));
  };

  const handleConceptChange = (index, e) => {
    const { name, value } = e.target;
    const updatedConcepts = quoteData.serviceConcepts.map((concept, i) =>
      i === index ? { ...concept, [name]: value } : concept
    );
    setQuoteData((prevData) => ({
      ...prevData,
      serviceConcepts: updatedConcepts,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/save-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Capture the error response
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        router.push(`/quote-result?id=${result.id}`);
      } else {
        console.error("Error:", result.message);
      }
    } catch (error) {
      console.error("Error while getting quote:", error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>Cotizador</h1>
      <form className={styles.quoteForm} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="serviceType">Tipo de Servicio</label>
          <select
            id="serviceType"
            name="serviceType"
            value={quoteData.serviceType}
            onChange={handleInputChange}
          >
            <option value="">Seleccione un tipo de servicio</option>
            <option value="terrestre">Terrestre</option>
            <option value="maritimo">Marítimo</option>
            <option value="aereo">Aéreo</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="hours">Número de Horas</label>
          <input
            type="number"
            id="hours"
            name="hours"
            value={quoteData.hours}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="origin">Origen</label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={quoteData.origin}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="destination">Destino</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={quoteData.destination}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="client">Cliente</label>
          <input
            type="text"
            id="client"
            name="client"
            value={quoteData.client}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="executive">Proveedor</label>
          <input
            type="text"
            id="executive"
            name="executive"
            value={quoteData.executive}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="pickupAddress">Dirección de Recolección</label>
          <input
            type="text"
            id="pickupAddress"
            name="pickupAddress"
            value={quoteData.pickupAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="deliveryAddress">Dirección de Entrega</label>
          <input
            type="text"
            id="deliveryAddress"
            name="deliveryAddress"
            value={quoteData.deliveryAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="goods">Detalles de Carga</label>
          <input
            type="text"
            id="goods"
            name="goods"
            value={quoteData.goods}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="loadDetails">Detalles de Carga</label>
          <input
            type="text"
            id="loadDetails"
            name="loadDetails"
            value={quoteData.loadDetails}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="weight">Peso</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={quoteData.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="cbm">CBM</label>
          <input
            type="number"
            id="cbm"
            name="cbm"
            value={quoteData.cbm}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="containerType">Tipo de Contenedor</label>
          <select
            id="containerType"
            name="containerType"
            value={quoteData.containerType}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar</option>
            <option value="caja">Caja</option>
            <option value="contenedor">Contenedor</option>
          </select>
        </div>

        <div className={styles.formConceptContainer}>
          <h3>Conceptos del Servicio:</h3>
          {quoteData.serviceConcepts.map((concept, index) => (
            <div key={index} className={styles.formConcept}>
              <input
                type="text"
                name="concept"
                value={concept.concept}
                placeholder="Concepto"
                onChange={(e) => handleConceptChange(index, e)}
              />
              <input
                type="number"
                name="cost"
                value={concept.cost}
                placeholder="Costo"
                onChange={(e) => handleConceptChange(index, e)}
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => handleRemoveConcept(index)}
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles.addButton}
            onClick={handleAddConcept}
          >
            Añadir Concepto
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>
          Obtener Cotización
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;
