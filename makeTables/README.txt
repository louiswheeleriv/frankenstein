To recreate the tables (drop if they exist then create) write this into the terminal in tomcat:

psql macharir -f makeTables.sql


To show all the tables in postresql (to make our lives easier):

psql macharir -f showables.sql