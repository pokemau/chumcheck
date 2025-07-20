'use server'

import { BACKEND_API_URL } from "@/lib/constants";
import { CalculatorQuestion, UratQuestion } from "@/lib/types";

export async function getUratQuestions(): Promise<UratQuestion[]> {
  const res = await fetch(`${BACKEND_API_URL}/readinesslevel/urat-questions`, {
    next: { revalidate: 60 * 60 }
  });
  const data = await res.json();
  return data;
}


export async function getCalculatorQuestions(): Promise<CalculatorQuestion[]> {
  const res = await fetch(`${BACKEND_API_URL}/readinesslevel/calculator-questions`, {
    next: { revalidate: 60 * 60 }
  });
  const data = await res.json();
  return data;
}

