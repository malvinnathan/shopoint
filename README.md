# info30005_ALGOR
The starter is server.js, It also response to Get/Post request for a url direction and data control.

-> To start the app via heroku, pls go: 
https://info30005algor.herokuapp.com/

-> To start the app in your local pc, pls download git repo:
https://github.com/zhaolind/info30005_ALGOR to your local and then do 'npm install node-modules' -> import the node module folder under the local source file folder, then do ' npm start ' -> will run this app directly.

For Deliverable 3, we have update our front-end with better UI:

And for Database, we've got MongoDB to store our userprofile:
https://cloud.mongodb.com/v2/5eb11e1089863e370e61cd3f#metrics/replicaSet/5eb11efa61dc1745221d04bd/explorer/INFO30005/user/find

here are some initial user can use to login directly:
username: password:
malvinw   malvin12345
Zack	  1234567

About functionalities of our system:

Path : login.ejs (views) -> register.ejs (views) -> server.js -> usermanagementRoutes (router) -> usermanagementController (controller)
    -> registerUser (controller) -> user.js (models)
For user register, you can go '/register' page and get yourself sign up:
Once the user register successfully, you can check mongodb.com (the website above) to find the user detail.
In addition, you can try to register with the same username, and it will render in the console like 'username already registered...'
So in that case, I'd like to inform you that username is unique in this system.

Path : login.ejs (views) -> server.js -> authenticationRoutes (router) -> authenticationController (controller) -> loginSuccess (function)
    -> index.ejs (views)
For user login, you can either use the intial user that we provided or the user that you tried register. Both of functions are used passport to authenticate the user identification. The logic you can refer to sourcecode server.js(authentication is use to prevent user whose not login or registered : V & V)
Once you login to index UI which is main UI, you can logout to suspend your session.

Path : index.ejs (views) -> server.js -> authenticationRouter (router) -> authenticationController (controller) -> updatePassword (function) 
    -> user.js (model)
For password, we used hash key to encrypt the user password to ensure the security of our system:
You can either go mongodb -> colletion -> INFO30005 -> user or the mongodb web provide above to check the password.
Actually password for each user is encrypt in 2 parts: 'salt' and 'hash', thats the encryption tech we reused, you can also check our sourcecode in server.js and changepasswordController.js .
In our system, change password is written to be one of the functions. Please check changepasswordController.js and changepasswordRouter.js .

Path : index.ejs (views) -> server.js -> usermanagementRouter (router) -> usermanagementController (controller) -> updateUser (function) 
    -> user.js (model)
For userprofile edition, we use model user.js to setup a schema and connect data to mongoDB with the DBconnection in db.js:
As a user, you can edit every information except for password and userId in this function.
Once you enter the main UI which is '/index', you can click your user in page right to the top and click 'edit profile'.
After you finished edition, either you can click 'update profile' to update into a database or 'reset' to flush what you edit.
Then you can go back to the main UI with click 'back to the main page'.
Double-check mongoDB that you can confirm the information updated(pls refresh mongo web once you update).

Path : index.ejs (views) -> server.js -> storeRouter (router) -> storeController (controller) -> getStore (function) -> store.js (model)

For the search function, we used model store.js, storeRouter.js, and storeController.js to achieve the backend functionality; stores.ejs and storenotfound.ejs in views, header.ejs and accountheader.ejs in views/partial are used for the frontend.
As a user, you can access the search function either by using the search bar on the header of the home page or store pages. 
Enter the search string and click search. You will be either redirected to the corresponding store page or redirected to the store not found page, depending on the search result.
You can go back to the home page by clicking the logo of our website on the header.

About front-end of our system:

We used the bootstrap framework to set up our website and the flaticon.css to shows different icons. Furthermore, we used Josefin Sans as the website's font and the colour that are suitable for our logo and website.
For the home page, we used simple website preloader by using CSS library that is used to keep visitors entertained while server operations finish processing. We tested and edited it to a more professional and responsive website and kept significant content of the website 'above the fold' and used the slider to make sure the user can see it first after they logged in.
We also used the drop-down menu to includes more content and make the website looks clearer and put other useful information links in the footer. Moreover, we applied similar colour background on other pages and make sure they have fluid grids and flexible visuals when a user resizes the window. Finally, we deleted all of the links that do nothing to decrease the confusion and added an about page to show the user what does our website aimed for and let them understand the purpose of the website.

About testing on our system: 

We've made a few test scripts that might be suitable for our functions. 
To run the test scripts, simply run 'npm test'. 
In this testing, we are mocking user profile retrieved from the database, and we check whether the input meets the requirement. 
The functions that we are testing comes from usermanagementController in which we mock test getUserProfile, updateUser and registerUser. 
Each functionality will have its appropriate testing description and the outcome of it. 
