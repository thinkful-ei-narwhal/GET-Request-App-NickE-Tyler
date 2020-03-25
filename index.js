function getParkAPI(state, max) {
  fetch(`https://developer.nps.gov/api/v1/parks?api_key=dua6ewMXtldjRipfMtigGZNiXxnuIAh8OGJkNdKH&stateCode=${state}&limit=${max}&start=${max}`)
    .then(response => response.json())
    .then(responseJson =>
      displayResults(responseJson, max))
    .catch(error => alert(`${error.message}`));
}

function displayResults(responseJson, max) {
  const results = [];
  console.log(responseJson);
  for (let i = 0; i < max; i++) {
    results.push(`<div class="results-div">
    <div class="park-name">${responseJson.data[i].fullName}</div>
    <div class="park-description">${responseJson.data[i].description}</div>
    <div class="park-url">${responseJson.data[i].url}</div>
    ${addressCreator(responseJson.data[i].addresses)}
  </div>`
    );
    $('.results').html(results.join('<br />'));
  }
}

function addressCreator(objDataAddresses) {
  const addressArray = [];
  for (let address = 0; address < objDataAddresses.length; address++) {
    addressArray.push(`<div class="park-address">
    <address>Address Type: ${objDataAddresses[address].type} | Address: ${objDataAddresses[address].line1} ${objDataAddresses[address].city} ${objDataAddresses[address].stateCode} ${objDataAddresses[address].postalCode}</address>
  </div>`);
  }
  const addressesHTML = addressArray.join('');
  return addressesHTML;
}


function submitBtn() {
  $('.search-park').submit(event => {
    event.preventDefault();
    console.log('Submitted!');
    let state = $('.search-state').val();
    let max = $('.search-max').val();
    console.log(state, max);
    getParkAPI(state, max);
  });
}

submitBtn();