var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function loadTodos() {
  $.ajax({
    // url: 'http://localhost:3000/todos',
    url: 'https://examenfinal-web.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      for( let i = 0; i < data.length; i++) {
        // aqui va su código para agregar los elementos de la lista
        console.log(data[i].description)
        // algo asi:
        addTodo(data[i]._id, data[i].description, data[i].completed)
        // no tienen que usar la funcion de addTodo, es un ejemplo
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      // url: 'http://localhost:3000/todos',
      url: 'https://examenfinal-web.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)
        // agregar código aqui para poner los datos del todolist en el el html
        let todolist =  $('#todo-list')
        todolist.append(
          `
            <li>
              <input type="checkbox" name="todo" value=${todolist.length + 1}>
              <span>${data.description}</span>
            </li>
          `
        )
        // console.log(todolist.length + 1)
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
})


function addTodo(id, todoText, completed) {
  let todolist =  $('#todo-list')
  newHtml = `
    <li>
      <input type="checkbox" name="todo" value=${todolist.length + 1}>
      <span>${todoText}</span>
    </li>
  `
  todolist.append(newHtml)

  if(completed) {
    todolist[todolist.length].addClass('done')
  }

}

// let todoList = $('#todo-list')
// todoList.click(function() {
//   let elements = $('input')
//   for(let i = 1; i <= elements.length; i++) {
//     if(elements[i].checked){
//       elements[i].addClass('done')

//       // json_to_send = {
//       //   "completed" : true
//       // };
//       // json_to_send = JSON.stringify(json_to_send);

//       // $.ajax({
//       //   // url: 'http://localhost:3000/todos',
//       //   url: 'https://examenfinal-web.herokuapp.com/todos/',
//       //   data: json_to_send,
//       //   method: 'PATCH',
//       //   dataType: 'json',
//       //   success: function(data){
//       //     console.log(data)
//       //   },
//       //   error: function(error_msg) {
//       //     alert((error_msg['responseText']));
//       //   }
//       // });


//     }else {
//       elements[i].removeClass('done')
//     }
//   }
// })