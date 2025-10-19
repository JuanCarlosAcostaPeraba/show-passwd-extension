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

export function updateEyeIcon(icon: SVGElement, isVisible: boolean): void {
  const path = icon.querySelector('path');
  if (!path) return;

  if (isVisible) {
    // Icono de ojo tachado (ocultar)
    path.setAttribute(
      'd',
      'm644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z',
    );
  } else {
    // Icono de ojo normal (mostrar)
    path.setAttribute(
      'd',
      'M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z',
    );
  }
}

export function createEyeToggle(): EyeToggleElements {
  const wrapper = document.createElement('span');
  wrapper.className = 'show-passwd-toggle';
  markExtensionNode(wrapper);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'show-passwd-toggle__button';
  button.setAttribute('aria-label', 'Show password');

  const icon = createEyeIcon(false); // Inicialmente oculto (mostrar icono)
  button.append(icon);
  wrapper.append(button);

  return { wrapper, button, icon };
}

function createEyeIcon(isVisible: boolean = false): SVGElement {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 -960 960 960');
  svg.setAttribute('width', '24');
  svg.setAttribute('height', '24');
  svg.setAttribute('focusable', 'false');
  svg.classList.add('show-passwd-toggle__icon');

  const path = document.createElementNS(svgNS, 'path');

  if (isVisible) {
    // Icono de ojo tachado (ocultar)
    path.setAttribute(
      'd',
      'm644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z',
    );
  } else {
    // Icono de ojo normal (mostrar)
    path.setAttribute(
      'd',
      'M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z',
    );
  }

  path.setAttribute('fill', '#e3e3e3');
  svg.append(path);
  return svg;
}
