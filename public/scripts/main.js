// Write chatr code here!

if (false) {
// Promise Review
// Promises are a object that will return a value in the future.

// setTimeout is a async function.
// we "promsified" setTimeout in a promise called saySomethingLater
function saySomethingLater(delay, phrase) { 
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(phrase)
      resolve(phrase)
    }, delay)
  })
}

// to consume our promise `saySomethingLater` we chain a `.then()` method to it.
// `.then()` accepts a callback function. This callback function gets invoked when the promise resolves (completes)
// the argument provided in the .then()'s callback is the value the promise resolves
saySomethingLater(3000, 'monday')
  .then((phrase) => {
    console.log(`logging from .then the phrase: ${phrase}`);
    return 'apples'
  })
  .then((args) => {
    console.log(args)
  })

}


// Creating Fetch Requests

// Routes

// GET "/messages" -> Returns all messages (Message Index)
// POST "/messages" -> Create a message (Message Create)
// PATCH "/messages/:id" -> Update a message (Message Update)
// DELETE "/messages/:id" -> Delete a message (Message Delete)

const BASE_URL = 'http://localhost:3434';

const Message = {
  all() {
    return fetch(`${BASE_URL}/messages`) // GET "/messages"
      .then((response) => {
        return response.json(); // response.text() is a promise that will will read the response.body and turn it into text
      })
  },

  create(params) {
    // POST "/messages"
    return fetch(`${BASE_URL}/messages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
  },

  delete(id) {
    return fetch(`${BASE_URL}/messages/${id}`, {
      method: "DELETE"
    }).then(response => response)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const messagesContainer = document.querySelector('#messages');

  // grabs all the messages and displays them on the page
  function refreshMessages() {
    Message.all()
      .then((messages) => {
        const htmlString = messages.map((m) => {
          return (
            `<li>
              <strong>#${m.id}</strong>
              <p>${m.body}</p>
              <button data-id="${m.id} "class="delete-msg-btn">
                Delete
              </button>
            </li>
            `
          )
        }).join("");
        messagesContainer.innerHTML = htmlString;
      })
  }

  refreshMessages();

  // creates a new message and calls "refreshMessages()"
  const newMessageForm = document.querySelector('#new-message');
  newMessageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    Message.create({
      username: 'brandon',
      body: formData.get('body')
    })
      .then((payload) => refreshMessages());
  })


  // Delete a message
  messagesContainer.addEventListener("click", (event) => {
    const target = event.target
    console.log(target);
    if (target.matches(".delete-msg-btn")) {
      const id = target.getAttribute('data-id')
      Message.delete(id)
        .then(() => refreshMessages())
    }
  })
})


const PokemonAPI = {
  index() {
    fetch('https://pokeapi.co/api/v2/pokemon/5')
      .then(res => res.json())
      .then(payload => console.log(payload));
  }
}