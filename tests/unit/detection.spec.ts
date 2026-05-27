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

  it('detects a labelled checkbox password toggle in the same group', () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-field';
    const input = document.createElement('input');
    input.type = 'password';
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.append(checkbox, 'Mostrar contraseña');

    wrapper.append(input, label);
    document.body.append(wrapper);

    expect(hasNativePasswordToggle(input)).toBe(true);
  });

  it('detects a checkbox password toggle through a for label', () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-field';
    const input = document.createElement('input');
    input.type = 'password';
    const checkbox = document.createElement('input');
    checkbox.id = 'show-password';
    checkbox.type = 'checkbox';
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = 'Show password';

    wrapper.append(input, checkbox, label);
    document.body.append(wrapper);

    expect(hasNativePasswordToggle(input)).toBe(true);
  });

  it('detects a labelled checkbox password toggle in the same form', () => {
    const form = document.createElement('form');
    const field = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'password';
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    label.append(checkbox, 'Mostrar contrasena');

    field.append(input);
    form.append(field, label);
    document.body.append(form);

    expect(hasNativePasswordToggle(input)).toBe(true);
  });

  it('ignores generic show controls elsewhere in the same form', () => {
    const form = document.createElement('form');
    const field = document.createElement('div');
    const input = document.createElement('input');
    input.type = 'password';
    const button = document.createElement('button');
    button.textContent = 'Show advanced options';

    field.append(input);
    form.append(field, button);
    document.body.append(form);

    expect(hasNativePasswordToggle(input)).toBe(false);
  });

  it('detects a sibling icon password toggle (e.g. <i> with eye class)', () => {
    const wrapper = document.createElement('p');
    wrapper.id = 'pwdField';
    wrapper.className = 'field';
    const input = document.createElement('input');
    input.type = 'password';
    input.id = 'password';
    const icon = document.createElement('i');
    icon.className = 'mdi mdi-eye';
    icon.id = 'togglePassword';

    wrapper.append(input, icon);
    document.body.append(wrapper);

    expect(hasNativePasswordToggle(input)).toBe(true);
  });

  it('safeguards against parent elements matching keyword patterns', () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'password-toggle-group';
    const input = document.createElement('input');
    input.type = 'password';

    wrapper.append(input);
    document.body.append(wrapper);

    expect(hasNativePasswordToggle(input)).toBe(false);
  });
});
