// Write chatr code here!

// Shortcut methods for using comming DOM selection methods
function q (cssQuery) {
  return document.querySelector(cssQuery);
}

function qs (cssQuery) {
  return document.querySelectorAll(cssQuery);
}

// Methods for making web requests to our server
function getMessages () {
  return fetch(`/messages`).then(res => res.json());
}

function postMessage (formData) {
  if (!(formData instanceof FormData) && typeof formData === 'object') {
    const {username, flagged, content} = formData;
    const newFormData = new FormData();
    if (username) newFormData.set('username', username);
    if (flagged) newFormData.set('flagged', flagged);
    if (content) newFormData.set('content', content);
    return postMessage(newFormData);
  }

  return fetch(
    `/messages`,
    { method: 'POST', body: formData }
  );
}

function deleteMessage (id) {
  return fetch(`/messages/${id}`, { method: 'DELETE' });
}

function renderMessages (messages = []) {
  return messages
    .map(message => `
      <li>
        <p>
          <strong>#${message.id}</strong>
          ${message.content}
        </p>
        <a data-id="${message.id}" class="delete-button" href>Delete</a>
      </li>
    ` )
    .join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const messagesUl = q('#messages');
  const messageForm = q('#new-message');

  function refreshMessages () {
    getMessages()
    // .then(messages => renderMessages(messages))
    .then(renderMessages)
    .then(messagesHTML => messagesUl.innerHTML = messagesHTML);
  }

  refreshMessages();
  setInterval(refreshMessages, 1000);

  messageForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const fData = new FormData(form);

    postMessage(fData)
      .then(() => {
        refreshMessages();
        form.reset();
      });
  });

  messagesUl.addEventListener('click', event => {
    const {target} = event;
    if (target.matches('.delete-button')) {
      event.preventDefault();
      const id = target.getAttribute('data-id');
      deleteMessage(id).then(refreshMessages);
    }
  });
})

// Exercise: Chat-Battle

// Post -> Create
const fData = new FormData();
fData.set('body', 'Steve');

fetch(`/messages`, {
  method: 'POST', body: fData
})

fetch(`/messages`, {
  headers: { 'Content-Type': 'application/json'},
  method: 'POST',
  body: JSON.stringify({body: 'Steve'})
})

// List all messages
fetch('/messages').then(res => res.json()).then(console.table)

// Update a message
fData = new FormData();
fData.set('body', 'No shenanigans!');

fetch(`/messages/68272`, {
  method: 'PATCH', body: fData
})

// Delete a message
fetch('/messages/68277', {method: 'DELETE'})



//
