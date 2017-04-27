// Write chatr code here!

const messagesUl = document.querySelector('#messages');

function renderMessages (messages) {
  return messages.map(
    function (message) { return `
      <li>
        <p>${message.content}</p>
        <p>
          <strong>#${message.id}</strong>
          <em>${message.createdAt}</em>
          <a data-id="${message.id}" href class="delete">Delete</a>
        </p>
      </li>
      `;
    }
  ).join('');
}

function getMessages () {
  // console.log('Fetching messages...');
  // fetch is a browser API method that's used to make
  // web requests with javascript
  // - it takes a URL as its first argument
  // - it takes an optional second argument that is an
  //   object to configure the request
  //   (e.g. set method, pass params, set headers, etc)
  return fetch('/messages')
    .then(function (res) { return res.json() })
    .then(function (messages) {
      messagesUl.innerHTML = renderMessages(messages);
    });
}

function postMessage (content) {
  // in this example, we pass a config object to fetch
  // we give it the properties method, headers and body:
  // - method: is the http verb that will be used for the request
  // - headers: are the http headers that will be used the request
  //   in this request, we use it to tell the server that we're
  //   sending it json
  // - body: holds the data that we're sending to the server.
  //   If we send the server JSON, we have to stringify our javascript
  //   objects into strings first
  return fetch('/messages', {
    method: 'post',
    headers: { 'content-type':'application/json' },
    body: JSON.stringify({content: content})
  })
}

function updateMessage(id, content) {
  return fetch(
    `/messages/${id}`,
    {
      method: 'patch', // rails prefers 'put'
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({content: content})
    }
  );
}

// Get all messages from server every 1s and render them on
// the page
setInterval(getMessages, 1000);

const newMessageForm = document.querySelector('#new-message');

newMessageForm.addEventListener(
  'submit',
  function (event) {
    event.preventDefault();
    submitFormData(event.currentTarget);
  }
);

function submitFormData (formNode) {
  // calling .querySelector on event.currentTarget will
  // only search descendant nodes of event.currentTarget
  const contentTextarea = formNode.querySelector('textarea');
  // the FormData constructor can be used to quickly
  // gather all input values from a form into one object
  // - it takes a form node as argument
  // the instance of FormData always appears empty in
  // the console. You must use its get method to retrieve a
  // value
  const formData = new FormData(formNode);
  // 👇 formData.get('content') retrieves the value of
  // the input field with the name content
  // console.log('content:', formData.get('content'));
  postMessage(formData.get('content'))
    .then(function () {
      // postMessage returns the fetch request
      // which returns a promise
      // which allows to run code after the
      // request is complete
      contentTextarea.value = '';
    });
}

messagesUl.addEventListener(
  'click',
  function (event) {
    if (event.target.classList.contains('delete')) {
      event.preventDefault();
      const messageId = event.target.getAttribute('data-id');
      fetch(`/messages/${messageId}`, {method: 'delete'})
        .then(function() { getMessages() });
    }
  }
);

newMessageForm.addEventListener(
  'keydown',
  function (event) {
    // key 13 is Enter
    if (event.shiftKey && event.which === 13) {
      submitFormData(event.currentTarget);
    }
  }
);

// In rails, put your code that manipulates the DOM inside...
// $(function () {
// <-- HERE!
// })
//
// document.addEventListener('DOMContentLoaded', function () {
// <--- or HERE!
// })















/* */
