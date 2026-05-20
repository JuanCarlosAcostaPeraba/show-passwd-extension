export interface DetectionOptions {
  root?: ParentNode;
}

const TOGGLE_KEYWORDS = ['show', 'toggle', 'eye', 'visibility'];
const FIELD_GROUP_SELECTOR = [
  'label',
  '[data-testid*="password" i]',
  '[class*="password" i]',
  '[class*="input" i]',
  '[class*="field" i]',
  '[class*="control" i]',
  '[class*="form-group" i]',
].join(', ');

/**
 * Returns true when the password input already exposes a built-in toggle
 * control, so the extension should not inject a duplicate eye icon.
 */
export function hasNativePasswordToggle(
  input: HTMLInputElement,
  { root = document }: DetectionOptions = {},
): boolean {
  if (input.type !== 'password') {
    return false;
  }

  const group = input.closest(FIELD_GROUP_SELECTOR) ?? input.parentElement ?? root;

  const candidates = group.querySelectorAll(
    'button, [role="button"], input[type="button"], input[type="submit"]',
  );

  for (const candidate of Array.from(candidates)) {
    if (candidate === input) {
      continue;
    }

    const text = (candidate.textContent ?? '').toLowerCase();
    const ariaLabel = (candidate.getAttribute('aria-label') ?? '').toLowerCase();
    const title = (candidate.getAttribute('title') ?? '').toLowerCase();
    const classes = (candidate.getAttribute('class') ?? '').toLowerCase();

    const haystack = `${text} ${ariaLabel} ${title} ${classes}`;

    if (TOGGLE_KEYWORDS.some((keyword) => haystack.includes(keyword))) {
      return true;
    }

    if (candidate instanceof HTMLElement) {
      const iconName = candidate.dataset.icon ?? '';
      if (TOGGLE_KEYWORDS.some((keyword) => iconName.toLowerCase().includes(keyword))) {
        return true;
      }
    }
  }

  const toggleAttr = input.getAttribute('data-toggle') ?? '';
  if (toggleAttr.toLowerCase().includes('password')) {
    return true;
  }

  return false;
}
