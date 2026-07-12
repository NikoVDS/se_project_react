import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validation rules
  const validateField = useCallback((name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) {
          return "Name is required";
        }
        if (value.trim().length < 2) {
          return "Name must be at least 2 characters";
        }
        return "";

      case "link":
        if (!value.trim()) {
          return "Image URL is required";
        }
        try {
          new URL(value);
          return "";
        } catch {
          return "Please enter a valid URL";
        }

      case "weather":
        if (!value) {
          return "Weather type is required";
        }
        return "";

      default:
        return "";
    }
  }, []);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    // Validate and update errors for the changed field
    const newErrors = { ...errors };
    const error = validateField(name, value);

    if (error) {
      newErrors[name] = error;
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);

    // Check if form is valid (no errors and all required fields filled)
    const formIsValid =
      Object.keys(newErrors).length === 0 &&
      newValues.name &&
      newValues.link &&
      newValues.weather;
    setIsValid(formIsValid);
  };

  const validateForm = useCallback(() => {
    let newErrors = {};

    // Validate all fields
    Object.keys(defaultValues).forEach((key) => {
      const error = validateField(key, values[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    const formIsValid = Object.keys(newErrors).length === 0;
    setIsValid(formIsValid);

    return formIsValid;
  }, [values, defaultValues, validateField]);

  const resetForm = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }, [defaultValues]);

  return {
    values,
    setValues,
    handleChange,
    errors,
    isValid,
    validateForm,
    resetForm,
  };
}
