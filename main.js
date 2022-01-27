// const paises = ["Alemanha", "Argentina","Brasil","Chile","Canadá","Dinamarca",
//                 "França","","Italia","inglaterra","Japão",
//                 "Portugal","Reino Unido","Russia","Uruguai"]
// console.log(...paises)
// const teste = (a)=>{
//     console.log(a)
// }
// const teste2 = paises.map(teste)

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
const container = document.querySelector('[data-container-img]');


const loadGallery = async(text)=>{
    const {hits} = await searchImages(text)
    const cards = hits.map(createCard)
    container.replaceChildren(...cards)
    console.log(hits)
    callback()
    
    
}


const handleKeyPress = ({key, target}) =>{
    const text = document.querySelector('[data-search-input]').value
    if(key == 'Enter'){
        loadGallery(text, target.value)
    }
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
    console.log(lastItem)
}

const openModal = () =>{
    
}

container.addEventListener('click',openModal)
document.querySelector('[data-search-input]').addEventListener('keypress', handleKeyPress)
document.querySelector('#previous').addEventListener('click',previous)
document.querySelector('#next').addEventListener('click', next)