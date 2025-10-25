
export interface Medicine {
  name: string;
  dosage: string | null;
  quantity: string | null;
  frequency: string | null;
}

export interface CartItem extends Medicine {
  id: string;
  cartQuantity: number;
}

export interface SymptomCondition {
  name: string;
  likelihood: string;
  explanation: string;
}

export interface SymptomAnalysisResult {
  conditions: SymptomCondition[];
  advice: string;
  disclaimer: string;
}
