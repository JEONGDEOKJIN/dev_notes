import { useState, useMemo } from 'react';
import { Card, InputField, ResultItem, Badge } from '../components';
import { analyzeABTest, chiSquareTest } from '../core';

export function AnalyzePage() {
  const [visitorsA, setVisitorsA] = useState(10000);
  const [conversionsA, setConversionsA] = useState(200);
  const [visitorsB, setVisitorsB] = useState(10000);
  const [conversionsB, setConversionsB] = useState(250);

  const result = useMemo(() => {
    if (visitorsA <= 0 || visitorsB <= 0) return null;
    if (conversionsA < 0 || conversionsB < 0) return null;
    if (conversionsA > visitorsA || conversionsB > visitorsB) return null;

    return analyzeABTest({
      visitorsA,
      conversionsA,
      visitorsB,
      conversionsB
    });
  }, [visitorsA, conversionsA, visitorsB, conversionsB]);

  const chiResult = useMemo(() => {
    if (!result) return null;
    return chiSquareTest({
      visitorsA,
      conversionsA,
      visitorsB,
      conversionsB
    });
  }, [visitorsA, conversionsA, visitorsB, conversionsB, result]);

  return (
    <div className="space-y-6">
      {/* 데이터 입력 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="A안 (Control)" icon="🅰️">
          <InputField
            label="방문자 수"
            value={visitorsA}
            onChange={setVisitorsA}
            min={1}
            suffix="명"
          />
          <InputField
            label="전환 수"
            value={conversionsA}
            onChange={setConversionsA}
            min={0}
            suffix="명"
          />
          {result && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">전환율</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.groupA.ratePercent}
              </p>
            </div>
          )}
        </Card>

        <Card title="B안 (Variant)" icon="🅱️">
          <InputField
            label="방문자 수"
            value={visitorsB}
            onChange={setVisitorsB}
            min={1}
            suffix="명"
          />
          <InputField
            label="전환 수"
            value={conversionsB}
            onChange={setConversionsB}
            min={0}
            suffix="명"
          />
          {result && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">전환율</p>
              <p className="text-2xl font-bold text-gray-800">
                {result.groupB.ratePercent}
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* 분석 결과 */}
      {result && (
        <>
          {/* 결론 */}
          <Card title="결론" icon="✅">
            <div className={`p-4 rounded-lg ${
              result.statistics.isSignificant
                ? result.effect.absoluteDifference > 0
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
                : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant={
                  result.statistics.isSignificant
                    ? result.effect.absoluteDifference > 0 ? 'success' : 'danger'
                    : 'warning'
                }>
                  {result.statistics.isSignificant ? '통계적으로 유의미' : '유의미하지 않음'}
                </Badge>
              </div>
              <p className="text-gray-700">{result.conclusion}</p>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* 효과 크기 */}
            <Card title="효과 크기" icon="📈">
              <ResultItem
                label="절대적 차이"
                value={result.effect.absoluteDifferencePercent}
                highlight={result.effect.absoluteDifference > 0}
              />
              <ResultItem
                label="상대적 개선율"
                value={result.effect.relativeImprovement}
                success={result.statistics.isSignificant && result.effect.absoluteDifference > 0}
                danger={result.statistics.isSignificant && result.effect.absoluteDifference < 0}
              />
              <ResultItem
                label="95% 신뢰구간 (하한)"
                value={result.effect.confidenceInterval.lower}
              />
              <ResultItem
                label="95% 신뢰구간 (상한)"
                value={result.effect.confidenceInterval.upper}
              />
            </Card>

            {/* 통계 검증 */}
            <Card title="통계 검증 (Z-검정)" icon="🔬">
              <ResultItem label="Z-score" value={result.statistics.zScore} />
              <ResultItem
                label="p-value"
                value={result.statistics.pValue}
                highlight
              />
              <ResultItem label="유의수준" value={result.statistics.significanceLevel} />

              {chiResult && (
                <>
                  <div className="border-t my-3"></div>
                  <p className="text-xs text-gray-500 mb-2">카이제곱 검정</p>
                  <ResultItem label="χ² 통계량" value={chiResult.chiSquare} />
                  <ResultItem label="p-value" value={chiResult.pValue} />
                </>
              )}
            </Card>
          </div>

          {/* 전환율 비교 차트 */}
          <Card title="전환율 비교" icon="📊">
            <div className="flex items-end gap-8 justify-center py-8">
              <div className="text-center">
                <div
                  className="w-24 bg-blue-500 rounded-t-lg mx-auto transition-all"
                  style={{ height: `${result.groupA.rate * 1000}px`, minHeight: '20px' }}
                />
                <div className="mt-2">
                  <p className="font-bold text-lg">{result.groupA.ratePercent}</p>
                  <p className="text-sm text-gray-500">A안 (Control)</p>
                </div>
              </div>
              <div className="text-center">
                <div
                  className="w-24 bg-green-500 rounded-t-lg mx-auto transition-all"
                  style={{ height: `${result.groupB.rate * 1000}px`, minHeight: '20px' }}
                />
                <div className="mt-2">
                  <p className="font-bold text-lg">{result.groupB.ratePercent}</p>
                  <p className="text-sm text-gray-500">B안 (Variant)</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
