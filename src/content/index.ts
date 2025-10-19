import { hasNativePasswordToggle } from '@/lib/detection';
import { createEyeToggle, markExtensionNode, updateEyeIcon } from '@/lib/dom';

const managedInputs = new WeakSet<HTMLInputElement>();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }

      if (node.matches?.('input[type="password"]')) {
        observeInput(node as HTMLInputElement);
      }

      node.querySelectorAll?.('input[type="password"]').forEach((input) => {
        observeInput(input as HTMLInputElement);
      });
    });

    mutation.removedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }

      if (node.matches?.('input[type="password"]')) {
        managedInputs.delete(node as HTMLInputElement);
      }

      node.querySelectorAll?.('input[type="password"]').forEach((input) => {
        managedInputs.delete(input as HTMLInputElement);
      });
    });
  }
});

function observeInput(input: HTMLInputElement): void {
  if (managedInputs.has(input)) {
    return;
  }

  if (input.dataset.ext === 'show-passwd') {
    return;
  }

  if (hasNativePasswordToggle(input)) {
    return;
  }

  injectToggle(input);
}

function injectToggle(input: HTMLInputElement): void {
  const { wrapper, button, icon } = createEyeToggle();
  const currentType = () => input.getAttribute('type') ?? 'password';

  const setVisibility = (visible: boolean) => {
    input.setAttribute('type', visible ? 'text' : 'password');
    button.setAttribute('aria-pressed', String(visible));
    button.setAttribute('data-visible', visible ? 'true' : 'false');
    updateEyeIcon(icon, visible);
  };

  const toggleVisibility = () => {
    const isVisible = currentType() === 'text';
    setVisibility(!isVisible);
  };

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleVisibility();
  });

  button.addEventListener('mousedown', (event) => {
    event.preventDefault();
  });

  input.addEventListener('blur', () => {
    if (currentType() === 'text') {
      setVisibility(false);
    }
  });

  // Copiar estilos del input original
  const inputStyles = window.getComputedStyle(input);
  const inputWidth = input.offsetWidth;
  const inputHeight = input.offsetHeight;

  // Configurar el wrapper para que tenga el mismo tamaño
  wrapper.style.width = `${inputWidth}px`;
  wrapper.style.height = `${inputHeight}px`;
  wrapper.style.display = 'inline-block';

  // Insertar el wrapper antes del input
  input.insertAdjacentElement('beforebegin', wrapper);
  wrapper.appendChild(input);
  wrapper.appendChild(button);

  markExtensionNode(wrapper);
  markExtensionNode(button);
  managedInputs.add(input);
  input.dataset.ext = 'show-passwd';
}

function bootstrap(): void {
  document.querySelectorAll<HTMLInputElement>('input[type="password"]').forEach((input) => {
    observeInput(input);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
