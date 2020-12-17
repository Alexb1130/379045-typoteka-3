'use strict';

const fs = require(`fs`);
const {generateRandomInt, getRandomElementArr, getRandomDate, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../const`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;

const TITLES = [
  `Ёлки.История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок - музыканты 20 - века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const ANNOUNCES = [
  `Ёлки — это не просто красивое дерево.Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего.Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка.Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно.Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно.Просто действуйте.Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок - музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания.Он обязательно понравится геймерам со стажем.`,
  `Рок - музыка всегда ассоциировалась с протестами.Так ли это на самом деле ?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать ? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи.Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года.Мощные гитарные рифы и скоростные соло - партии не дадут заскучать.`,
];

const CREATED_DATES = TITLES.map(() => getRandomDate(new Date(2020, 9, 1), new Date()));

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const generatePosts = (count) => {
  return Array(count).fill({}).map(() => ({
    title: getRandomElementArr(TITLES),
    createdDate: getRandomElementArr(CREATED_DATES),
    announce: shuffle(ANNOUNCES).slice(generateRandomInt(0, 5)).join(` `),
    fullText: shuffle(ANNOUNCES).slice(generateRandomInt(0, ANNOUNCES.length - 1)).join(` `),
    сategory: shuffle(CATEGORIES).slice(generateRandomInt(0, CATEGORIES.length - 1))
  }));
};

const writeData = (fileName, data) => {

  const content = JSON.stringify(data);

  fs.writeFile(fileName, content, (err) => {
    if (err) {
      return console.error(`Can't write data to file...`);
    }

    return console.info(`Operation success. File created.`);
  });
};

module.exports = {
  name: `--generate`,
  run(args = []) {
    const [count] = args;
    const counter = parseInt(count, 10) || DEFAULT_COUNT;

    if (counter > MAX_COUNT) {
      console.error(`Не больше 1000 публикаций`);
      process.exit(ExitCode.error);
    }

    const content = generatePosts(counter);

    writeData(FILE_NAME, content);
  }
};