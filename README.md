# my_shop_microservice

## Your API Docs Here

###### This is the API section

# Installation 

## Pre-requisities
    - Node.js
    - Git
    - Postman
    - Code Editor 

# Clone
    - Clone this repo to your local machine usiing (https://github.com/Suraaace/my_shop_microservice.git)

# Setup 
    setup `.env` file copying from `.env-example` then run following command
    ```
    cd my_shop_microservice   
    npm install 
    nodemon 
    ```
    Result after command **nodemon** must be **Database is connected**

# Postman
    Once setup is complete open **Postman**.
    - Create folder with project name [you can write any feasible to you].
    - Create differnt rquest required as per the necessity 
    - Get, Post, Delete 
    This confirms you successfullt setup the respository locally. 
    Else re-run the process. 

### Example of POST
##### Create a new user /api/admin/user/create
    - for createing a new user 
    - additional flag role; default value 7 unless defined
    - JSON input
    ```
    {
        "firstName" : "Kiran",
        "lastName" : "Mulmi",
        "email" : "kiranmulmi@gmail.com",
        "password" : "abcdef",
        "phone" : "1234567890"        
    }
    ```
    - JSON response

    ```
    {
        "_id" : "5e78c54d79771f735e76537",
        "__v" : "0",
        "firstName" : "Kiran",
        "lastName" : "Mulmi", 
        "phone" : "98676987982",
        "email" : "kiranmulmi@gmail.com",
        "password" : "$2b$08$.X1Hf3gZNICMOrYk569DTOjHqo/wlQDyvVjXmtTB3pjQynRQYyim"
        "role" : "7" 
    }
    ```  

# License
    Copyright ©


