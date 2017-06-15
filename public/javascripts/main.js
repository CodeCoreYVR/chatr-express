// Write chatr code here!

function deleteMesssage (id) {
  return fetch(`/messages/${id}`,{
    method: 'DELETE'
  })
}

function postMessage ({content}) {
  const fData = new FormData();
  fData.set('content', content);

  return fetch('/messages', {
    method: 'POST',
    body: fData
  });
}

function postMessageAsJSON (params) {
  return fetch('/messages', {
    // When sending JSON, certain servers will not automatically
    // detect that our request body is in JSON which means that
    // we have to provide the header 'Content-Type' and give the
    // value 'application/json'.
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    // JSON.stringify takes a javascript object and transforms
    // it into a JSON string
    // JSON.parse takes text formatted in JSON and transforms it into a
    // javascript object
    body: JSON.stringify(params)
  });
}

function getMessages () {
  // In its basic form, fetch is a function that
  // takes a URL as its first argument.
  // It returns a promise that resolves with the response object.
  // The body of the response can be further processed with the
  // methods .text(), .html(), .json(), etc to parse it in
  // its respective data format.

  // If the full URL isn't provided, fetch will automatically
  // prefix the URL with the hosting domain whichw ould be
  // http://localhost:3434 in this case.
  return fetch(/*http://localhost:3434*/'/messages')
    .then(response => response.json());
}

function renderMessages (messages) {
  const messagesUl = document.getElementById('messages');
  const messagesHTML = messages.map(message => {
    return `
      <li>
        <p>${message.content}</p>
        <p>
          <strong>${message.id}</strong>
          <a data-id="${message.id}" href class="delete-button">Delete</a>
        </p>
      </li>
    `;
  }).join('');
  messagesUl.innerHTML = messagesHTML;
}
getMessages().then(renderMessages);

// We do a fetch request to the server and rerender the messages
// every second to achieve a "live" chat.
setInterval(() => {
  getMessages().then(renderMessages);
}, 1000);

const newMessageForm = document.getElementById('new-message');
const messagesUl = document.getElementById('messages');

newMessageForm.addEventListener('submit', event => {
  event.preventDefault();
  const { currentTarget } = event;

  fetch('/messages', {
    method: 'POST',
    // When using the FormData constructor, you provide it
    // a form node. Their fields will automatically be populated
    // in FormData by their name attributes.
    body: new FormData(currentTarget)
  })
    .then(() => getMessages().then(renderMessages));
});

messagesUl.addEventListener('click', event => {
  const { target } = event;

  if (target.matches('.delete-button')) {
    event.preventDefault();
    deleteMesssage(target.getAttribute('data-id'))
      .then(() => getMessages().then(renderMessages));
  }
});








/* */
