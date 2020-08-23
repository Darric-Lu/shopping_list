const data = {
  localShoppingList: JSON.parse(localStorage.getItem('shoppingList')) || ['jeans', 'shirt', 'Cell phone'],//購物清單
  localGotList: JSON.parse(localStorage.getItem('gotList')) || ['computer',],//入手清單
}
const model = {
  list: document.querySelector('#my-list'),
  addBtn: document.querySelector('#addBtn'),
  newList: document.querySelector('#newList'),
  gotList: document.querySelector('#got-list-item'),
  addShoppingListArry(e) {//存入localStorage
    const shoppingList = data.localShoppingList
    shoppingList.push(e)
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  },
  removeShoppingListArry(item) {
    const shoppingList = data.localShoppingList
    let index = shoppingList.findIndex(e => e === item)
    shoppingList.splice(index, 1)
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList))
  },
  addGotIListArry(e) {
    const gotList = data.localGotList
    gotList.push(e)
    localStorage.setItem('gotList', JSON.stringify(gotList))
  },
  removeGotIListArry(item) {
    const gotList = data.localGotList
    let index = gotList.findIndex(e => e === item)
    gotList.splice(index, 1)
    localStorage.setItem('gotList', JSON.stringify(gotList))
  },
}
const view = {
  addItem(item) {//加入購物清單
    let newItem = document.createElement('li')
    newItem.innerHTML = `
        <input type="checkbox" id="scales" name="scales" class="mr-2 cb">
        <label for="list">${item}</label>
        <i class="delete fa fa-trash"></i>
      `
    model.list.appendChild(newItem)
  },
  addGotItem(item) {//加入入手清單
    let gotItem = document.createElement('li')
    gotItem.innerHTML = `
      <input type="checkbox" id="scales" name="scales" class="mr-2 cb" checked>
      <label class='checked' for="list">${item}</label> <i class="delete fa fa-trash"></i>
    `
    model.gotList.appendChild(gotItem)
  },
}

const controller = {
  itemGot(e) {
    if (e.target.classList.contains('delete')) {//刪除物品
      e.target.parentElement.remove()
      model.removeShoppingListArry(String(e.target.previousElementSibling.textContent))
    } else if (e.target.tagName === 'LABEL') {//購買物品
      let gotItem = document.createElement('li')
      gotItem.innerHTML = `
      <input type="checkbox" id="scales" name="scales" class="mr-2 cb" checked>
      <label class='checked' for="list">${event.target.textContent}</label> <i class="delete fa fa-trash"></i>
    `
      model.removeShoppingListArry(String(e.target.textContent))
      model.addGotIListArry(String(e.target.textContent))
      model.gotList.appendChild(gotItem)
      e.target.parentElement.remove()
    }
  },
  undo(e) {
    if (e.target.classList.contains('delete')) {//刪除物品
      e.target.parentElement.remove()
      model.removeGotIListArry(String(e.target.previousElementSibling.textContent))
    } else if (e.target.tagName === 'LABEL') {
      let undoItem = document.createElement('li')
      undoItem.innerHTML = `
      <input type="checkbox" id="scales" name="scales" class="mr-2 cb">
      <label for="list">${e.target.textContent}</label> <i class="delete fa fa-trash"></i>
    `
      model.removeGotIListArry(String(e.target.textContent))
      model.addShoppingListArry(String(e.target.textContent))
      model.list.appendChild(undoItem)
      e.target.parentElement.remove()
    }
  },
  checkBoxDo(e) {
    if (e.target.classList.contains('cb')) {
      let item = document.createElement('li')
      item.innerHTML = `
        <input type="checkbox" id="scales" name="scales" class="mr-2 cb" checked>
        <label class='checked' for="list">${e.target.nextElementSibling.textContent}</label> <i class="delete fa fa-trash"></i>
       `
      model.removeShoppingListArry(String(e.target.nextElementSibling.textContent))
      model.addGotIListArry(String(e.target.nextElementSibling.textContent))
      model.gotList.appendChild(item)
      e.target.parentElement.remove()
    }
  },
  checkBoxUndo(e) {
    if (e.target.classList.contains('cb')) {
      let item = document.createElement('li')
      item.innerHTML = `
        <input type="checkbox" id="scales" name="scales" class="mr-2 cb">
        <label for="list">${e.target.nextElementSibling.textContent}</label> <i class="delete fa fa-trash"></i>
       `
      model.removeGotIListArry(String(e.target.nextElementSibling.textContent))
      model.addShoppingListArry(String(e.target.nextElementSibling.textContent))
      model.list.appendChild(item)
      e.target.parentElement.remove()
    }
  },
  addListItem() {// 增加清單以及空白提醒
    let inputValue = model.newList.value.trim()
    if (inputValue === '') {
      window.alert(`請輸入購物項目 `)
      model.newList.value = ""
    } else {
      view.addItem(inputValue)
      model.addShoppingListArry(inputValue)
      model.newList.value = ""
    }
  },
  addListItemEnter(e) {//綁定Enter
    if (e.keyCode == 13) {
      controller.addListItem()
    }
  },
  init() {
    data.localShoppingList.forEach(e => {
      view.addItem(e)
    })
    data.localGotList.forEach(e => {
      view.addGotItem(e)
    })
    model.addBtn.addEventListener('click', controller.addListItem)
    model.newList.addEventListener('keypress', controller.addListItemEnter)
    model.list.addEventListener('click', controller.itemGot)
    model.gotList.addEventListener('click', controller.undo)
    model.list.addEventListener('click', controller.checkBoxDo)
    model.gotList.addEventListener('click', controller.checkBoxUndo)
  },
}

controller.init()

// console.log(data.localShoppingList)