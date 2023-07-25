# movies-react-test-task

    Інструкція для запуску програми Movies App

1.	Завантажте образ програми командою - docker pull ikslprint/movies

2.	Запустити контейнер docker run --name movies -p 3000:80 -e REACT_APP_API_URL=http://localhost:8000/api/v1 ikslprint/movies

3.	Запустити команду npm install для встановлення всіх залежностей

4.	Для запуску додатку виконайте команду npm start
