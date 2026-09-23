import { renderHook, act } from '@testing-library/react';
import useMediaQuery from '../useMediaQuery';

describe('useMediaQuery', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  it('returns false when query does not match', () => {
    window.matchMedia.mockReturnValue({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() });
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('returns true when query matches', () => {
    window.matchMedia.mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() });
    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    let handler;
    const addEventListener = vi.fn((_, h) => { handler = h; });
    const removeEventListener = vi.fn();

    window.matchMedia.mockReturnValue({
      matches: false,
      addEventListener,
      removeEventListener,
    });

    const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));

    expect(result.current).toBe(false);

    act(() => {
      handler({ matches: true });
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListener = vi.fn();
    window.matchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener,
    });

    const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    unmount();

    expect(removeEventListener).toHaveBeenCalled();
  });
});
