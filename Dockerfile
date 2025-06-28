FROM node:21

WORKDIR /client

RUN apt-get update && apt-get install -y \
  git \
  openssh-client \
  && rm -rf /var/lib/apt/lists/*

COPY package*.json ./


RUN npm install --global expo-cli
RUN npm install --global @expo/ngrok


RUN yarn install


COPY . .

EXPOSE 19000 19001 19002 19006 8081

CMD ["npx", "expo", "start", "--tunnel", "-c"]