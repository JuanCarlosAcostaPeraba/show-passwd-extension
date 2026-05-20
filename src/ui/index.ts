const ISSUE_REPORT_URL =
  'https://github.com/juancarlosacostaperaba/show-passwd-extension/issues/new?template=bug_report.yml';

const reportIssueButton = document.querySelector<HTMLButtonElement>('#report-issue');

reportIssueButton?.addEventListener('click', () => {
  void chrome.tabs.create({ url: ISSUE_REPORT_URL });
});
