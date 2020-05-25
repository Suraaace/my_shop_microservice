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

### For POST
##### USer Login (Admin) /api/admin/auth/login
    - For loging in 
    - JSON input
    '''
    {
        "email" : "k.m@domain.com",
        "password" : "kiran" 
    }
    '''
    - JSON response
    '''
    {
        "success": true,
        "message": "Auth token",
        "data": {
            "_id": "5e78c54d79771f735e168589",
            "email": "k.m@domain.com",
            "firstName": "Kiran11",
            "lastName": "Mulmi",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4YzU0ZDc5NzcxZjczNWUxNjg1ODkiLCJpYXQiOjE1OTA0MjM1OTd9.V27q09kUhMRXS0cEsiXLRzapBvXHqE1Y6IqlASSJmZE"
    }
    '''

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
        "phone" : "0123456789"        
    }
    ```
    - JSON response

    ```
    {
        "success": true,
        "message": "User is successfully created",
        "data": {
            "role": 7,
            "_id": "5ecbf58911e85121bc7f4dac",
            "firstName": "Kiran",
            "lastName": "Mulmi",
            "email": "kiranmulmi@gmail.com",
            "password": "$2b$08$a8hXbx/tDBLT9krIJK9KSeX9Pm2cEkQkSs.iU5e.3NbMU7iyS5yqa",
            "phone": "0123456789",
            "createdAt": "2020-05-25T16:42:49.302Z",
            "updatedAt": "2020-05-25T16:42:49.302Z",
            "__v": 0
        }
    }
    ```  
##### Update user /api/admin/user/update/:id
    - for updating user details
    - On the basis of id of user user details is updated
    - JSON input
    '''
    {
        "firstName" : "Kiran123",
        "lastName" : "Mulmi456",
        "email" : "kiranmulmi@gmail.com",
        "password" : "1234asdf",
        "phone" : "0123456789"        
    }
    '''
    - JSON response
    '''
    {
        "success": true,
        "message": "User is successfully updated",
        "data": {
            "_id": "5ecbf58911e85121bc7f4dac",
            "firstName": "Kiran123",
            "lastName": "Mulmi456",
            "email": "kiranmulmi@gmail.com",
            "password": "$2b$08$DPG9ZzUeKs2Wpea0G0ZRY.esqHXzHEuAJDC.s2Hqi3f.v.8Dg5Jwm",
            "phone": "0123456789",
            "createdAt": "2020-05-25T16:42:49.302Z",
            "updatedAt": "2020-05-25T16:44:21.497Z",
            "__v": 0
        }
    }
    '''

##### Add a new Product /api/admin/product/create
    - Adding a new product to the system
    - JSON input
    '''
    {
        "name": "pen",
        "description": "refill",
        "price": "1.50"
    }
    '''
    - JSON response
    '''
    {
        "success": true,
        "message": "Product is created successfully.",
        "data": {
            "isFeatured": 0,
            "isPopular": 0,
            "_id": "5ecbf70311e85121bc7f4dad",
            "name": "pen",
            "description": "refill",
            "price": "1.50",
            "createdAt": "2020-05-25T16:49:07.010Z",
            "updatedAt": "2020-05-25T16:49:07.010Z",
            "__v": 0
        }
    }
    '''

##### Update Product /api/admin/product/update/:id
    - Update the details of the product 
    - JSON input
    '''
    {
        "name": "Fountain Pen",
        "description": "Refile and reuse",
        "price": "1.50"
    }
    '''
    - JSON response
    '''
    {
        "success": true,
        "message": "Product updated.",
        "data": {
            "_id": "5ecbf70311e85121bc7f4dad",
            "name": "Fountain Pen",
            "description": "Refile and reuse",
            "price": "1.50",
            "createdAt": "2020-05-25T16:49:07.010Z",
            "updatedAt": "2020-05-25T16:55:10.317Z",
            "__v": 0
        }
    }
    '''

##### Create Category /api/admin/category/create
    - Creating the product category
    - JSON input
    '''
    {
	    "name" : "abcd"
    }
    '''
    - JSON response
    '''
    {
        "success": true,
        "message": "Category is successfully created",
        "data": {
            "_id": "5ecbf93b11e85121bc7f4dae",
            "name": "abcd",
            "createdAt": "2020-05-25T16:58:35.999Z",
            "updatedAt": "2020-05-25T16:58:35.999Z",
            "__v": 0
        }
    }
    '''

##### Edit Category /api/admin/category/update/:id
    - Update the category name
    - JSON input
    '''
    {
	    "name" : "Kitchenware"
    }
    '''
    - JSON response
    '''
    {
        "success": true,
        "message": "Category Updated",
        "data": {
            "_id": "5ecbf93b11e85121bc7f4dae",
            "name": "Kitchenware",
            "createdAt": "2020-05-25T16:58:35.999Z",
            "updatedAt": "2020-05-25T17:01:59.544Z",
            "__v": 0
        }
    }
    '''

# License
    Copyright ©


