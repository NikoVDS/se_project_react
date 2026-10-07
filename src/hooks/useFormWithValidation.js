import { useState, useCallback } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

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

      case "avatar":
        if (!value.trim()) {
          return "Avatar URL is required";
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

    const newValues = {
      ...values,
      [name]: value,
    };

    setValues(newValues);

    const error = validateField(name, value);

    const newErrors = {
      ...errors,
    };

    if (error) {
      newErrors[name] = error;
    } else {
      delete newErrors[name];
    }

    setErrors(newErrors);

    const formIsValid =
      Object.keys(newErrors).length === 0 &&
      Object.values(newValues).every((fieldValue) => fieldValue.trim() !== "");

    setIsValid(formIsValid);
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    Object.entries(values).forEach(([key, value]) => {
      const error = validateField(key, value);

      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    const formIsValid =
      Object.keys(newErrors).length === 0 &&
      Object.values(values).every((fieldValue) => fieldValue.trim() !== "");

    setIsValid(formIsValid);

    return formIsValid;
  }, [values, validateField]);

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
