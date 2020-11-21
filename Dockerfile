#Specify a base image
FROM node:alpine

RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

#Specify a working directory
WORKDIR /usr/seed/auth

#Copy the dependencies file
COPY ./package.json ./

#Install dependencies
RUN npm install 

#Copy remaining files
COPY ./ ./

CMD ["echo", "${TEST_VAR}"]

#Default command
CMD ["npm","start"]