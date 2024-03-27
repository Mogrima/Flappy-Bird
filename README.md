# Flappy Bird
<img src="https://img.shields.io/badge/JavaScript-004524?style=for-the-badge&logo=javascript&logoColor=yellow" alt="JavaScript"> <img src="https://img.shields.io/badge/Canvas-6495ed?style=for-the-badge&logo=html5&logoColor=#E34F26" alt="Canvas">
<img src="https://img.shields.io/badge/HTML5-004524?style=for-the-badge&logo=html5&logoColor=#E34F26" alt="HTML5">
<img src="https://img.shields.io/badge/CSS3-004524?style=for-the-badge&logo=css3&logoColor=#E34F26" alt="css3">

## About

Интерпретация Flappy Bird, полностью отзывчивая и играбельная на любом устройстве (мобильный телефон, планшет, большие экраны).

В мобильной игре реализовано три основных элемента: полноэкранный режим, сенсорное управление, управление мышью и с клавиатуры.

Другие особенности:
- условие победы: бег на время
- проигрыш: столкновение с шестеренкой
- ресурс игрока: перезаряжаемая энергия
- специальная способность: повышение скорости

## Story
Механической рыбе-птице нужно преодолеть все препятствия в виде шестеренок, пролетая над ними или проскальзывая под ними. Если случится столкновение, шестеренка взорвется, а птица разлетится на запчасти.

## Demo
![Изображение][1]

## Obstacles
Препятствия в виде шестеренок перемещаются вверх-вниз, мешая механической рыбе-птице преодолеть путь.

![Изображение][2]

## Control
1. Движение вверх: щелчок мыши, касание сенсорному экрану, клавиши <b>Enter</b> или <b>Space</b>.
2. Получить ускорение: свайп вправо, клавиши <b>Shift</b> и <b>C</b>.
3. Начать игру/перезапустить игру: <b>R</b> на клавиаутуре, кнопка <b>R</b> на экране.
4. Перейти в полноэкранный режим: <b>F</b> на клавиатуре, кнопка <b>F</b> на экране.

![Изображение][3]

## How to play
1. Открыть игру в браузере можно по [ссылке](https://mogrima.github.io/Flappy-Bird/)
2. Или скачать архив с игрой из репозитория. Для того, чтобы запустить игру локально:
  * Убедиться, что на ПК установлена node.js
  * Открыть консоль в корне проекта и набрать команду:
  ```node server.js ```
  * Если страница браузера не откроется автоматически, это можно сделать самостоятельно, просто указав в адресной строке: ```http://127.0.0.1:8125/```

## Acknowledgments
Lessons and support:

<img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">

Sounds:

<img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">
<img src="https://img.shields.io/badge/Eric the Funny Baron -ffd700?style=for-the-badge&logo=itchdotio&logoColor=#FA5C5C" alt="Eric the Funny Baron ">

Sprites and background:

<img src="https://img.shields.io/badge/Franks laboratory -ffd700?style=for-the-badge&logo=youtube&logoColor=#FF0000" alt="Franks laboratory ">

Fonts

<img src="https://img.shields.io/badge/Bungee -ffd700?style=for-the-badge&logo=googlefonts&logoColor=#4285F4" alt="Bungee ">

## License

Unlicense

[1]:Assets/Preview/Screenshot.png
[2]:Assets/Preview/smallGears.png
[3]:Assets/Preview/player_fish.png
