import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/QuoteForm.module.css"; // Ajusta la ruta si es necesario

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
    status: "", // Nuevo campo Status
    margin: "", // Nuevo campo Margen
    serviceConcepts: [],
  });

  const calculateTotalCost = (data) => {
    let totalCost = 0;

    // Costos por tipo de contenedor
    if (data.containerType === "caja") totalCost += 500;
    if (data.containerType === "contenedor") totalCost += 5000;

    // Costos por peso
    if (data.weight > 1000) totalCost += 1000;
    else totalCost += 500;

    // Costos por tipo de servicio
    if (data.serviceType === "aereo") totalCost += 2000;
    if (data.serviceType === "terrestre") totalCost += 1000;
    if (data.serviceType === "maritimo") totalCost += 500;

    // Agrega cualquier costo adicional de los conceptos de servicio
    data.serviceConcepts.forEach((concept) => {
      totalCost += parseFloat(concept.cost || 0);
    });

    // Aplicar margen
    const marginMultiplier = 1 + parseFloat(data.margin) / 100;
    totalCost *= marginMultiplier;

    return totalCost;
  };

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
    const totalCost = calculateTotalCost(quoteData);
    try {
      const response = await fetch("/api/save-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...quoteData, totalCost }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Captura el mensaje de error
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
        {/* Campos existentes */}
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
          <label htmlFor="goods">Detalles de Bienes</label>
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
        {/* Nuevos campos */}
        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={quoteData.status}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar</option>
            <option value="confirmado">Confirmado</option>
            <option value="creado">Creado</option>
            <option value="borrador">Borrador</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="margin">Margen (%)</label>
          <input
            type="number"
            id="margin"
            name="margin"
            value={quoteData.margin}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.formConceptContainer}>
          <h3>Conceptos del Servicio:</h3>
          {quoteData.serviceConcepts.map((concept, index) => (
            <div className={styles.formConcept} key={index}>
              <input
                type="text"
                name="concept"
                placeholder="Concepto"
                value={concept.concept}
                onChange={(e) => handleConceptChange(index, e)}
              />
              <input
                type="number"
                name="cost"
                placeholder="Costo"
                value={concept.cost}
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
            Agregar Concepto
          </button>
        </div>
        <button type="submit" className={styles.submitButton}>
          Calcular Costo Total
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;
