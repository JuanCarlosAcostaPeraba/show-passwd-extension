import { hasNativePasswordToggle } from '../../src/lib/detection';

describe('hasNativePasswordToggle', () => {
  it('returns false when no toggle-like elements are present', () => {
    const input = document.createElement('input');
    input.type = 'password';
    document.body.append(input);

    expect(hasNativePasswordToggle(input)).toBe(false);
  });

  it('returns true when a sibling button contains a show keyword', () => {
    const wrapper = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'password';
    const button = document.createElement('button');
    button.textContent = 'Show';

    wrapper.append(input, button);
    document.body.append(wrapper);

    expect(hasNativePasswordToggle(input)).toBe(true);
  });
});
