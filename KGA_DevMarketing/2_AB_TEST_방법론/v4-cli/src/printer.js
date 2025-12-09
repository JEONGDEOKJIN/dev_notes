/**
 * 콘솔 출력 함수
 */

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  bgBlue: '\x1b[44m',
  bgGreen: '\x1b[42m',
  bgRed: '\x1b[41m',
  bgYellow: '\x1b[43m'
};

export function printHeader(title) {
  console.log('\n' + COLORS.cyan + '═'.repeat(60) + COLORS.reset);
  console.log(COLORS.bright + COLORS.white + ' ' + title + COLORS.reset);
  console.log(COLORS.cyan + '═'.repeat(60) + COLORS.reset);
}

export function printSection(title) {
  console.log('\n' + COLORS.yellow + '▶ ' + title + COLORS.reset);
  console.log(COLORS.dim + '─'.repeat(40) + COLORS.reset);
}

export function printItem(label, value, options = {}) {
  const { highlight, success, danger } = options;
  let valueColor = COLORS.white;
  if (highlight) valueColor = COLORS.blue + COLORS.bright;
  if (success) valueColor = COLORS.green + COLORS.bright;
  if (danger) valueColor = COLORS.red + COLORS.bright;

  const labelPadded = label.padEnd(20);
  console.log(`  ${COLORS.dim}${labelPadded}${COLORS.reset} ${valueColor}${value}${COLORS.reset}`);
}

export function printBox(content, type = 'info') {
  const bgColor = {
    info: COLORS.bgBlue,
    success: COLORS.bgGreen,
    danger: COLORS.bgRed,
    warning: COLORS.bgYellow
  }[type];

  console.log('\n' + bgColor + COLORS.white + COLORS.bright);
  console.log('  ' + content + '  ');
  console.log(COLORS.reset);
}

export function printTable(headers, rows) {
  const colWidths = headers.map((h, i) =>
    Math.max(h.length, ...rows.map(r => String(r[i]).length)) + 2
  );

  // 헤더
  console.log(COLORS.dim + '┌' + colWidths.map(w => '─'.repeat(w)).join('┬') + '┐' + COLORS.reset);
  console.log(COLORS.dim + '│' + COLORS.reset +
    headers.map((h, i) => COLORS.bright + h.padEnd(colWidths[i]) + COLORS.reset).join(COLORS.dim + '│' + COLORS.reset) +
    COLORS.dim + '│' + COLORS.reset);
  console.log(COLORS.dim + '├' + colWidths.map(w => '─'.repeat(w)).join('┼') + '┤' + COLORS.reset);

  // 행
  rows.forEach(row => {
    console.log(COLORS.dim + '│' + COLORS.reset +
      row.map((cell, i) => String(cell).padEnd(colWidths[i])).join(COLORS.dim + '│' + COLORS.reset) +
      COLORS.dim + '│' + COLORS.reset);
  });

  console.log(COLORS.dim + '└' + colWidths.map(w => '─'.repeat(w)).join('┴') + '┘' + COLORS.reset);
}

export function printFooter() {
  console.log('\n' + COLORS.cyan + '═'.repeat(60) + COLORS.reset + '\n');
}
