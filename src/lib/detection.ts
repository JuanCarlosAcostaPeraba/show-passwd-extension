export interface DetectionOptions {
  root?: ParentNode;
}

const TOGGLE_KEYWORDS = [
  'show',
  'mostrar',
  'toggle',
  'eye',
  'visibility',
];
const PASSWORD_KEYWORDS = ['password', 'contraseña', 'contrasena'];
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
  const scopes = getSearchScopes(group, input.closest('form'));

  for (const { scope, needsPasswordContext } of scopes) {
    const candidates = scope.querySelectorAll(
      [
        'button',
        '[role="button"]',
        'input[type="button"]',
        'input[type="submit"]',
        'input[type="checkbox"]',
        '[role="checkbox"]',
      ].join(', '),
    );

    for (const candidate of Array.from(candidates)) {
      if (candidate === input) {
        continue;
      }

      if (isPasswordToggleCandidate(candidate, needsPasswordContext)) {
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

function getSearchScopes(
  group: ParentNode,
  form: HTMLFormElement | null,
): Array<{ scope: ParentNode; needsPasswordContext: boolean }> {
  const scopes = [{ scope: group, needsPasswordContext: false }];

  if (form && form !== group) {
    scopes.push({ scope: form, needsPasswordContext: true });
  }

  return scopes;
}

function isPasswordToggleCandidate(candidate: Element, needsPasswordContext: boolean): boolean {
  const text = getCandidateText(candidate).toLowerCase();
  const ariaLabel = (candidate.getAttribute('aria-label') ?? '').toLowerCase();
  const title = (candidate.getAttribute('title') ?? '').toLowerCase();
  const classes = (candidate.getAttribute('class') ?? '').toLowerCase();
  const iconName = candidate instanceof HTMLElement ? (candidate.dataset.icon ?? '').toLowerCase() : '';
  const haystack = `${text} ${ariaLabel} ${title} ${classes} ${iconName}`;
  const hasToggleHint = TOGGLE_KEYWORDS.some((keyword) => haystack.includes(keyword));
  const hasPasswordHint = PASSWORD_KEYWORDS.some((keyword) => haystack.includes(keyword));

  if (!hasToggleHint) {
    return false;
  }

  if (isCheckboxLike(candidate)) {
    return hasPasswordHint;
  }

  return !needsPasswordContext || hasPasswordHint || hasIconHint(haystack);
}

function isCheckboxLike(candidate: Element): boolean {
  if (candidate.getAttribute('role') === 'checkbox') {
    return true;
  }

  return candidate instanceof HTMLInputElement && candidate.type === 'checkbox';
}

function hasIconHint(haystack: string): boolean {
  return ['eye', 'visibility'].some((keyword) => haystack.includes(keyword));
}

function getCandidateText(candidate: Element): string {
  const parts = [candidate.textContent ?? ''];

  if (candidate instanceof HTMLInputElement) {
    const labels = Array.from(candidate.labels ?? []);
    parts.push(candidate.value, ...labels.map((label) => label.textContent ?? ''));

    if (candidate.id) {
      document
        .querySelectorAll<HTMLLabelElement>(`label[for="${CSS.escape(candidate.id)}"]`)
        .forEach((label) => {
          parts.push(label.textContent ?? '');
        });
    }
  }

  return parts.join(' ');
}
