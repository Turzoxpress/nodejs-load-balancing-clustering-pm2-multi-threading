## Improving Node.js Application Performance With Clustering by PM2

When building a production application, you are usually on the lookout for ways to optimize its performance while keeping any possible trade-offs in mind.

An instance of Node.js runs in a single thread which means that on a multi-core system (which most computers are these days), not all cores will be utilized by the app. To take advantage of the other available cores, you can launch a cluster of Node.js processes and distribute the load between them.

Having multiple threads to handle requests improves the throughput (requests/second) of your server as several clients can be served concurrently. We'll see how to create child processes with the Node.js cluster module.

There is a tool that can help manage the process a bit better — the PM2 process manager. PM2 is a Production Process Manager for Node.js applications with a built-in Load Balancer. When properly configured, PM2 will automatically run your app in cluster mode, spawn workers for you, and take care of spawning new workers when a worker dies. PM2 makes it easy to stop, delete, and start processes and it also has some monitoring tools that can help you to monitor and tweak your app's performance.

## To use PM2, first install it globally:

```
sudo npm install pm2 -g
```

## How to start?

We will create a simple NodeJS + Express REST API server.

```
npm init
npm i express
```

## Without PM2 clustering (Single Thread)

Create a new file named **index.js** and replace with the code below:

```
const express = require("express");
const app = express();
const port = 3000;

app.get("/api/sum", (req, res) => {
  const maxValue = 100000000;
  let sum = 0;
  for (let i = 0; i < maxValue; i++) {
    sum = sum + i;
  }
  res.send(`Final sum is : ${sum}`);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

```

Now, we have to start the server with PM2.

```
pm2 start index.js
```

PM2 will start your NodeJS server and it will look like below:

![Mahbubur Rahman Turzo](/screenshots/s1.png?raw=true "Mahbubur Rahman Turzo")

### Here, we created a simple API which will return us total sum of **Zero to maxValue**

## Time to Load Test!

Install a simple npm plugin or package to simulate the load test.

Install globally as root:

```
npm install -g loadtest
```

On Ubuntu or Mac OS X systems install using sudo:

```
sudo npm install -g loadtest
```

Now, open a Terminal and write the command below to start load test of your server:

```
loadtest -n 1000 -c 100 http://localhost:3000/api/sum
```

Here we are creating 1000 hits(Total number of requests) to our server with 100 concurrency (Amount of requests at a time).

![Mahbubur Rahman Turzo](/screenshots/s2.jpg?raw=true "Mahbubur Rahman Turzo")

### Our default server took 225+ seconds to complete all the concurrent hits with a single thread behaviour.

## With PM2 Clustering (Multi Threads)

Now, we have to start the server with PM2.

```
pm2 start index.js -i 0
```

### Here **-i** means we want to start our NodeJS server as multi-threaded cluster mode or clustering mode. The following number (here is 0) will indicate the number of CPU cores we want to use. If you pass 0 then PM2 will automatically occupy all the CPU cores and start your NodeJS server in multi-threaded cluster mode.

PM2 will start your NodeJS server and it will look like below:

![Mahbubur Rahman Turzo](/screenshots/s3.png?raw=true "Mahbubur Rahman Turzo")

Now, open a Terminal and write the command below to start load test of your server:

```
loadtest -n 1000 -c 100 http://localhost:3000/api/sum
```

![Mahbubur Rahman Turzo](/screenshots/s4.png?raw=true "Mahbubur Rahman Turzo")

### **You can see the huge improvement practically!** It took only **38.5** seconds(based on our CPU strength) and **Request per seconds is 26** (previously was only 4).

It also improved the Mean latency!

## So the conclusion is, we can dramatically improve our NodeJS server performance by clustering or load balancing easily! And with PM2, we don't have to manually cluster our NodeJS backend server. PM2 will automatically do this for us and our NodeJS server will run in multi-threaded cluster mode in production level to handle huge concurrent hit by proper load balancing!

For more details, visit [this](https://blog.appsignal.com/2021/02/03/improving-node-application-performance-with-clustering.html) link

# ------ Find Me -------------

- Email : turzoxpress@gmail.com
- Website : www.turzo.org
- Github : www.github.com/Turzoxpress
- LinkedIn: www.linkedin.com/in/turzoxpress
- Portfolio : https://turzoxpress.github.io/portfolio
- Resume : https://turzoxpress.github.io/resume
- Facebook: www.facebook.com/MahbuburRahmanTurzo
