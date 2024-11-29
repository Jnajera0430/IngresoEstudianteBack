# Base image
FROM node:18

# PORT=3000
# HOST_FRONT="https://pia.elprogramador.co"
# DB_HOST=db.pia.elprogramador.co
# DB_USER=estudiantesena
# DB_PORT=5432
# DB_NAME=pia
# DB_PASS=S3n450F1@
# REDIS_PORT=6379
# REDIS_HOST=db.pia.elprogramador.co
# REDIS_USER=default
# REDIS_PASS=r3d!s-(P1A)S3CuR3_P@ssw0rd
# CONFIG_KEY_FILES=f1l3K3yP4r4N0rm4l


ARG PORT = 3000
ARG HOST_FRONT = "https://pia.elprogramador.co"
ARG DB_HOST = pia-postgres
ARG DB_USER = estudiantesena
ARG DB_PORT = 5432
ARG DB_NAME = pia
ARG DB_PASS = S3n450F1@
ARG REDIS_PORT = 6379
ARG REDIS_HOST = pia-redis
ARG REDIS_USER = default
ARG REDIS_PASS = r3d!s-(P1A)S3CuR3_P@ssw0rd
ARG CONFIG_KEY_FILES = f1l3K3yP4r4N0rm4l


# Set environment variables
ENV PORT=$PORT={PORT}
ENV HOST_FRONT={HOST_FRONT}
ENV DB_HOST={DB_HOST}
ENV DB_USER={DB_USER}
ENV DB_PORT={DB_PORT}
ENV DB_NAME={DB_NAME}
ENV DB_PASS={DB_PASS}
ENV REDIS_PORT={REDIS_PORT}
ENV REDIS_HOST={REDIS_HOST}
ENV REDIS_USER={REDIS_USER}
ENV REDIS_PASS={REDIS_PASS}
ENV CONFIG_KEY_FILES={CONFIG_KEY_FILES}


# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . /app

# Creates a "dist" folder with the production build
RUN yarn run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]