import { useState, useCallback } from 'react';

interface ValidationRule {
  field: string;
  message: string;
  validate: (value: any) => boolean;
}

export const useValidation = (rules: ValidationRule[]) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = useCallback((values: { [key: string]: any }) => {
    const newErrors: { [key: string]: string } = {};

    rules.forEach((rule) => {
      if (!rule.validate(values[rule.field])) {
        newErrors[rule.field] = rule.message;
      }
    });

    setErrors(newErrors);
    return newErrors;
  }, [rules]);

  return { errors, validate };
};
