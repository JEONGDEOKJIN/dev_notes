


```tsx
const computedEstimate = useMemo(() => {
  const estimateModel: IExpectedPrice = {
    priceInfo: {
      normal: { totalPrice: 0, each: [] },
      cancer: { totalPrice: 0, each: [] },
      additional: { totalPrice: 0, each: [] },
      precision: { totalPrice: 0, each: [] },
    },
    totalPrice: 0,
  };

  let aggregatePrice = 0;

  Object.entries(map_detailInfoDataRowViewModel).forEach(
    ([categoryLabel, { data: exams, suffixNode: costComponents }]) => {
      const mappedKey = convertToExpectedKey(categoryLabel);

      const examEntries = (Array.isArray(exams) ? exams : [exams]).map(
        (examTitle, i) => {
          const fee = costComponents[i]?.props?.price ?? 0;
          aggregatePrice += fee;

          return {
            checkupTitle: examTitle,
            price: fee,
          };
        }
      );

      const subtotal = examEntries.reduce((acc, curr) => acc + curr.price, 0);

      estimateModel.priceInfo[mappedKey] = {
        totalPrice: subtotal,
        each: examEntries,
      };
    }
  );

  estimateModel.totalPrice = aggregatePrice;

  return estimateModel;
}, [map_detailInfoDataRowViewModel]);


```