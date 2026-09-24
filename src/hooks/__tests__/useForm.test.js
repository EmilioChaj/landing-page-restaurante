import { renderHook, act } from '@testing-library/react';
import useForm from '../useForm';

const initialValues = { name: '', email: '' };
const validate = (data) => {
  const errors = {};
  if (!data.name.trim()) errors.name = 'Nombre requerido';
  if (!data.email.includes('@')) errors.email = 'Email inválido';
  return errors;
};

describe('useForm', () => {
  it('returns initial values', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    expect(result.current.formData).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitSuccess).toBe(false);
    expect(result.current.submitError).toBe('');
  });

  it('handleChange updates field and clears error', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Mario' },
      });
    });

    expect(result.current.formData.name).toBe('Mario');
  });

  it('handleChange sets boolean checked for checkbox inputs', () => {
    const { result } = renderHook(() => useForm({ gdpr: false }, null));

    act(() => {
      result.current.handleChange({
        target: { name: 'gdpr', type: 'checkbox', checked: true, value: 'on' },
      });
    });

    expect(result.current.formData.gdpr).toBe(true);

    act(() => {
      result.current.handleChange({
        target: { name: 'gdpr', type: 'checkbox', checked: false, value: 'on' },
      });
    });

    expect(result.current.formData.gdpr).toBe(false);
  });

  it('handleChange clears error for the field', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleSubmit(async () => {})({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.name).toBe('Nombre requerido');

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Mario' },
      });
    });

    expect(result.current.errors.name).toBe('');
  });

  it('handleSubmit sets errors when validation fails', async () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    await act(async () => {
      await result.current.handleSubmit(async () => {})({
        preventDefault: () => {},
      });
    });

    expect(result.current.errors.name).toBe('Nombre requerido');
    expect(result.current.errors.email).toBe('Email inválido');
  });

  it('handleSubmit calls onSubmit when validation passes', async () => {
    const onSubmit = vi.fn();
    const validValues = { name: 'Mario', email: 'mario@test.com' };
    const { result } = renderHook(() => useForm(validValues, validate));

    await act(async () => {
      await result.current.handleSubmit(onSubmit)({
        preventDefault: () => {},
      });
    });

    expect(onSubmit).toHaveBeenCalledWith(validValues);
  });

  it('handleSubmit sets isSubmitting during submission', async () => {
    let resolveSubmit;
    const onSubmit = vi.fn(
      () => new Promise((resolve) => { resolveSubmit = resolve; })
    );
    const validValues = { name: 'Mario', email: 'mario@test.com' };
    const { result } = renderHook(() => useForm(validValues, validate));

    act(() => {
      result.current.handleSubmit(onSubmit)({
        preventDefault: () => {},
      });
    });

    expect(result.current.isSubmitting).toBe(true);

    await act(async () => {
      resolveSubmit();
      await Promise.resolve();
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it('handleSubmit sets submitSuccess after completion', async () => {
    const onSubmit = vi.fn();
    const validValues = { name: 'Mario', email: 'mario@test.com' };
    const { result } = renderHook(() => useForm(validValues, validate));

    await act(async () => {
      await result.current.handleSubmit(onSubmit)({
        preventDefault: () => {},
      });
    });

    expect(result.current.submitSuccess).toBe(true);
  });

  it('handleSubmit sets submitError when onSubmit throws', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('Error del servidor'));
    const validValues = { name: 'Mario', email: 'mario@test.com' };
    const { result } = renderHook(() => useForm(validValues, validate));

    await act(async () => {
      await result.current.handleSubmit(onSubmit)({
        preventDefault: () => {},
      });
    });

    expect(result.current.submitError).toBe('Error del servidor');
    expect(result.current.submitSuccess).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('handleSubmit resets isSubmitting after error', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('fallo'));
    const validValues = { name: 'Mario', email: 'mario@test.com' };
    const { result } = renderHook(() => useForm(validValues, validate));

    await act(async () => {
      await result.current.handleSubmit(onSubmit)({
        preventDefault: () => {},
      });
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it('resetForm restores initial values and clears errors', () => {
    const { result } = renderHook(() => useForm(initialValues, validate));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Mario' },
      });
    });

    act(() => {
      result.current.resetForm();
    });

    expect(result.current.formData).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });
});
