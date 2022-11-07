
const access_key = process.env.EXCHANGE_RATE_API_KEY;

getAllCurrenciesSymbols = () => {
    $.ajax({
        url: `https://api.exchangeratesapi.io/v1/symbols?access_key=${access_key}`,
        dataType: 'jsonp',
        type: 'GET',
        success: function(json) {
            // $("#symbols").html(json.symbols);
            return json.symbols;
        },
        error: function(err) {
          console.log("An error occured: " + err.status + " " + err.statusText);
        }
    });
}

exports.convertBetweenCurrencies = () => {
  const to = $("#to").text();
  const from = $("#from").text();
  const amount = $("#amount").text();
  $.ajax({
      url: `https://api.apilayer.com/exchangerates_data/convert?access_key=${access_key}&to=${to}&from=${from}&amount=${amount}`,
      dataType: 'jsonp',
      type: 'GET',
      success: function(json) {
          $("#conver_result").text(json.result);
      },
      error: function(err) {
        console.log("An error occured: " + err.status + " " + err.statusText);
      }
  });
}

exports.checkCurrency = async (currency) => {
  return await this.getAllCurrenciesSymbols().hasOwnProperty(currency.toString());
}