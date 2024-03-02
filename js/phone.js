const loadPhone = async(searchText, isShowAllClicked) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAllClicked);
    
}


const displayPhones = (phones, isShowAllClicked) => {
    
    
    // console.log(phones)
    const phonesContainer = document.getElementById('phones-container');

    //display showall button if the phones quantity is more than 9
    const showAllBtn = document.getElementById('show-all');
    if(phones.length > 9 && !isShowAllClicked){
        showAllBtn.classList.remove('d-none')
    } else{
        showAllBtn.classList.add('d-none')
    }

    console.log('is show all',isShowAllClicked)

    //show only first 12 phones if not show all clicked
    if(!isShowAllClicked){
        phones = phones.slice(0,9);
    }
    //clear phones before new search
    phonesContainer.textContent = '';

    phones.forEach(phone => {
        console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl`
        phoneCard.innerHTML = `
        <figure><img class="" src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-end">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `
        phonesContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toggleLoader(false)
}

//handle Show Details
const handleShowDetails = async (id) => {
    // console.log('show details clicked from ', id)

    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    console.log(data.data)


}


// handle Search
const handleSearch = (isShowAllClicked) => {

    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAllClicked);
    // alert(searchText)
}

const toggleLoader = (isLoading) => {
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none')
    } else{
        loader.classList.add('d-none')
    }
}

//handle show all 

const handleShowAll = () => {
    handleSearch(true)
}

// loadPhone('iphone')