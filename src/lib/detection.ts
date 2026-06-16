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
const EXACT_TOGGLE_WORDS = [
  'show',
  'hide',
  'mostrar',
  'ocultar',
  'toggle',
  'ver',
];
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
        'a',
        'i',
        'span',
        'div',
        'svg',
        'img',
      ].join(', '),
    );

    for (const candidate of Array.from(candidates)) {
      if (candidate === input) {
        continue;
      }

      // Safeguard: do not treat parent/ancestor elements of the input as toggle candidates
      if (candidate.contains(input)) {
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
  const hasToggleHint = TOGGLE_KEYWORDS.some((keyword) => haystack.includes(keyword)) || hasEyeSvgPath(candidate);
  const hasPasswordHint = PASSWORD_KEYWORDS.some((keyword) => haystack.includes(keyword));

  if (!hasToggleHint) {
    return false;
  }

  if (isCheckboxLike(candidate)) {
    return hasPasswordHint;
  }

  const trimmedText = text.trim();
  const isExactToggle = EXACT_TOGGLE_WORDS.includes(trimmedText);
  const hasIcon = hasIconHint(haystack) || hasEyeSvgPath(candidate);

  return !needsPasswordContext || hasPasswordHint || hasIcon || isExactToggle;
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

function hasEyeSvgPath(candidate: Element): boolean {
  const paths = candidate.querySelectorAll('path');
  for (const path of Array.from(paths)) {
    const d = path.getAttribute('d') ?? '';
    const normalizedD = d.replace(/[\s,]+/g, '').toLowerCase();

    // Check for common eye icon path signatures:
    // 1. Heroicons v1 eye outline: "m2.458 12c3.732..."
    if (normalizedD.includes('m2.45812c3.732')) return true;
    // 2. Heroicons v1 pupil: "m15 12a3 3 0 11-6 0..."
    if (normalizedD.includes('m1512a33011-60')) return true;

    // 3. Heroicons v2 eye outline: "m1.5 12c0-3.58..."
    if (normalizedD.includes('m1.512c0-3.58')) return true;
    // 4. Heroicons v2 eye outline variant: "m2.25 12c0-3.58..." or "m12 2.25c-5.25..."
    if (normalizedD.includes('m2.2512c0-3.58') || normalizedD.includes('m122.25c-5.25')) return true;

    // 5. Lucide / Feather Eye outline: "m1 12s4-8 11-8..."
    if (normalizedD.includes('m112s4-811-8') || normalizedD.includes('m112c004-811-8')) return true;
    // 6. Lucide / Feather Eye pupil: "m12 15a3 3 0 100-6..."
    if (
      normalizedD.includes('m1215a330100-6') ||
      normalizedD.includes('m1215a3301006') ||
      normalizedD.includes('m129a3301006')
    ) return true;

    // 7. Material Design Icons (MDI) Eye: "m12,9a3,3 0..." or "m12,4.5c..."
    if (
      normalizedD.includes('m129a33000') ||
      normalizedD.includes('m124.5c') ||
      normalizedD.includes('m124.5s')
    ) return true;

    // 8. FontAwesome Eye: "m572.52 241.4..."
    if (normalizedD.includes('m572.52241.4')) return true;
  }
  return false;
}

function getCandidateText(candidate: Element): string {
  const parts = [candidate.textContent];

  if (candidate instanceof HTMLInputElement) {
    const labels = Array.from(candidate.labels ?? []);
    parts.push(candidate.value, ...labels.map((label) => label.textContent));

    if (candidate.id) {
      document
        .querySelectorAll<HTMLLabelElement>(`label[for="${CSS.escape(candidate.id)}"]`)
        .forEach((label) => {
          parts.push(label.textContent);
        });
    }
  }

  return parts.join(' ');
}
