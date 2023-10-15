const loadData = async (searchText22='12') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText22}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);
    displayPhone(phone);
}

const displayPhone = phone => {
    // console.log(phone)
    const phoneContainer = document.getElementById('phone-container');
    // clear text before rearch result
    phoneContainer.textContent = '';

    // show all desplay when phone show more than 10
    const showAllContainer = document.getElementById('showAll');
    if(phone.length > 10){
      showAllContainer.classList.remove('hidden')
    }else{
      showAllContainer.classList.add('hidden')
    }

    phone = phone.slice(0,10);

    phone.forEach(phone => {
        // console.log(phone)

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-200 shadow-x`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-center">
                    <button onclick="handleShowDetails('${phone.slug}')" id="show-datails" class="btn btn-primary">Show details</button>
                  </div>
                </div>
        `
        phoneContainer.appendChild(phoneCard);
    })
    toggleLoadingSpinner(false);
}

const handleShowDetails = async (id)=>{
  // console.log('show details btn clicked', id)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name;

  const showDetailsContainer = document.getElementById('show-details-container');
  showDetailsContainer.innerHTML = `
    <img src="${phone.image}" alt="" />
    <h2>storage: ${phone.mainFeatures.storage}</h2>
    <h2>displaysize: ${phone.mainFeatures.displaySize}</h2>
    <h2>brand: ${phone.brand}</h2>
  `

  // show the modal
  show_details_modal.showModal();
}

// handle search button
const handleSearchBtn = ()=>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-fild');
    const searchText22 = searchField.value;
    console.log(searchText22);
    loadData(searchText22);
}

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
      loadingSpinner.classList.remove('hidden');
    }else{
      loadingSpinner.classList.add('hidden');
    }
}

loadData();