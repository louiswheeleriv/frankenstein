-- Database: "Frankenstein"

/* Drop tables */
DROP TABLE IF EXISTS Performance CASCADE;
DROP TABLE IF EXISTS PerfCrew CASCADE;
DROP TABLE IF EXISTS PerfActor CASCADE;
DROP TABLE IF EXISTS Production;
DROP TABLE IF EXISTS Stage;
DROP TABLE IF EXISTS Actor;
DROP TABLE IF EXISTS Crew;


/* Create Production table to hold the data about the production */

CREATE TABLE Production

(
	ProductionID    serial primary key,
	Name 						varchar(50),
	Info						text
);

/*read from csv file*/
\COPY Production(Name,Info) from 'production.csv' DELIMITERS ',' CSV;





/* Create Stage table to hold the data about the stages */

CREATE TABLE Stage

(
	StageID			    serial primary key,
	Location				varchar(50),
	Description			text
);

/*read from csv file*/
\COPY Stage(Location,Description) from 'stage.csv' DELIMITERS ',' CSV;





/* Create Actor table to hold the data about the actors */  

CREATE TABLE Actor

(
	ActorID		serial primary key,
	Name			varchar(50),
	Bio				text
);

/*read from csv file*/
\COPY Actor(Name,Bio) from 'actor.csv' DELIMITERS ',' CSV ;






/* Create Crew table to hold the data about the crew */

CREATE TABLE Crew

(
	CrewID					serial primary key,
	Name						varchar(50),
	Responsiblities	varchar(50),
	Bio							text
);

/*read from csv file*/
\COPY Crew(Name,Responsiblities,Bio) from 'crew.csv' DELIMITERS ',' CSV ;







/* Create Performance table to hold the data about the performances */

CREATE TABLE Performance

(
	PerformanceID		serial primary key,
	Info						text,
	StageID					INT references Stage(StageID),
	StartTime				time,
	ProductionID    INT references Production(ProductionID)
);

/*read from csv file*/
\COPY Performance(Info,StageID,StartTime,ProductionID) from 'performance.csv' DELIMITERS ',' CSV ;



/* Create PerfCrew table to hold the data about the crew and which performance they are in */

CREATE TABLE PerfCrew

(
	PerformanceID		INT references Performance(PerformanceID),
	CrewID 	INT references Crew(CrewID)
);

/*read from csv file*/
\COPY PerfCrew from 'perfcrew.csv' DELIMITERS ',' CSV;



/* Create PerfActor table to hold the data about the actors and which performance they are in */

CREATE TABLE PerfActor

(
	PerformanceID		INT references Performance(PerformanceID),
	ActorID 				INT references Actor(ActorID),
	AppearanceTime 	time
);

/*read from csv file*/
\COPY PerfActor(PerformanceID,ActorID,AppearanceTime) from 'perfactor.csv' DELIMITERS ',' CSV ;
