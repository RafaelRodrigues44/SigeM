// components/Form.tsx
import React, { useState } from 'react';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface FormProps {
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  fields: FormField[];
  submitLabel: string;
}

const Form: React.FC<FormProps> = ({ initialValues, onSubmit, fields, submitLabel }) => {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">{submitLabel}</button>
    </form>
  );
};

export default Form;
