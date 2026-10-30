# thundopedia STAGE 0
R1: Users should be able to create, read, update and delete their >own< tanks, while having access to in game tanks.
R2: Field to identify the owner of the record will be identified by the field: engineerName
R3: Roles shall each have their own roles, tankers to create the records, reviewers to submit tanks from approved users, admins to moderate the users and delete tanks with the inaccurate/improper fields
R4: Reviewers can approve tanks
R5: Admins can blacklist users
Tech. Decision: Database
Risk: Difficulty will lay most likely in giving the admins their power to blacklist certain tankers
Backup: Should things go beyond my grasp, my backup plan will be to set approval to be required from Reviewers and Admins and to give Reviewer the ability to update edit any records to give a unique action from tankers and admins

## PART 14 STAGE 1
1. The Api's sole purpose is to store both official in-game tanks and user-created tanks in one database acting like a statistics database rather than explicitly being used for an advantage and more of a concept creator.
2. 
3. The api can be downloaded by a fellow creator by just installing the same dependencies I used. Which were: dotenv, mongoose, express, and nodemon with a created script to run a server and localhost.
4. Before you TRY to run this, you will need environmental variables. Those are: PORT, MONGODB_URI and NODE_ENV
5. to run the application, just create a simple script like: npm run dev | running script should be aptly named like "npm run ${name}" and you should route your script to correct place.
6. 
7. The architecture is as follows: Routes > Controllers > Services > Database. The architecture can call down it's true but not up it. Controllers should not be allowed to call from Routes but should be allowed to call from Services. Routes is what links all request to where they need to go to search from a database. Controllers ensures the requests are read and return the desired data than dropping a workload and forcing the user to find it themselves. Services should allow business rules to be read and function, like my filters by records desired properties for my website. And database is where all the data is stored and can be searched from. Everything relies on database but database relies on everything else too. 
8. Lastly, the stage 2 authentication. The Api will not be have to be rebuilt most likely, a user database would not share the same one with the tanks. While they would be connected, they would likely be separated somewhere safer where a unique property can be placed onto their users to differentiate them.
## STAGE 2
1. You must now also add the dependencies jsonwebtoken, bcryptjs. 
2. Additionally, you need an environmental variable for the Port and the user tokens.
3. To start up the server, have a script to call the node project manager and a run with a name. for example: npm run server.
4. All current endpoints as of now should be: /health, /tanks/:id, /tanks, /tanks/isCar/:isCar, and /tanks/creator/:creator.
5. Currently, filter supports crew_number, rank, nation and make.
## STAGE 2 Reflection
1. A password should not appear in a response due to the salt rounds we used to encrypt it. However, for the reason it does not appear is because of the line within the user.model.js which is "select:false" which stops the field from loading. The salt rounds encrypt the password itself so it is not stored plainly (originating from bcrypt) and the check only runs on a save as to not rehash a hashed password and lock out the user. Furthermore, the toJSON edits should also naturally deter the query from loading the password again. These two should prevent the careless use of req.user from leaking the hash of a user and saving the creator a lawsuit.
2. We have capped our database limit to 100 records per page as to keep our responses to a request a predictable size. We do not want to uncap our responses if our database ever reaches the size of 500000 records... Additionally, it lowers the load size and data use time as to make responses timely and predictable. The problem would be noticeable by universally everybody, but the api user would notice much more faster. As, the API is mostly what people come to it for and if it's slow for everyone, it'll be practically unusuable.
3. For Stage 3, keeping people from editing other's records will likely need a fuction to check the logged in user and compare it to the owner of the record. If the two match, then the edit is authorized and passed. If it is not, then we return a unauthorized and reject the request. This change will likely have to go in the controller itself as routes is not meant to handle a function and the controller is what is actively doing the request handling. Though, likely you will also have to account with how to edit a null creator's record, should an error or a former user have made it.