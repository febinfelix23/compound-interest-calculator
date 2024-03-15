const rangeInput = document.querySelectorAll('#slider1');
const rangeInput2 = document.querySelectorAll('#slider2');
const rangeInput3 = document.querySelectorAll('#slider3');

rangeInput.forEach(input => {
  input.addEventListener("input", () => {
    let values = parseInt(rangeInput[0].value);
    principal.value = values;
  })
})

rangeInput2.forEach(input => {
  input.addEventListener("input", () => {
    let values = parseInt(rangeInput2[0].value);
    rate.value = values;
  })
})

rangeInput3.forEach(input => {
  input.addEventListener("input", () => {
    let values = parseInt(rangeInput3[0].value);
    years.value = values;
  })
})

// Calculation
function calculate() {
  const totalValue = document.getElementById('maturity');
  let principal = document.getElementById('principal').value;
  let rate = (document.getElementById('rate').value) / 100;
  let years = document.getElementById('years').value;

  const amount = Number(principal);
  const result = principal * Math.pow((1 + rate / 1), 1 * years);
  const totalInterest = result - amount;

  // Conditions
  if (principal < 0 || isNaN(principal)) {
    principal = 0;
    alert('Enter a valid number!!')
  }
  else if (rate < 0 || isNaN(rate)) {
    rate = 0;
    alert('Enter a valid number!!')
  }
  else if (years < 0 || isNaN(years)) {
    years = 0;
    alert('Enter a valid number!!')
  }
  else {
    totalValue.textContent = result.toLocaleString(undefined, { style: "currency", currency: "INR" });
    document.getElementById('amount').textContent = amount.toLocaleString(undefined, { style: "currency", currency: "INR" });
    document.getElementById('interest').textContent = totalInterest.toLocaleString(undefined, { style: "currency", currency: "INR" });

    // Chart Update
    function addData(chart, amount, totalInterest) {
      chart.data.labels[1] = "Total Interest";
      chart.data.labels[0] = "Principal Amount";
      chart.data.datasets.forEach((dataset) => {
        dataset.data[1] = totalInterest;
        dataset.data[0] = amount;
      });
      chart.update();
    }

    addData(myChart, amount, totalInterest);
  }
}

// Chart
var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Principal Amount"],
    datasets: [{
      data: [1000],
      borderColor: 'rgb(56, 127, 200)',
      borderWidth: 2,
      backgroundColor: [
        'rgb(214, 223, 255)',
        'rgb(56, 127, 200)'
      ],
    }]
  },
});

function resetAll() {
  document.getElementById('principal').value = 1000;
  document.getElementById('rate').value = 1;
  document.getElementById('years').value = 1;
  slider1.value = 1000;
  slider2.value = 1;
  slider3.value = 1;
  document.getElementById('amount').textContent = '--';
  document.getElementById('interest').textContent = '--';
  document.getElementById('maturity').textContent = '--';
}