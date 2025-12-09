/**
 * 내보내기 뷰 (JSON, Markdown)
 * MVC Pattern - View
 */

import type { ABTestConfig, ABTestResult, BusinessImpact } from '../models';
import { toLocaleNumber } from '../utils';

/**
 * 내보내기 뷰 클래스
 */
export class ExportView {
  /**
   * JSON 형식으로 내보내기
   * @param config - 테스트 설정
   * @param result - 분석 결과
   * @param impact - 비즈니스 영향 (옵션)
   * @returns JSON 문자열
   */
  toJSON(config: ABTestConfig, result: ABTestResult, impact?: BusinessImpact): string {
    const exportData = {
      config: {
        testName: config.testName,
        hypothesis: config.hypothesis,
        startDate: config.startDate,
        endDate: config.endDate
      },
      result,
      ...(impact && { businessImpact: impact })
    };

    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Markdown 형식으로 내보내기
   * @param config - 테스트 설정
   * @param result - 분석 결과
   * @param impact - 비즈니스 영향 (옵션)
   * @returns Markdown 문자열
   */
  toMarkdown(config: ABTestConfig, result: ABTestResult, impact?: BusinessImpact): string {
    let markdown = `# AB TEST 결과: ${config.testName}

## 테스트 정보
- **가설**: ${config.hypothesis}
- **기간**: ${config.startDate} ~ ${config.endDate}

## 데이터

| 그룹 | 방문자 | 전환 | 전환율 |
|------|--------|------|--------|
| A안 (Control) | ${toLocaleNumber(config.visitorsA)} | ${toLocaleNumber(config.conversionsA)} | ${result.groupA.ratePercent} |
| B안 (Variant) | ${toLocaleNumber(config.visitorsB)} | ${toLocaleNumber(config.conversionsB)} | ${result.groupB.ratePercent} |

## 통계 검증

| 지표 | 값 |
|------|-----|
| Z-score | ${result.statistics.zScore} |
| p-value | ${result.statistics.pValue} |
| 유의수준 | ${result.statistics.significanceLevel} |
| 95% 신뢰구간 | [${result.effect.confidenceInterval.lower}, ${result.effect.confidenceInterval.upper}] |

## 효과

- **절대적 차이**: ${result.effect.absoluteDifferencePercent}
- **상대적 개선**: ${result.effect.relativeImprovement}

## 결론

${result.conclusion}
`;

    if (impact) {
      markdown += `
## 비즈니스 영향 (예상)

- **월간 추가 전환**: ${toLocaleNumber(impact.additionalConversions)}건
- **월간 추가 매출**: ${toLocaleNumber(impact.additionalRevenue)}원
`;
    }

    return markdown;
  }

  /**
   * CSV 형식으로 내보내기
   * @param config - 테스트 설정
   * @param result - 분석 결과
   * @returns CSV 문자열
   */
  toCSV(config: ABTestConfig, result: ABTestResult): string {
    const headers = [
      'Test Name',
      'Hypothesis',
      'Start Date',
      'End Date',
      'Visitors A',
      'Conversions A',
      'Rate A',
      'Visitors B',
      'Conversions B',
      'Rate B',
      'Z-Score',
      'P-Value',
      'Is Significant',
      'Absolute Difference',
      'Relative Improvement'
    ];

    const values = [
      config.testName,
      config.hypothesis,
      config.startDate,
      config.endDate,
      config.visitorsA.toString(),
      config.conversionsA.toString(),
      result.groupA.ratePercent,
      config.visitorsB.toString(),
      config.conversionsB.toString(),
      result.groupB.ratePercent,
      result.statistics.zScore,
      result.statistics.pValue,
      result.statistics.isSignificant ? 'Yes' : 'No',
      result.effect.absoluteDifferencePercent,
      result.effect.relativeImprovement
    ];

    return headers.join(',') + '\n' + values.map(v => `"${v}"`).join(',');
  }

  /**
   * HTML 형식으로 내보내기
   * @param config - 테스트 설정
   * @param result - 분석 결과
   * @returns HTML 문자열
   */
  toHTML(config: ABTestConfig, result: ABTestResult): string {
    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>AB TEST 결과: ${config.testName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #333; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
    th { background-color: #f5f5f5; }
    .significant { color: #22c55e; font-weight: bold; }
    .not-significant { color: #ef4444; }
    .conclusion { background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <h1>📊 AB TEST 결과: ${config.testName}</h1>

  <h2>테스트 정보</h2>
  <ul>
    <li><strong>가설:</strong> ${config.hypothesis}</li>
    <li><strong>기간:</strong> ${config.startDate} ~ ${config.endDate}</li>
  </ul>

  <h2>데이터</h2>
  <table>
    <tr><th>그룹</th><th>방문자</th><th>전환</th><th>전환율</th></tr>
    <tr><td>A안 (Control)</td><td>${toLocaleNumber(config.visitorsA)}</td><td>${toLocaleNumber(config.conversionsA)}</td><td>${result.groupA.ratePercent}</td></tr>
    <tr><td>B안 (Variant)</td><td>${toLocaleNumber(config.visitorsB)}</td><td>${toLocaleNumber(config.conversionsB)}</td><td>${result.groupB.ratePercent}</td></tr>
  </table>

  <h2>통계 검증</h2>
  <table>
    <tr><th>지표</th><th>값</th></tr>
    <tr><td>Z-score</td><td>${result.statistics.zScore}</td></tr>
    <tr><td>p-value</td><td>${result.statistics.pValue}</td></tr>
    <tr><td>유의미 여부</td><td class="${result.statistics.isSignificant ? 'significant' : 'not-significant'}">${result.statistics.isSignificant ? '유의미' : '유의미하지 않음'}</td></tr>
  </table>

  <h2>결론</h2>
  <div class="conclusion">${result.conclusion}</div>
</body>
</html>`;
  }
}

// 싱글톤 인스턴스 내보내기
export const exportView = new ExportView();
