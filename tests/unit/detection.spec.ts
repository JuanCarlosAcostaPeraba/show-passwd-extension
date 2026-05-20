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

  it('ignores toggle-like buttons outside the password field group', () => {
    const unrelated = document.createElement('button');
    unrelated.textContent = 'Show details';

    const wrapper = document.createElement('div');
    wrapper.className = 'password-field';
    const input = document.createElement('input');
    input.id = 'password';
    input.type = 'password';

    wrapper.append(input);
    document.body.append(unrelated, wrapper);

    expect(hasNativePasswordToggle(input)).toBe(false);
  });

  it('detects an aria-labelled toggle in the same password field group', () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-field';
    const input = document.createElement('input');
    input.type = 'password';
    const button = document.createElement('button');
    button.setAttribute('aria-label', 'Toggle password visibility');

    wrapper.append(input, button);
    document.body.append(wrapper);

    expect(hasNativePasswordToggle(input)).toBe(true);
  });
});
