export interface EyeToggleElements {
  wrapper: HTMLSpanElement;
  button: HTMLButtonElement;
  icon: SVGElement;
}

export const EXT_ATTR = 'data-ext';
export const EXT_VALUE = 'show-passwd';

export function markExtensionNode(node: Element): void {
  node.setAttribute(EXT_ATTR, EXT_VALUE);
}

export function isExtensionNode(node: Element | null): boolean {
  return Boolean(node && node.getAttribute(EXT_ATTR) === EXT_VALUE);
}

export function createEyeToggle(): EyeToggleElements {
  const wrapper = document.createElement('span');
  wrapper.className = 'show-passwd-toggle';
  markExtensionNode(wrapper);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'show-passwd-toggle__button';
  button.setAttribute('aria-label', 'Mostrar contraseña');

  const icon = createEyeIcon();
  button.append(icon);
  wrapper.append(button);

  return { wrapper, button, icon };
}

function createEyeIcon(): SVGElement {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('show-passwd-toggle__icon');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('d', 'M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 .001 6.001A3 3 0 0 0 12 9z');

  svg.append(path);
  return svg;
}
