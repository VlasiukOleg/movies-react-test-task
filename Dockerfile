FROM node

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

ENV REACT_APP_API_URL=http://localhost:8000/api/v1

EXPOSE 3000

CMD [ "npm", "start" ]