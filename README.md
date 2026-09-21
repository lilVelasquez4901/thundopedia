# thundopedia
R1: Users should be able to create, read, update and delete their >own< tanks, while having access to in game tanks.
R2: Field to identify the owner of the record will be identified by the field: engineerName
R3: Roles shall each have their own roles, tankers to create the records, reviewers to submit tanks from approved users, admins to moderate the users and delete tanks with the inaccurate/improper fields
R4: Reviewers can approve tanks
R5: Admins can blacklist users
Tech. Decision: Database
Risk: Difficulty will lay most likely in giving the admins their power to blacklist certain tankers
Backup: Should things go beyond my grasp, my backup plan will be to set approval to be required from Reviewers and Admins and to give Reviewer the ability to update edit any records to give a unique action from tankers and admins