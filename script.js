const arr = [
    {id:1, catecory:"Chair", name:"Sakarias Armchair",price: 392, image:"img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark.png", raiting:5, imgCart:'img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (5).png'}, 
    {id:2, catecory:"Chair", name:"Baltsar Chair",price: 299, image:"img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (1).png", raiting:5, imgCart:'img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (6).png'},
    {id:3, catecory:"Chair", name:"Anjay Chair",price: 519, image:"img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (2).png", raiting:5, imgCart:'img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (5).png'},
    {id:4, catecory:"Chair", name:"Nyantuy Chair",price: 921, image:"img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (4).png", raiting:5, imgCart:'img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (5).png'},
    {id:5, catecory:"Chair", name:"Nyantuy Chair",price: 921, image:"img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (4).png", raiting:5, imgCart:'img/sakarias-armchair-black-sporda-dark-gray__0729767_pe737131_s5_adobespark (5).png'},
]

const job = [
    {id:1, img:"img/Group 48095423 (4).svg", name:"Bang Upin",job:"Pedagang Asongan",text:"“Terimakasih banyak, kini ruanganku menjadi lebih mewah dan terlihat mahal“", raiting:4, bgImage:'img/unsplash__HqHX3LBN18.png'},
    {id:2, img:"img/Ellipse 1131 (9).png", name:"Ibuk Sukijan",job:"Ibu Rumah Tangga",text:"“Makasih Panto, aku sekarang berasa tinggal di apartment karena barang-barang yang terlihat mewah“", raiting:4, bgImage:'img/unsplash_JaXs8Tk5Iww.png'},
    {id:3, img:"img/Ellipse 1131 (10).png", name:"Mpok Ina",job:"Karyawan Swasta",text:"“Sangat terjangkau untuk kantong saya yang tidak terlalu banyak“", raiting:5, bgImage:'img/unsplash_h2_3dL9yLpU.png'},
]


const filterCart = []

const sl = document.querySelector('.sleder__wrapper')
const sliderWindow = document.querySelector('.slider-window')
const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const categoryButton = document.querySelectorAll('.tab-btn')
const CartCount = document.querySelector('.score__text')
const ScoreItem = document.querySelector('.score__item')
const CartTotalPrice = document.querySelector('.card_bottom-itog')
const summItem = document.querySelector('.card_bottom-pricee')

const sw = document.querySelector('.testmob__slider-wrapper')
const presBtn = document.getElementById('pers__btn')
const nexsBtn = document.getElementById('nexxt__btn')
const sliderWindowTwo = document.querySelector('.testimonals__slider-window')
const cartItemBox = document.querySelector('.card__item')
const cartOpne = document.querySelector('.header__cart')
const cartClose = document.querySelector('.cart__close-btn')
const cartModal = document.querySelector('.cart__modal')

for(let i = 0; i < job.length; i++){
    let jobRaiting = `<span><img src="img/Vector.png" alt=""></span>`.repeat(job[i].raiting)
    sw.innerHTML += `
    <div class="testmob__slider-card" style="background-image: url('${job[i].bgImage.replace(/ /g, '\\ ')}')">
        <div class="dd">
            <div class="img__wrapper">
                <img src="${job[i].img}" alt="" class="testmob__avatar-img">
            </div>
            <h3 class="testmob__name">${job[i].name}</h3>
            <p class="testmob__job">${job[i].job}</p>
            <p class="testmob__text">${job[i].text}</p>
            <div class="testmob__raiting">${jobRaiting}</div>
        </div>
    </div>
    `
}

if(presBtn) {
    presBtn.addEventListener('click', () => {
        let step = window.innerWidth >= 380 ? 240 : 310
        sliderWindowTwo.scrollBy({left: step, behavior: 'smooth'})
    })
}

if(nexsBtn) {
    nexsBtn.addEventListener('click', () => {
        let step = window.innerWidth <= 380 ? -240 : -310;
        sliderWindowTwo.scrollBy({left: step, behavior: 'smooth'});
    })
}

for(let i = 0; i < arr.length; i++ ){
    let raitingChair = `<span><img src="img/Vector.png" alt=""></span>`.repeat(arr[i].raiting)
    sl.innerHTML += `
    <div class="card">
        <img class="card__img" src="${arr[i].image}" alt="">
        <p class="card__category">${arr[i].catecory}</p>
        <p class="card__tittle">${arr[i].name}</p>
        <div class="raiting">${raitingChair}</div>
        <div class="card__bottom">
            <p class="card__price">${arr[i].price}</p>
            <button class="card__button" data-id="${arr[i].id}">+</button>
        </div>
    </div>
    `
}

