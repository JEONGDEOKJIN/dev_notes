/**
 * 콘솔 출력 뷰
 * MVC Pattern - View
 */

import type {
  ABTestConfig,
  ABTestResult,
  SampleSizeResult,
  SampleSizeTableRow,
  BusinessImpact,
  ChiSquareResult
} from '../models';
import { createSeparator, toLocaleNumber, toCurrency } from '../utils';

/**
 * 콘솔 뷰 클래스
 */
export class ConsoleView {
  /**
   * 헤더 출력
   * @param title - 제목
   */
  printHeader(title: string): void {
    console.log('\n' + createSeparator('=', 60));
    console.log(title);
    console.log(createSeparator('=', 60));
  }

  /**
   * 섹션 제목 출력
   * @param title - 제목
   */
  printSectionTitle(title: string): void {
    console.log(`\n${title}`);
    console.log(createSeparator('-', 40));
  }

  /**
   * 푸터 출력
   */
  printFooter(): void {
    console.log('\n' + createSeparator('=', 60));
  }

  /**
   * 테스트 정보 출력
   */
  printTestInfo(config: ABTestConfig): void {
    this.printSectionTitle('📋 테스트 정보');
    console.log(`테스트명: ${config.testName}`);
    console.log(`가설: ${config.hypothesis}`);
    console.log(`테스트 기간: ${config.startDate} ~ ${config.endDate}`);
  }

  /**
   * 데이터 출력
   */
  printData(config: ABTestConfig): void {
    this.printSectionTitle('📈 데이터');
    console.log(`A안 (Control): ${toLocaleNumber(config.visitorsA)}명 방문, ${toLocaleNumber(config.conversionsA)}명 전환`);
    console.log(`B안 (Variant): ${toLocaleNumber(config.visitorsB)}명 방문, ${toLocaleNumber(config.conversionsB)}명 전환`);
  }

  /**
   * 전환율 비교 출력
   */
  printConversionComparison(result: ABTestResult): void {
    this.printSectionTitle('📊 전환율 비교');
    console.log(`A안: ${result.groupA.ratePercent}`);
    console.log(`B안: ${result.groupB.ratePercent}`);
    console.log(`차이: ${result.effect.absoluteDifferencePercent} (${result.effect.relativeImprovement})`);
  }

  /**
   * 통계 검증 결과 출력
   */
  printStatistics(result: ABTestResult): void {
    this.printSectionTitle('🔬 통계 검증');
    console.log(`Z-score: ${result.statistics.zScore}`);
    console.log(`p-value: ${result.statistics.pValue}`);
    console.log(`유의수준: ${result.statistics.significanceLevel}`);
    console.log(`95% 신뢰구간: [${result.effect.confidenceInterval.lower}, ${result.effect.confidenceInterval.upper}]`);
  }

  /**
   * 결론 출력
   */
  printConclusion(result: ABTestResult): void {
    this.printSectionTitle('✅ 결론');
    console.log(result.conclusion);
  }

  /**
   * 비즈니스 영향 출력
   */
  printBusinessImpact(impact: BusinessImpact): void {
    this.printSectionTitle('💰 비즈니스 영향 (예상)');
    console.log(`월간 추가 전환: ${toLocaleNumber(impact.additionalConversions)}건`);
    console.log(`월간 추가 매출: ${toCurrency(impact.additionalRevenue)}`);
  }

  /**
   * 샘플 사이즈 결과 출력
   */
  printSampleSizeResult(result: SampleSizeResult): void {
    this.printSectionTitle('📐 샘플 사이즈 계산 결과');
    console.log(`현재 전환율: ${result.baselineRate}`);
    console.log(`기대 전환율: ${result.expectedRate}`);
    console.log(`최소 감지 효과 (MDE): ${result.mde}`);
    console.log(`유의수준 (α): ${result.alpha}`);
    console.log(`검정력 (1-β): ${result.power}`);
    console.log(`그룹당 필요 샘플: ${toLocaleNumber(result.perGroup)}명`);
    console.log(`총 필요 샘플: ${toLocaleNumber(result.total)}명`);
  }

  /**
   * 샘플 사이즈 참고표 출력
   */
  printSampleSizeTable(table: SampleSizeTableRow[]): void {
    this.printHeader('📊 샘플 사이즈 참고표 (α=0.05, power=0.8)');
    console.log('Baseline\t| MDE 10%\t| MDE 15%\t| MDE 20%');
    console.log(createSeparator('-', 55));

    for (const row of table) {
      console.log(`${row.baseline}\t\t| ${toLocaleNumber(row.mde10)}\t\t| ${toLocaleNumber(row.mde15)}\t\t| ${toLocaleNumber(row.mde20)}`);
    }
  }

  /**
   * 카이제곱 검정 결과 출력
   */
  printChiSquareResult(result: ChiSquareResult): void {
    this.printSectionTitle('📊 카이제곱 검정 결과');
    console.log(`카이제곱 통계량: ${result.chiSquare}`);
    console.log(`p-value: ${result.pValue}`);
    console.log(`유의미: ${result.isSignificant ? '예' : '아니오'}`);
  }

  /**
   * 전체 AB TEST 리포트 출력
   */
  printFullReport(config: ABTestConfig, result: ABTestResult, impact?: BusinessImpact): void {
    this.printHeader('📊 AB TEST 분석 리포트');
    this.printTestInfo(config);
    this.printData(config);
    this.printConversionComparison(result);
    this.printStatistics(result);
    this.printConclusion(result);

    if (impact) {
      this.printBusinessImpact(impact);
    }

    this.printFooter();
  }
}

// 싱글톤 인스턴스 내보내기
export const consoleView = new ConsoleView();
