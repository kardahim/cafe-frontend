# Project information
The promotion and management system for a café - frontend app.

## Topic
Project created as part of the Engineering Thesis - 'The promotion and management system for a café', realized in the following team:

- Damian Bogusz - implementation of the server application; implementation of authorization, authentication and session mechanics in the web application
https://github.com/damianboguszpl
- Paweł Ciszewski - design and implementation of the web application; co-design of the REST-API endpoints in the server application
https://github.com/kardahim
- Marcin Ferenc - design and implementation of the mobile application
https://github.com/FerencMarcin

## System description
The created system consists of a server based on the Express development framework, a MySQL database, a website based on the React library and a mobile application which uses the Flutter framework. The central point of the system is the server. Preparing a REST API on it has allowed client applications to manage theresources of the shared database. The website's main features are management of the cafe's offers, coupons and special offers, orders, seat reservations and user accounts. Access for users to various features is determined by the permissions level. Employees, managers (administrators), customers and non-logged-in guests have a different range of available service features. The mobile application has been prepared exclusively for customers and is an extension of the features offered by web browsers. Moreover, it includes elements of a loyalty system, in which one can earn points by purchasing at the cafe. Gained points can be later exchanged for coupons. As a result of the project, a system following the project assumptions has been created. The system has been tested and is ready for implementation and compatible use.

# Installation

1. Download repository.
2. Execute *npm install*.
3. Create *.env.production* and *.env.development* files based on *.env.example*
4. Execute *npm start* to start development server. Execute *npm run build* to create *build* folder.

# Assets

## Color schema

The White-Gold Gradient Color Scheme palette has 5 colors which are **Floral White** (#FFFAF1), **Dutch White** (#EDDDB8), **Burlywood** (#DCC080), **Aztec Gold** (#CAA347) and **Dark Goldenrod** (#B8860E).

![color schema](previews/color-schema.png)

This color combination was created by user Manish from [schemacolor.com](https://www.schemecolor.com/white-gold-gradient.php#download). 

## Icons

Icons such as *facebook icon* come from [fontawesome](https://fontawesome.com/search?q=bars&s=solid%2Cbrands) or [material icons](https://mui.com/material-ui/material-icons/).

## Images

All images are from [freepik](https://www.freepik.com/vectors/coffee).
