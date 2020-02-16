function fraction(price, installments) {
  const totalParcela = price / parseInt(installments);
  return totalParcela.toFixed(2);
}

export default fraction;
