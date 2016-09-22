# sso

REST API project is created to test various `rsa` encryption `npm` packages to find out which one works better for us.

### Running project

You need to have installed Node.js.

### Install dependencies

To install dependencies enter project folder and run following command:
```
npm install
```
### Run server

To run server:
```
node api
```

### Make Requests

Following `api` calls can be made to get results using various `npm` packages:
(look in the source code to see which packages are being used to each `api` call)
```
curl -i http://locahost:8085/sso
curl -i http://locahost:8085/sso2
curl -i http://locahost:8085/sso3
curl -i http://locahost:8085/sso4
```

## Maintainers

  + Karnan S. (netheady@thambu.ca)
