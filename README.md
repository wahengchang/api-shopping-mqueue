# api-shopping-mqueue
This is an example of implementing a flash sales API server, in lanaguage of Javascfript (Node.js). 

To support the requirement of 5000/s flash sales items , the system is designed for `Single Write, Multiple Read`, to avoid concurrency problems of updating `product quantity` , `user balance` and completing `transation`.

#### Cuurent Purchase Architecture
![image](https://user-images.githubusercontent.com/5538753/135735646-43e9db87-38da-42c6-85ea-0103cea71b28.png)



## Pre- requirement
RabbiyMQ is a required application, 

Install with docker
```
$ docker run -it --rm --name rabbitmq -p 5672: 5672 -p 15672: 15672 rabbitmq: 3-management
```
or Install with brew

```
$ brew install rabbitmq
$ brew services start rabbitmq
```

When you see the screen below and you can start running the repo.
![image](https://user-images.githubusercontent.com/5538753/135735737-aedd2c16-662a-41fd-b6be-d533b24de019.png)
(the MQ web is default running port 15672, and queue channel is running on 5672)

Install 
```
$ yarn 
```


## Run Dev
1） To Confirm Everything is alright
```
$ yarn test
```
![image](https://user-images.githubusercontent.com/5538753/135735782-04a0d283-390a-4992-ab43-16107a029d51.png)
All Test should pass, and you can start playing with the code.

2) Starting MQ Consumer
```
$ npx nodemon  server/lib/mqConsumerProcess.js 
```

3) Starting Dev
```
$ yarn dev
```

## Run Production
Starting MQ Consumer 
```
$ node server/lib/mqConsumerProcess.js 
```

Starting Server
```
$ yarn start
```

## API document
download json file on `./postmanDoc/`, and import it on your postman application.
![image](https://user-images.githubusercontent.com/5538753/135736554-a4900726-0c78-4cdc-a947-6a92cc923725.png)



## To Optimize:
 - JSON validation for both input,output: API / Controller
 - Dynamic number for consumer, Ex, 10 workers for 5000 purchases tasks, / 1 worker for less than 50 purchases tasks.
 - limit, offset for pagination

