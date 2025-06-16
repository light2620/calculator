const formatNumber = (num) => {
  return !isNaN(num) && num !== null && num !== undefined
    ? Number(num).toFixed(2)
    : "-";
};

export {formatNumber}