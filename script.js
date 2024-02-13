 // Function to fetch data from the API
 function fetchData() {
    return new Promise((resolve, reject) => {
      fetch('https://random-data-api.com/api/v2/users?size=5&response_type=json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  // Function to display data on the webpage
  function displayData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = ''; // Clear existing data
    data.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card', 'p-3');

      const fullName = document.createElement('h5');
      fullName.classList.add('card-title', 'mb-3');
      fullName.textContent = `${item.first_name} ${item.last_name}`;

      const email = document.createElement('p');
      email.classList.add('card-text', 'mb-2');
      email.textContent = item.email;

      cardBody.appendChild(fullName);
      cardBody.appendChild(email);
      card.appendChild(cardBody);
      dataContainer.appendChild(card);
    });
  }

  // Function to handle regenerate button click
  document.getElementById('regenerateBtn').addEventListener('click', () => {
    fetchData()
      .then(data => displayData(data))
      .catch(error => console.error('Error fetching data:', error));
  });

  // Fetch data and display it initially
  fetchData()
    .then(data => displayData(data))
    .catch(error => console.error('Error fetching data:', error));