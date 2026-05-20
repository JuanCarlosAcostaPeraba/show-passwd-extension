import { hasNativePasswordToggle } from '@/lib/detection';
import { createEyeToggle, EXT_VALUE, markExtensionNode, updateEyeIcon } from '@/lib/dom';

const managedInputs = new Map<HTMLInputElement, () => void>();
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach((node) => {
      if (!(node instanceof Element)) {
        return;
      }

      if (node.matches('input[type="password"]')) {
        observeInput(node as HTMLInputElement);
      }

      node.querySelectorAll('input[type="password"]').forEach((input) => {
        observeInput(input as HTMLInputElement);
      });
    });

    mutation.removedNodes.forEach((node) => {
      if (!(node instanceof Element)) {
        return;
      }

      if (node.matches('input[type="password"]')) {
        cleanupInput(node as HTMLInputElement);
      }

      node.querySelectorAll('input[type="password"]').forEach((input) => {
        cleanupInput(input as HTMLInputElement);
      });
    });
  }

  reconcileManagedInputs();
});

function observeInput(input: HTMLInputElement): void {
  if (managedInputs.has(input)) {
    return;
  }

  if (input.dataset.ext === EXT_VALUE) {
    return;
  }

  if (hasNativePasswordToggle(input)) {
    return;
  }

  injectToggle(input);
}

function cleanupInput(input: HTMLInputElement): void {
  const cleanup = managedInputs.get(input);
  if (!cleanup) {
    return;
  }

  cleanup();
  managedInputs.delete(input);
}

function reconcileManagedInputs(): void {
  for (const input of Array.from(managedInputs.keys())) {
    if (!input.isConnected) {
      cleanupInput(input);
      continue;
    }

    if (hasNativePasswordToggle(input)) {
      cleanupInput(input);
    }
  }
}

function injectToggle(input: HTMLInputElement): void {
  const { wrapper, button, icon } = createEyeToggle();
  const currentType = () => input.getAttribute('type') ?? 'password';
  let animationFrame = 0;
  const resizeObserver = new ResizeObserver(() => {
    schedulePositionSync();
  });

  const setVisibility = (visible: boolean) => {
    input.setAttribute('type', visible ? 'text' : 'password');
    button.setAttribute('aria-label', visible ? 'Hide password' : 'Show password');
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

  const syncPosition = () => {
    animationFrame = 0;

    if (!input.isConnected) {
      cleanupInput(input);
      return;
    }

    const rect = input.getBoundingClientRect();
    const hasVisibleBox = rect.width > 0 && rect.height > 0;

    wrapper.style.display = hasVisibleBox ? 'block' : 'none';
    wrapper.style.left = `${String(rect.left)}px`;
    wrapper.style.top = `${String(rect.top)}px`;
    wrapper.style.width = `${String(rect.width)}px`;
    wrapper.style.height = `${String(rect.height)}px`;
  };

  const schedulePositionSync = () => {
    if (animationFrame) {
      return;
    }

    animationFrame = window.requestAnimationFrame(syncPosition);
  };

  const cleanup = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }

    window.removeEventListener('resize', schedulePositionSync);
    window.removeEventListener('scroll', schedulePositionSync, true);
    input.removeEventListener('focus', schedulePositionSync);
    input.removeEventListener('input', schedulePositionSync);
    input.removeEventListener('mouseenter', schedulePositionSync);
    resizeObserver.disconnect();
    wrapper.remove();

    if (input.dataset.ext === EXT_VALUE) {
      delete input.dataset.ext;
    }
  };

  document.body.appendChild(wrapper);
  markExtensionNode(wrapper);
  markExtensionNode(button);
  managedInputs.set(input, cleanup);
  input.dataset.ext = EXT_VALUE;

  window.addEventListener('resize', schedulePositionSync);
  window.addEventListener('scroll', schedulePositionSync, true);
  input.addEventListener('focus', schedulePositionSync);
  input.addEventListener('input', schedulePositionSync);
  input.addEventListener('mouseenter', schedulePositionSync);
  resizeObserver.observe(input);
  syncPosition();
}

function bootstrap(): void {
  document.querySelectorAll<HTMLInputElement>('input[type="password"]').forEach((input) => {
    observeInput(input);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener(
    'pagehide',
    () => {
      observer.disconnect();
    },
    { once: true },
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
