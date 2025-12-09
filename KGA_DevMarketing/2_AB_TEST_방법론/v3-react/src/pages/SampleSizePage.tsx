import { useState, useMemo } from 'react';
import { Card, InputField, ResultItem } from '../components';
import { calculateSampleSize } from '../core';

export function SampleSizePage() {
  const [baselineRate, setBaselineRate] = useState(2);
  const [mde, setMde] = useState(20);
  const [alpha, setAlpha] = useState(5);
  const [power, setPower] = useState(80);

  const result = useMemo(() => {
    return calculateSampleSize({
      baselineRate: baselineRate / 100,
      mde: mde / 100,
      alpha: alpha / 100,
      power: power / 100
    });
  }, [baselineRate, mde, alpha, power]);

  // 샘플 사이즈 참고표
  const referenceTable = useMemo(() => {
    const baselines = [1, 2, 5, 10];
    const mdes = [10, 15, 20];

    return baselines.map(baseline => ({
      baseline: `${baseline}%`,
      values: mdes.map(m =>
        calculateSampleSize({
          baselineRate: baseline / 100,
          mde: m / 100
        }).perGroup
      )
    }));
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* 입력 */}
        <Card title="입력 값" icon="📝">
          <InputField
            label="현재 전환율 (Baseline Rate)"
            value={baselineRate}
            onChange={setBaselineRate}
            step="0.1"
            min={0.1}
            max={100}
            suffix="%"
            hint="현재 전환율을 입력하세요"
          />
          <InputField
            label="최소 감지 효과 (MDE)"
            value={mde}
            onChange={setMde}
            step="1"
            min={1}
            max={100}
            suffix="%"
            hint="감지하고 싶은 최소 개선율"
          />
          <InputField
            label="유의수준 (Alpha)"
            value={alpha}
            onChange={setAlpha}
            step="1"
            min={1}
            max={20}
            suffix="%"
            hint="일반적으로 5% 사용"
          />
          <InputField
            label="검정력 (Power)"
            value={power}
            onChange={setPower}
            step="1"
            min={50}
            max={99}
            suffix="%"
            hint="일반적으로 80% 사용"
          />
        </Card>

        {/* 결과 */}
        <Card title="계산 결과" icon="📊">
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <div className="text-center">
              <p className="text-sm text-blue-600 mb-1">그룹당 필요 샘플</p>
              <p className="text-4xl font-bold text-blue-700">
                {result.perGroup.toLocaleString()}
              </p>
              <p className="text-xs text-blue-500 mt-1">명</p>
            </div>
          </div>

          <ResultItem label="총 필요 샘플" value={`${result.total.toLocaleString()}명`} highlight />
          <ResultItem label="현재 전환율" value={result.baselineRate} />
          <ResultItem label="기대 전환율" value={result.expectedRate} />
          <ResultItem label="MDE" value={result.mde} />
          <ResultItem label="유의수준 (α)" value={`${(result.alpha * 100).toFixed(0)}%`} />
          <ResultItem label="검정력 (1-β)" value={`${(result.power * 100).toFixed(0)}%`} />
        </Card>
      </div>

      {/* 참고표 */}
      <Card title="샘플 사이즈 참고표" icon="📋">
        <p className="text-sm text-gray-500 mb-4">
          α = 0.05, Power = 0.8 기준 그룹당 필요 샘플 수
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-600">Baseline</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">MDE 10%</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">MDE 15%</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">MDE 20%</th>
              </tr>
            </thead>
            <tbody>
              {referenceTable.map((row, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-3 font-medium">{row.baseline}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className="px-4 py-3 text-right text-gray-600">
                      {val.toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
