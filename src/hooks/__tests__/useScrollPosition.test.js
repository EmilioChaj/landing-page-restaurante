import { renderHook, act } from '@testing-library/react';
import useScrollPosition from '../useScrollPosition';

describe('useScrollPosition', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('returns initial scroll position', () => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
    const { result } = renderHook(() => useScrollPosition());
    expect(result.current).toBe(0);
  });

  it('updates on scroll event', () => {
    const { result } = renderHook(() => useScrollPosition());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(100);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useScrollPosition());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
