import { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (onSubmit) => {
    return async (e) => {
      e.preventDefault();
      if (validate) {
        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return;
        }
      }

      setSubmitError('');
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
        setFormData(initialValues);
      } catch (err) {
        setSubmitError(err.message || 'Error al enviar el formulario');
      } finally {
        setIsSubmitting(false);
      }
    };
  };

  const resetForm = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
    setErrors,
  };
};

export default useForm;
