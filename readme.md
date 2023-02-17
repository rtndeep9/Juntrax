
# Juntrax - Directed Acyclic Graph Problem

An Express API which fetches all possible paths from an node and is displayed in Web using React

With additional functionality of adding, deleting and updating a Node






## Run Locally

Clone the project

```bash
  git clone https://github.com/rtndeep9/Juntrax.git
```

Go to the project directory

#### Front End
```bash
  cd client
```

Install dependencies

```bash
  npm install
```

Start the react app

```bash
  npm run dev
```

#### Back End
```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the Express server

```bash
  node index.js
```


## REST APIs

### 1. Get Paths 

**POST Method**

```http://localhost:3000/paths```

**Request Body**

``` 
{
  "data": {
    "1": [2,3,4,5],
    "2": [6],
    "3": [6,7],
    "4": [7,8],
    "5": [8]
  },
  "startNode": 1
} 
```

### 2. Add Node

**POST Method**

```http://localhost:3000/graph/nodes/```

**Request Body**

``` 
{
    "key": "10",
    "value": [12, 13],
    "dag":{"1":[2,3,4,5],"2":[6],"3":[6,7],"4":[7,8],"5":[8],"10":[12]}
}
```

### 3. Update Node

**PUT Method**

```http://localhost:3000/graph/nodes/:key```

**Request Body**

``` 
{
    "value": [12, 13, 14],
    "dag":{"1":[2,3,4,5],"2":[6],"3":[6,7],"4":[7,8],"5":[8],"10":[12]}
}
```

### 4. Delete Node

**POST Method**

```http://localhost:3000/graph/nodes/delete/:key```

**Request Body**

``` 
{
    "value": [12, 13, 14],
    "dag":{"1":[2,3,4,5],"2":[6],"3":[6,7],"4":[7,8],"5":[8],"10":[12]}
}
```
