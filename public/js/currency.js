

$(()=>{
  $("#currency_checkout").change(function() {
    convertBetweenCurrencies();
  });

  const access_key = "AhJftakcZkowdPEwel8RfE9aFUDXhFEw";

  var curr_currency = 'USD';
  
  const convertBetweenCurrencies = () => {
    const to = $("#currency_checkout").val();
    const amount = $("#amount_checkout").text();

    var myHeaders = new Headers();
    myHeaders.append("apikey", access_key);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${curr_currency}&amount=${amount}`, requestOptions)
      .then(response => response.json())
      .then(res => {
        curr_currency = to;
        const symbols ={
          'USD':'$',
          'EUR':'€',
          'ILS':'₪'
      }
      $("#amount_checkout").text(`${res.result}`);
      $("#symbol").text(`${symbols[to]}`);
      })
      .catch(error => console.log('error', error));
  }
})