Само решение задачи с leetcode расположено в папке backend под названием regularExpressionMatching.js

- Unit тесты + баг репорты для решения задачи с leetcode лежат в папке backend/tests/unit-tests

- Интеграционные тесты для api бэкенда лежат в папке backend/tests/api-tests
- Интеграционные тесты для фронтенда (redux, api) лежат в папке frontend/src/tests/integration-tests

- e2e тесты лежат в папке frontend/src/tests/e2e-tests
- ui тесты лежат в папке frontend/src/tests/ui-tests

Как запустить бэкенд часть?

    1. Перейти в папку backend:
        cd backend
    2. Установить модули:
        npm i
    3. Запустить сервер на порту 5000 командой:
        npm start
    4. Чтобы запустить тесты (unit и интеграционные), прописать команду:
        npm run test

Как запустить фронтенд часть?

    1. Перейти в папку frontend:
        cd frontend
    2. Установить модули:
        npm i
    3. Запустить сервер на порту 3000 командой:
        npm start
    4. Чтобы запустить тесты (интеграционные и ui), прописать команду:
        npm run test
    4. Чтобы запустить тесты (e2e), прописать команду:
        npm run test:e2e
