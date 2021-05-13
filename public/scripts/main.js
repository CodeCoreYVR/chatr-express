// Clone chatr project from https://github.com/CodeCoreYVR/chatr-express.git
// cd into directory
// nvm install 12.18.4
// and/or nvm use 12.18.4
// npm i fsevents
// npm run db:setup

// Write chatr code here!

// === XMLHttpRequest ===

// The constructor XMLHttpRequest is available in the browser 
// and can use JSON as well.
// const getReq = new XMLHttpRequest()

// // The "load" event will be fired when we get a response back
// // from this request. Read the "responseText" property off of 
// // "getReq" to read the response.
// getReq.addEventListener(
//   'load',
//   function() {
//     console.log(this.responseText)
//   }
// )

// // open() initializes a request. It takes in the following arguments:
// // 1. name of HTTP verb
// // 2. api endpoint
// getReq.open(
//   'GET',
//   'https://pokeapi.co/api/v2/pokemon/mr-mime'
// )

// // Send the request
// getReq.send()

// // === jQuery's ajax() ===

// $.ajax({
//   method: 'GET',
//   url: 'https://pokeapi.co/api/v2/pokemon/pikachu',

//   // This function will be invoked after the request is successful
//   success(data) {
//     console.log(data)
//   },
// })

// // === FETCH API ===

// // Routes built in Chatr-Express
// // GET /messages -> A JSON array of Messages
// // POST /messages -> A confirmation (creates a message)
// // PATCH /messages/:id -> A confirmation (edit a message)
// // DELETE /messages/:id -> A confirmation (deletes a message)

// // GET request:
// // Calling "fetch" with a URL as its only argument, it will make
// // a GET request to that URL. It is async and returns a promise.
// fetch('http://localhost:3434/messages')
//   // "fetch" returns an object that represents the HTTP response.  
//   // Use the async method .text() or .json() on the response to 
//   // parse its body. Makse sure to return it from the callback.
//   .then(response => response.json())

//   // .then(data => console.table(data))
//   // This is the same as above. We can pass console.table as a callback
//   // because how console.table is defined is it will log the argument
//   // that is passed to it. If the data is specifically an array of objects, 
//   // we can use console.table to output it in a neat format
//   .then(console.table)

// // POST request:
// // To make a POST request, we add an options object as a second 
// // argument to fetch().
// fetch('http://localhost:3434/messages', {
//   method: 'POST', // The HTTP verb
//   headers: {
//     // This HTTP header tells the server that we're sending 
//     // JSON encoded data
//     "Content-Type": "application/json",
//   },
//   // The body of the request. This is we put our data.
//   // JSON.stringify converts a JS object to a JSON string. Our app
//   // takes a message object with a "body" attribute to create in the database
//   body: JSON.stringify({ body: "What's up?" }),
// })

// // All our requests to messages
// const Message = {
//   // Example usage:
//   // Message.index().then(console.log)
//   index() {
//     return fetch('http://localhost:3434/messages')
//       .then(response => response.json())
//   },
//   create(params) {
//     return fetch('/messages', { // we can omit the domain because "/" is on the same domain as the server
//       method: 'POST', 
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(params),
//     })
//   },
//   delete(id) {
//     return fetch(`/messages/${id}`, {
//       method: 'DELETE',
//     })
//   },
// }

// document.addEventListener('DOMContentLoaded', () => {
//   const messagesUl = document.querySelector("#messages")
//   const messageForm = document.querySelector('#new-message')

//   const refreshMessages = () => {
//     Message.index()
//       .then(messages => {
//         messagesUl.innerHTML = messages
//           .map(message => {
//             return `  
//               <li>
//                 <strong>#${message.id}</strong> ${message.body} <br>
//                 <button
//                   data-id="${message.id}"
//                   class="delete-button"
//                 >
//                   Delete
//                 </button>
//               </li>
//             `
//           })
//           .join('')
//       })
//   }
//   setInterval(refreshMessages, 500)

//   messageForm.addEventListener('submit', event => {
//     event.preventDefault()

//     const { currentTarget } = event // The form element

