import { useState, useMemo } from 'react';
import { Card, InputField, ResultItem, Badge } from '../components';
import { analyzeABTest, calculateBusinessImpact } from '../core';
import type { ABTestConfig } from '../core';

export function ReportPage() {
  const [config, setConfig] = useState<ABTestConfig>({
    testName: 'CTA 버튼 색상 테스트',
    hypothesis: 'CTA 버튼을 빨간색에서 초록색으로 변경하면 전환율이 증가할 것이다',
    startDate: '2024-12-01',
    endDate: '2024-12-07',
    visitorsA: 15000,
    conversionsA: 300,
    visitorsB: 15000,
    conversionsB: 375,
    monthlyConversions: 10000,
    avgOrderValue: 50000
  });

  const result = useMemo(() => {
    return analyzeABTest(config);
  }, [config]);

  const businessImpact = useMemo(() => {
    if (!config.monthlyConversions || !config.avgOrderValue) return null;
    return calculateBusinessImpact(
      result.effect.absoluteDifference,
      config.monthlyConversions,
      config.avgOrderValue
    );
  }, [result, config.monthlyConversions, config.avgOrderValue]);

  const updateConfig = <K extends keyof ABTestConfig>(key: K, value: ABTestConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const exportToMarkdown = () => {
    const md = `# AB TEST 결과: ${config.testName}

## 테스트 정보
- **가설**: ${config.hypothesis}
- **기간**: ${config.startDate} ~ ${config.endDate}

## 데이터

| 그룹 | 방문자 | 전환 | 전환율 |
|------|--------|------|--------|
| A안 (Control) | ${config.visitorsA.toLocaleString()} | ${config.conversionsA.toLocaleString()} | ${result.groupA.ratePercent} |
| B안 (Variant) | ${config.visitorsB.toLocaleString()} | ${config.conversionsB.toLocaleString()} | ${result.groupB.ratePercent} |

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
${businessImpact ? `
## 비즈니스 영향 (예상)

- **월간 추가 전환**: ${businessImpact.additionalConversions.toLocaleString()}건
- **월간 추가 매출**: ${businessImpact.additionalRevenue.toLocaleString()}원
` : ''}`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.testName.replace(/\s+/g, '_')}_report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 테스트 정보 입력 */}
      <Card title="테스트 정보" icon="📋">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              테스트명
            </label>
            <input
              type="text"
              value={config.testName}
              onChange={(e) => updateConfig('testName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              가설
            </label>
            <input
              type="text"
              value={config.hypothesis}
              onChange={(e) => updateConfig('hypothesis', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              시작일
            </label>
            <input
              type="date"
              value={config.startDate}
              onChange={(e) => updateConfig('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              종료일
            </label>
            <input
              type="date"
              value={config.endDate}
              onChange={(e) => updateConfig('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* 데이터 입력 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="A안 (Control)" icon="🅰️">
          <InputField
            label="방문자 수"
            value={config.visitorsA}
            onChange={(v) => updateConfig('visitorsA', v)}
            suffix="명"
          />
          <InputField
            label="전환 수"
            value={config.conversionsA}
            onChange={(v) => updateConfig('conversionsA', v)}
            suffix="명"
          />
        </Card>

        <Card title="B안 (Variant)" icon="🅱️">
          <InputField
            label="방문자 수"
            value={config.visitorsB}
            onChange={(v) => updateConfig('visitorsB', v)}
            suffix="명"
          />
          <InputField
            label="전환 수"
            value={config.conversionsB}
            onChange={(v) => updateConfig('conversionsB', v)}
            suffix="명"
          />
        </Card>
      </div>

      {/* 비즈니스 영향 입력 */}
      <Card title="비즈니스 영향 계산 (선택)" icon="💰">
        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="월간 전환 수"
            value={config.monthlyConversions || 0}
            onChange={(v) => updateConfig('monthlyConversions', v)}
            suffix="건"
          />
          <InputField
            label="평균 주문 가치"
            value={config.avgOrderValue || 0}
            onChange={(v) => updateConfig('avgOrderValue', v)}
            suffix="원"
          />
        </div>
      </Card>

      {/* 리포트 미리보기 */}
      <Card title="리포트 미리보기" icon="📄">
        <div className="bg-gray-50 rounded-lg p-6 space-y-6">
          {/* 헤더 */}
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">{config.testName}</h2>
            <p className="text-gray-600 mt-1">{config.hypothesis}</p>
            <p className="text-sm text-gray-500 mt-2">
              {config.startDate} ~ {config.endDate}
            </p>
          </div>

          {/* 데이터 테이블 */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">📈 데이터</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white">
                  <th className="px-4 py-2 text-left">그룹</th>
                  <th className="px-4 py-2 text-right">방문자</th>
                  <th className="px-4 py-2 text-right">전환</th>
                  <th className="px-4 py-2 text-right">전환율</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">A안 (Control)</td>
                  <td className="px-4 py-2 text-right">{config.visitorsA.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{config.conversionsA.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right font-medium">{result.groupA.ratePercent}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">B안 (Variant)</td>
                  <td className="px-4 py-2 text-right">{config.visitorsB.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right">{config.conversionsB.toLocaleString()}</td>
                  <td className="px-4 py-2 text-right font-medium">{result.groupB.ratePercent}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 통계 검증 */}
          <div>
            <h3 className="font-semibold text-gray-700 mb-3">🔬 통계 검증</h3>
            <div className="grid grid-cols-2 gap-4">
              <ResultItem label="Z-score" value={result.statistics.zScore} />
              <ResultItem label="p-value" value={result.statistics.pValue} highlight />
              <ResultItem label="유의수준" value={result.statistics.significanceLevel} />
              <ResultItem
                label="상대적 개선"
                value={result.effect.relativeImprovement}
                success={result.statistics.isSignificant && result.effect.absoluteDifference > 0}
              />
            </div>
          </div>

          {/* 결론 */}
          <div className={`p-4 rounded-lg ${
            result.statistics.isSignificant
              ? result.effect.absoluteDifference > 0
                ? 'bg-green-100'
                : 'bg-red-100'
              : 'bg-yellow-100'
          }`}>
            <h3 className="font-semibold mb-2">✅ 결론</h3>
            <p>{result.conclusion}</p>
          </div>

          {/* 비즈니스 영향 */}
          {businessImpact && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">💰 비즈니스 영향 (예상)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-600">월간 추가 전환</p>
                  <p className="text-xl font-bold text-blue-800">
                    {businessImpact.additionalConversions.toLocaleString()}건
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">월간 추가 매출</p>
                  <p className="text-xl font-bold text-blue-800">
                    {businessImpact.additionalRevenue.toLocaleString()}원
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 내보내기 버튼 */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={exportToMarkdown}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            📥 Markdown 다운로드
          </button>
          <button
            onClick={() => {
              const json = JSON.stringify({ config, result, businessImpact }, null, 2);
              const blob = new Blob([json], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${config.testName.replace(/\s+/g, '_')}_report.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            📥 JSON 다운로드
          </button>
        </div>
      </Card>
    </div>
  );
}
