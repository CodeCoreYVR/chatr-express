'use strict';
const {Message} = require('../models');


module.exports = {
  up: function (queryInterface, Sequelize) {
    const messages = [
      `What is it that you want, exactly?`,
      `Peace. Prosperity. A land where the powerful do not prey on the powerless.`,
      `Where the castles are made of gingerbread and the moats are filled with blackberry wine. The powerful have always preyed on the powerless; that’s how they became powerful in the first place.`,
      `Perhaps. And perhaps we’ve grown so used to horror we assume there’s no other way.`
    ].map(content => Message.create({content}));

    return Promise.all(messages);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
