import { createStore } from 'redux';

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// action을 리턴하는 함수 -> reducer 위에 선언
const addToDo = (text, id) => {
  return {
    type: ADD_TODO,
    text,
    id
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  // ==================================
  // state return ->
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: action.id };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned;
    default:
      return state;
  }
};

const store = createStore(reducer);

// ===================================================
// subscribe -> staet 변화시 작동 ?
store.subscribe(() => console.log(store.getState()));

// action -> (dispatch -> action으로 보낸다)
const dispatchAddToDo = (text, id) => {
  store.dispatch(addToDo(text, id));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
}

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  })
};

store.subscribe(paintToDos);

// ===================================================


const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo, Date.now());
};

// ===================================================
// call ->
form.addEventListener("submit", onSubmit);