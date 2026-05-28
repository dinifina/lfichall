## Getting started

To start the frontend server, run these steps:

```
cd frontend
npm start
```

Next, start the backend server, return to root and run:

```
cd backend
npm start
```

Now, you may start experimenting with the lab!

## Solution

1. Intercept requests with Burp Suite
2. Notice that there is a /GET request with a file parameter
3. Change the file parameter to ../flag.txt
4. Profit
