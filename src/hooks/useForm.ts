import { useState } from 'react';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
}

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [name]: value },
    }));
  };

  const setErrors = (errors: Partial<Record<keyof T, string>>) => {
    setFormState((prevState) => ({
      ...prevState,
      errors,
    }));
  };

  return { ...formState, handleChange, setErrors };
};
