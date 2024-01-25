FROM wyzengroup/node18-yarn-gulp
USER root

RUN mkdir /workspace

COPY package.json yarn.lock /workspace/
RUN cd /workspace \
    && yarn install --pure-lockfile \
    && npm install typescript \
    && npm install discord.js \
    && npm install @types/mongoose \
    && npm install mongoose \
    && npm install discord-modals \
    && npm install tsc \

COPY . /workspace

CMD ["yarn", "run", "start"]
