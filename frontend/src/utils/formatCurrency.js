const formatCurrency = (value) => {

  return new Intl.NumberFormat(
    "es-CL",
    {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0
    }
  ).format(Number(value));

};

export default formatCurrency;