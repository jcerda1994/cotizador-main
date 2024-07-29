"use client";
import { useRouter } from "next/navigation";
import QuoteForm from "../components/QuoteForm";

const QuotePage = () => {
  const router = useRouter();

  const handleGetQuote = async (quoteData) => {
    try {
      const response = await fetch("/api/save-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quoteData),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.id) {
          await router.push(`/quote-result?id=${result.id}`);
        } else {
          console.error("Error saving quote:", result.error);
        }
      } else {
        const errorText = await response.text();
        console.error("Error response from API:", errorText);
      }
    } catch (error) {
      console.error("Error while getting quote:", error);
    }
  };

  return <QuoteForm onGetQuote={handleGetQuote} />;
};

export default QuotePage;
