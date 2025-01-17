const addForm = document.querySelector('.add');

const list = document.querySelector('.todos');

const search = document.querySelector('.search input');

const generateTemplate = todo => {
      const html = `

        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
        `;

        list.innerHTML += html;
}


addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    if(todo.length) {
        generateTemplate(todo);
        addForm.reset();//it will reset all the form fields after the form is submitted.
    }
   
});

//delete todos --> we are implementing it using the event delegation concept.
//we are not applying the eventlistener to all the todos(list-items) delete icon, as in case we have a lots of todos, then javascript has to add eventlistener to each todos which will affect our site performance.
//secondly when we add new todo , then again separately , manaually we have to attach a event listener to its delete icon.

list.addEventListener('click', e=> {
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});


//creating a separate function for search functionality.
const filteredTodos = (term) => {

    //applying the filtered class->
    Array.from(list.children)
        .filter((todo) =>  !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    //un-applying the filtered class ->
    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

// keyup event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filteredTodos(term);
});




//we are making the add todo functionality as a separate function, as it will make our code more modular and also makes our code more reusable i.e., for each functionality we have a spearate function.