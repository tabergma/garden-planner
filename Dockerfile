FROM node:20-alpine

WORKDIR /app

COPY server.js .
COPY gartenplaner.html .

# data dir wird beim Start durch den Server angelegt,
# aber wir legen ihn vor als Fallback falls kein Volume gemountet wird
RUN mkdir -p /app/data

EXPOSE 3000

# Healthcheck damit Docker weiß ob der Container wirklich läuft
HEALTHCHECK --interval=15s --timeout=5s --start-period=5s \
  CMD wget -qO- http://localhost:3000/ > /dev/null || exit 1

CMD ["node", "server.js"]
