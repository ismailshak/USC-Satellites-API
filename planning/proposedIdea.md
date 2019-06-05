# USC Satellites

I am going to build an API that stores information about all satellites in orbit (as of April 1st 2019). 

### Model design

I broke down the data set in to three distinct entities I would want to model. The decision was based on how a user would want to query for specific data. Based on that, decisions revolved around: it would be interesting to search for specific satellites and get a list of its properties, search for a specific contractor and get a list of all the satellites it operates and more, and lastly query by specific countries and get a list of all satellites and operators it has.

![model diagram](https://github.com/ismailshak/USC-Satellites-API/blob/master/planning/models.jpeg "Model Diagram")

### Entity-Relationship Diagram

I designed my relationships with the original data set in mind. Since I will be seeding my database based on the original data set, I had to be careful with how I design relationships between entities.

A satellite, in the data set, can have more than one country associated with it. In some cases, the country is listed as "Multinational". In multinational cases, I will have an entry, in the Country collection, with it's name property set to Multinational. Then querying by multinational would pull up a list of satellites that are associated to more than 2 countries. In cases where satellite is linked to only two countries, I am going to have to duplicate the satellite's reference and put it into its respective Country collection. The reason for this is that, in the original data set, where a satellite is linked to only two countries, the listing is represented as Country1/Country2. This would be simple enough to sort the database appropriately.

Since a single contractor can have more than one satellite, and a satellite is linked to only one contractor, the relationship between them is as depicted. Satellite can have one-and-only-one contractor. A contractor can have one-or-many satellites.

Countries are associated with contractors differently than they are associated with satellites. If a country wants to launch a satellite, it has to go through a contractor, and that contractor naturally is based in a country as well. They don't necessarily have to match.

![ERD diagram](https://github.com/ismailshak/USC-Satellites-API/blob/master/planning/ERD.jpeg "ERD Diagram")