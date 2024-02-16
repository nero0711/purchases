// константы кликабельных объектов

const moneyBox = document.querySelector('.colls_rows');
const itemsBox = document.querySelector('.colls_item');

const childAllMoney = document.querySelectorAll('.money');
const childAllItems = document.querySelectorAll('.items');

const clearPressMoney = document.querySelector('.clear_money');
const clearPressItems = document.querySelector('.clear_items');

// const listTag = document.querySelector('.chek_list');

const pressSaweShek = document.querySelector('.press_sours');

const formChech = document.querySelector('.list_check');

// Глобальные переменные
let arrObj = [];
let fullMoney = 0;
let fullItems = 0;
let fullSheck = '';
let idChildSheck = 0;
let i = 0;
let mins = 0;
let renderChech = '';

// выбор суммы и количества

moneyBox.addEventListener('click', (e) => {

    if(e.target.classList[1] == 'money'){
        if(e.target.textContent == '9' ){
            e.target.textContent = 0;
        } else {
            e.target.textContent = Number(e.target.textContent) + 1;
        }
    }
});

itemsBox.addEventListener('click', (e) => {

    if(e.target.classList[1] == 'items'){
        if(e.target.textContent == '9' ){
            e.target.textContent = 0;
        } else {
            e.target.textContent = Number(e.target.textContent) + 1;
        }
    }
})

// очистка суммы и количества
const clears = (iterableObj) => {
    iterableObj.forEach((item) =>{
        item.classList[1] ? item.textContent = 0 : false;
    });
}


clearPressMoney.addEventListener('click', (e) =>{
    e.preventDefault();

    clears(childAllMoney);
});

clearPressItems.addEventListener('click', (e) =>{
    e.preventDefault();

    clears(childAllItems);
});

// Запись чека

pressSaweShek.addEventListener('click', (e) =>{
    e.preventDefault();

    fullMoney = 0;
    fullItems = 0;

    childAllMoney.forEach((item) =>{
        fullMoney += `${item.textContent}`;
    });

    childAllItems.forEach((item) =>{
        fullItems += `${item.textContent}`;
    });

    idChildSheck = arrObj.length + 1;

    if (Number(fullMoney) && Number(fullItems)){
        arrObj.push({
            "fullmoney" : Number(fullMoney), 
            "items": Number(fullItems),
            "money":  Number(fullMoney) / Number(fullItems),
            // "tag" : listTag.value, 
            "id" : 'C_' + idChildSheck
        });
    } 

    // listTag.value = '';

        //Создаем новый элемент
    const createChesk = (elem, elemArrObj, min = false) => {
        const newElem = document.createElement(elem);
        newElem.className = elemArrObj.id;

        newElem.innerHTML =`
        <p class='money_position${idChildSheck--}'> 
        ${Number(elemArrObj.money).toFixed(2)} руб. шт.

        <span class='items${idChildSheck--}'>
        [цена ${Number(elemArrObj.fullmoney).toFixed(2)} руб. /
        </span>

        <span class='items${idChildSheck--}'>
        кол-во ${elemArrObj.items}]
        </span>
        </p>
        ` 
            // 'Цена за штуку: ' + Number(elemArrObj.money).toFixed(2) + '\n' + 
            // 'Количество: ' + elemArrObj.items + '\n' +
            // 'Цена: ' + Number(elemArrObj.fullmoney).toFixed(2) + '\n';
            //     // + 'Заметка: ' + elemArrObj.tag;

        if(min){
            newElem.style.padding = '10px';
            newElem.style.textAlign = 'center';
            newElem.style.width = '95%';
            newElem.style.backgroundColor = 'aquamarine';
        }
        
        return newElem;
    }

        // Узнаем самую маленькую сумму за штуку в массиве, заполняем рендер лист
    formChech.innerHTML = '';

    arrObj.forEach((item, index) => {
        if (arrObj[index - 1] && Number(item.money) > Number(arrObj[index - 1].money)) {
            i = Number(arrObj[index - 1].money);
            mins = arrObj[index - 1];
        } else {
            i = Number(item.money);
            mins = item;
        }

        formChech.append(createChesk('div', item));
    });

    mins? formChech.prepend(createChesk('div', mins, true)): false;

    clears(childAllItems);
    clears(childAllMoney);

    

    // formChech.append(renderChech);


    // console.log('Min check', i.toFixed(2), 'min elem', mins);

    // console.log(arrObj);

});

