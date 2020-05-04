## Dependencies
To run the application you need to have Docker installed.

## Starting the application
To start the application navigate to the root of the project and type:

```
docker-compose up --build
```

The app will be live on localhost:3000 and you can start testing the API's

If you want to have a look inside the database, navigate to Mongo Express on localhost:8081

## Testing 
You can use the postman collection provided in the attachment. The tokens will have expired by then so you will need to replace them with new ones.

To test admin account use the following credentials:
```
amir.muminovic192@gmail.com
Test123
```

To test the regular account, you can make an account with your email or use the following credentials:
```
amir.muminovic192+1@gmail.com
Test321
```