function updateGlobalCounter() {
    let totalCount = 0
    let totalPrice = 0
    
    for (let i = 0; i < filterCart.length; i++) {
        totalCount += filterCart[i].count
        totalPrice += filterCart[i].price * filterCart[i].count
    }
    
    if (CartCount) {
        CartCount.textContent = totalCount
    }
    if (ScoreItem) {
        ScoreItem.textContent = totalCount
    }
    if(summItem){
        summItem.textContent = totalCount
    }
    if (CartTotalPrice) {
        CartTotalPrice.textContent = `$${totalPrice}`
    }
}

sl.addEventListener('click', (e) => {
    const button = e.target.closest('.card__button')
    if (!button) return

    let nameBtn = Number(button.dataset.id)
    
    let alCartr = false 

    for (let i = 0; i < filterCart.length; i++) {
        if (filterCart[i].id === nameBtn) {
            filterCart[i].count += 1
            alCartr = true
            break
        }
    }

    if (alCartr === false) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === nameBtn) {
                arr[i].count = 1
                filterCart.push(arr[i])
                break
            }
        }
    }

    updateGlobalCounter()
    renderCart()
})

if(prevBtn) {
    prevBtn.addEventListener('click', () => {
        let step = window.innerWidth < 380 ? -100 : -300
        sliderWindow.scrollBy({left: step, behavior: 'smooth'})
    })
}

if(nextBtn) {
    nextBtn.addEventListener('click', () => {
        let step = window.innerWidth < 380 ? 100 : 300
        sliderWindow.scrollBy({left: step, behavior: 'smooth'})
    })
}

function renderCart() {
    cartItemBox.innerHTML = ''

    for (let i = 0; i < filterCart.length; i++) {
        cartItemBox.innerHTML += `
        <div class="card__item-cart">
            <div class="cart__item-wrapper">
                <div class="cart__item__img">
                    <img src="${filterCart[i].imgCart}" alt="">
                </div>
                <div class="cart__item-content">
                    <h3 class="cart__item-tittle">${filterCart[i].name}</h3>
                    <p class="cart__item-category">${filterCart[i].catecory}</p>
                    <div class="cart__item-raiting">
                        <img src="img/Group 172.svg" alt="">
                        <span>${filterCart[i].raiting}.0</span>
                    </div>
                    <h3 class="cart__item-price">$${filterCart[i].price}</h3>
                </div>
                <div>
                    <button class="cart__item__close" data-id="${filterCart[i].id}">
                        <img src="img/Group 48095480.png" alt="">
                    </button>
                    <div class="cart__item-amouth">
                        <button class="cart__item-button minus-btn" data-id="${filterCart[i].id}">-</button>
                        <span>${filterCart[i].count}</span> 
                        <button class="cart__item-button plus-btn" data-id="${filterCart[i].id}">+</button>
                    </div>
                </div>
            </div>
        </div>
        `
    }
}

cartItemBox.addEventListener('click', (e) => {
    const closeButton = e.target.closest('.cart__item__close')
    const plusButton = e.target.closest('.plus-btn')
    const minusButton = e.target.closest('.minus-btn')

    if (closeButton) {
        const idToRemove = Number(closeButton.dataset.id)
        const itemIndex = filterCart.findIndex(item => item.id === idToRemove)
        if (itemIndex !== -1) {
            filterCart.splice(itemIndex, 1)
        }
    } else if (plusButton) {
        const idToIncrease = Number(plusButton.dataset.id)
        const item = filterCart.find(item => item.id === idToIncrease)
        if (item) {
            item.count += 1
        }
    } else if (minusButton) {
        const idToDecrease = Number(minusButton.dataset.id)
        const itemIndex = filterCart.findIndex(item => item.id === idToDecrease)
        if (itemIndex !== -1) {
            if (filterCart[itemIndex].count > 1) {
                filterCart[itemIndex].count -= 1
            } else {
                filterCart.splice(itemIndex, 1)
            }
        }
    } else {
        return
    }

    updateGlobalCounter()
    renderCart()
})

cartOpne.addEventListener('click',() =>{
    cartModal.classList.add('active')
})

cartClose.addEventListener('click',() =>{
    cartModal.classList.remove('active')
})
