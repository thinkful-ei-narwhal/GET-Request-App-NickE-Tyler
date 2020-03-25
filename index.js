function getParkAPI(state, max) {
  fetch (`https://developer.nps.gov/api/v1/parks?api_key=dua6ewMXtldjRipfMtigGZNiXxnuIAh8OGJkNdKH&stateCode=${state}&limit=${max}&start=${max}`)
    .then(response => response.json())
    .then(responseJson =>
      displayResults(responseJson, max))
    .catch(error => alert(`${error.message}`));
}

function displayResults(responseJson, max) {
  const results = [];
  console.log(responseJson);
  let objAddress = `${line1} <br /> ${city}${stateCode}, ${postalCode}`
  for (let i = 0; i < max; i++){
    results.push(`<div class="results-div">
    <div class="park-name">${responseJson.data[i].fullName}</div>
    <div class="park-description">${responseJson.data[i].description}</div>
    <div class="park-url">${responseJson.data[i].url}</div>
    <div class="park-address">
        <address>${responseJson.data[i].addresses[0][1]}</address>
    </div>
</div>`
    );
    $('.results').html(results.join('<br />'));
  } 
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