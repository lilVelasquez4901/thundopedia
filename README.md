# thundopedia
R1: Users should be able to create, read, update and delete their >own< tanks, while having access to in game tanks.
R2: Field to identify the owner of the record will be identified by the field: engineerName
R3: Roles shall each have their own roles, tankers to create the records, reviewers to submit tanks from approved users, admins to moderate the users and delete tanks with the inaccurate/improper fields
R4: Reviewers can approve tanks
R5: Admins can blacklist users
Tech. Decision: Database
Risk: Difficulty will lay most likely in giving the admins their power to blacklist certain tankers
Backup: Should things go beyond my grasp, my backup plan will be to set approval to be required from Reviewers and Admins and to give Reviewer the ability to update edit any records to give a unique action from tankers and admins

## PART 14
1. The Api's sole purpose is to store both official in-game tanks and user-created tanks in one database acting like a statistics database rather than explicitly being used for an advantage and more of a concept creator.
2. 
3. The api can be downloaded by a fellow creator by just installing the same dependencies I used. Which were: dotenv, mongoose, express, and nodemon with a created script to run a server and localhost.
4. Before you TRY to run this, you will need environmental variables. Those are: PORT, MONGODB_URI and NODE_ENV
5. to run the application, just create a simple script like: npm run dev | running script should be aptly named like "npm run ${name}" and you should route your script to correct place.
6. 
7. The architecture is as follows: Routes > Controllers > Services > Database. The architecture can call down it's true but not up it. Controllers should not be allowed to call from Routes but should be allowed to call from Services. Routes is what links all request to where they need to go to search from a database. Controllers ensures the requests are read and return the desired data than dropping a workload and forcing the user to find it themselves. Services should allow business rules to be read and function, like my filters by records desired properties for my website. And database is where all the data is stored and can be searched from. Everything relies on database but database relies on everything else too. 
8. Lastly, the stage 2 authentication. The Api will not be have to be rebuilt as I can 