//     // Use the FormData contructor to create a object representation
//     // of the keys and values of the form that we pass as an argument
//     // to the constructor
//     const formData = new FormData(currentTarget)

//     // formData.get() returns the value associated with a given key
//     // from within a FormData object.
//     Message.create({ body: formData.get("body")})
//       .then(() => {
//         console.log("Message created!")
//         refreshMessages()
//         currentTarget.reset() // resets (empties) the form inputs 
//       })
//   })

//   messagesUl.addEventListener('click', event => {
//     const { target } = event // element that triggered the event

//     // Deletgate the event to the <ul> because only the list exists
//     // when the DOM first loads. If the target we clicked on matches
//     // the selector, we'll delete the message
//     if (target.matches('.delete-button')) {
//       // Use the "dataset" property to read data-* attributes
//       Message.delete(target.dataset.id).then(() => {
//         console.log("Message deleted!")
//         refreshMessages()
//       })
//     }
//   })
// })

// // === Chat-Battle Solutions ===

// // Create a message
// fetch('/messages', {
//   method: 'POST',
//   headers: {
//       "Content-Type": "application/json",
//     },
//   body: JSON.stringify({ body: "hello world" })
// })

// // Count all messages
// fetch('/messages')
//   .then(res => res.json())
//   .then(messages => console.log(messages.length))

// // Edit someone else's message
// fetch('/messages/18237', {
//   method: 'PATCH',
//   headers: {
//       "Content-Type": "application/json",
//     },
//   body: JSON.stringify({ body: "something else" })
// })

// // Delete someone's message
// fetch('/messages/18236', { method: 'DELETE' })

// AJAX Helpers

function deleteMessage(id) {
  return fetch(`/messages/${id}`, {
    method: 'DELETE'
  });
}

function createMessage(message) {
  return fetch(`/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  });
}

function updateMessage(message, id) {
    return fetch(`/messages/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  }

function renderMessages(messages = []) {
  return messages
    .map(
      message => `
      <li>
        <p>
          <strong>${message.id}</strong>
          ${message.username} -
          ${message.body}
          <i data-id="${message.id}" data-flagged="${message.flagged}" class="flag-button fa fa-lg fa-flag${message.flagged ? "" : "-o"}"></i>
        </p>
        <button data-id="${message.id}" class="delete-button">
          Delete
        </button>
      </li>
    `
    )
    .join('');
}

function refreshMessages(node) {
  fetch('/messages')
    .then(res => res.json())
    .then(messages => {
      node.innerHTML = renderMessages(messages);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const messagesUl = document.querySelector('#messages');
  const newMessageForm = document.querySelector('#new-message');

  // Every second, re-render the messages inside
  // of the ul#message node
  setInterval(() => refreshMessages(messagesUl), 1000);

  newMessageForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    createMessage({
      username: formData.get('username'),
      body: formData.get('body')
    }).then(() => refreshMessages(messagesUl));
  });

  // The `.delete-button`s are not on the page initially
  // or event after the dom content is loaded. Once they
  // appear, they're constantly replaced every second.
  // Yet we need to be able to listen to clicks on them.

  // It would be an inefficient strategy to create the
  // event listener on delete-button everytime they're
  // re-created. It would take up a lot of memory.

  // Instead, we'll listen for clicks on an ancestor
  // that is on the page from the beginning and is
  // never removed. When a one of its descendents is
  // clicked, we'll check the target of the event.
  // If the target is the `.delete-button`, we'll
  // do something otherwise we'll do nothing.

  // This is called event delegation.
  messagesUl.addEventListener('click', event => {
    const { target } = event;

    if (target.matches('.delete-button')) {
      event.preventDefault();
      const messageId = target.getAttribute('data-id');
      deleteMessage(messageId).then(() => {
        refreshMessages(messagesUl);
      });
    }

    if (target.matches('.flag-button')) {
        event.preventDefault();
        const messageId = target.getAttribute('data-id');
        const flagged = target.getAttribute('data-flagged') === "false";
        updateMessage({ flagged }, messageId).then(() => {
          refreshMessages(messagesUl);
        });
    }

  });
});




