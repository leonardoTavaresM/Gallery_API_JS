const section = document.querySelector('[data-section-container]')
const gallery = document.querySelector('[data-container-gallery]')
const container = document.querySelector('[data-container-img]');
const input = document.querySelector('[data-search-input]')
const button = document.querySelector('[data-search-button]')
const nextButton = document.querySelector('#next')
const previousButton = document.querySelector('#previous')


const searchImages = async (text)=>{//consumindo api
    const key ='25303315-a91f971c5f2e4d7a327b35988';
    const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
    const response = await fetch(url);
    return response.json()
}

const  createCard= ({webformatURL, pageURL, tags, likes, comments}) => {
    const card = document.createElement('div')
    card.classList.add('card-container')
    card.innerHTML = `
            <img src="${webformatURL}" class="card-image">
            <a href="${pageURL}" class="card-link"></a>
    `;
    return card
}



const loadGallery = async(text)=>{
    const {hits} = await searchImages(text)
    const cards = hits.map(createCard)
    container.replaceChildren(...cards)
    // console.log(hits)
    callback()
    
    
}


const handleKeyPress = ({key, target}) =>{
    const text = document.querySelector('[data-search-input]').value
    if(key == 'Enter'){
        loadGallery(text, target.value)
        container.addEventListener('click',openModal)
    }
}

const clickSearch = ({key,target})=>{
    const text = document.querySelector('[data-search-input]').value
    loadGallery(text, target.value)
}

const callback =  () =>{
    let items = document.querySelectorAll('.card-container')
    return items
}

const previous = () =>{
    let item = callback()
    container.appendChild(item[0])
    item = document.querySelectorAll('.card-container')
}

const next = () =>{
    const item = callback()
    const lastItem = item[item.length-1]
    container.insertBefore(lastItem, item[0])
    // console.log(item)
    // const teste = item.find(element=>element>1)
    
}
const openModal = (event) =>{
    // const buttons = document.querySelectorAll('.action-button')
    // console.log(buttons)
    // buttons.forEach((element)=>{
    //     element.classList.toggle('active')
    // })
    section.classList.toggle('active-container')
    gallery.classList.toggle('active-container-gallery')
    nextButton.classList.toggle('active')
    previousButton.classList.toggle('active')
}



button.addEventListener('click', clickSearch)
input.addEventListener('keypress', handleKeyPress)
nextButton.addEventListener('click', next)
previousButton.addEventListener('click',previous)

