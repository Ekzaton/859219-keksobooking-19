'use strict';

// Константы
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_MIN_Y = 130;
var PIN_MAX_Y = 630;
var PIN_MIN_X = 0;

var CARD_COUNTER = 8;

var CARD_TITLES = [
  'Сдаю комнату недорого',
  'Удобная квартира в новом районе',
  'Вилла с видом на море',
  'Шалаш с всеми удобствами'
];

var CARD_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var CARD_CHECKS = [
  '12:00',
  '13:00',
  '14:00'
];

var CARD_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var CARD_DESCRIPTIONS = [
  'Без животных',
  'Только посуточно',
  'Всё включено'
];

var CARD_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// Элементы DOM
var mapElement = document.querySelector('.map');
var mapPinsElement = document.querySelector('.map__pins');
var mapPinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
var pinMaxXElement = mapPinsElement.offsetWidth;

// Получение случайного целого числа
var getRandomInteger = function (min, max) {
  var randomInteger = min + Math.random() * (max - min + 1);

  return Math.floor(randomInteger);
};

// Получение случайного элемента массива
var getRandomIndex = function (array) {
  var randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

// Получение массива случайных данных для объявлений
var getCardsData = function (counter) {
  var cardsData = [];

  for (var i = 0; i < counter; i++) {
    var cardTemplate = {
      author: {
        avatar: 'img/avatars/user' + 0 + (i + 1) + '.png'
      },
      offer: {
        title: getRandomIndex(CARD_TITLES),
        address: 0,
        price: getRandomInteger(1000, 5000),
        type: getRandomIndex(CARD_TYPES),
        rooms: getRandomInteger(1, 5),
        guests: getRandomInteger(1, 10),
        checkin: getRandomIndex(CARD_CHECKS),
        checkout: getRandomIndex(CARD_CHECKS),
        features: getRandomIndex(CARD_FEATURES),
        description: getRandomIndex(CARD_DESCRIPTIONS),
        photos: getRandomIndex(CARD_PHOTOS)
      },
      location: {
        x: getRandomInteger(PIN_MIN_X, pinMaxXElement),
        y: getRandomInteger(PIN_MIN_Y, PIN_MAX_Y)
      }
    };

    cardTemplate.offer.address = cardTemplate.location.x + ', ' + cardTemplate.location.y;
    cardsData.push(cardTemplate);
  }

  return cardsData;
};

// Получение объявления
var getCardsItem = function (cardsData) {
  var cardsItem = mapPinTemplateElement.cloneNode(true);
  var cardsItemImg = cardsItem.querySelector('img');

  mapElement.classList.remove('map--faded');

  cardsItem.style.left = (cardsData.location.x - PIN_WIDTH / 2) + 'px';
  cardsItem.style.top = (cardsData.location.y - PIN_HEIGHT) + 'px';
  cardsItemImg.src = cardsData.author.avatar;
  cardsItemImg.alt = cardsData.offer.title;

  return cardsItem;
};

// Создание списка объявлений
var createCardsList = function (cardsData) {
  var cardsList = document.createDocumentFragment();

  for (var i = 0; i < cardsData.length; i++) {
    if ('offer' in cardsData[i]) {
      cardsList.appendChild(getCardsItem(cardsData[i]));
    }
  }

  mapPinsElement.appendChild(cardsList);
};

// Вызов
createCardsList(getCardsData(CARD_COUNTER));
