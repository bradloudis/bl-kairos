# Kairos

## Description

Duration: 2 Week Sprint

When people decide they want to volunteer their time, they don't want to spend time searching for an opportunity to serve.
Instead, they want a simple way to find out the most well suited volunteering opportunities based on their interest, abilities, and age.
Kairos is an application that simplifies the process of managing volunteer opportunities and matches volunteers based on activity type and user preferences.

An organization's volunteer coordinator can add a customizable volunteer event that they are hosting.
They can set things like location, date/time, activity type, and appropriate age range for volunteers to use as filter options.
They can also view the number of volunteers that are signed up to attend

To streamline the volunteering process, a volunteer can browse a complete list of available volunteer activities and can filter the list by cause type, activity type, and suggested age range.

## Preview of Application Pages

![](Kairos.gif)

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)
- [Docker](https://www.docker.com/)
- [AWS S3](https://aws.amazon.com/free/storage/s3/)
  - Will have to set up own account and keys!

## Local Development

When developing locally `docker-compose up` will build all tables and populate them with test data from `init.sql` and `data.sql`

### AWS S3

You will need an Amazon S3 account to store pictures. Go to https://aws.amazon.com/free/storage/s3/ and click the Get Started for Free button. Click the Create a new AWS account button Fill in the registration form Follow directions from this link https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html to set up a bucket. Pay particular attention to select the correct region and to allow public access.

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  AWS_ACCESS_KEY_ID=Will have to get one from AWS account.
  AWS_SECRET_ACCESS_KEY=Will have to get one from AWS account.
  ```

While you're in your new .env file, take the time to replace superDuperSecret with some long random string like 25POUbVtx6RKVNWszd9ERB9Bb6 to keep your application secure. Here's a site that can help you: https://passwordsgenerator.net/. If you don't do this step, create a secret with less than eight characters, or leave it as superDuperSecret, you will get a warning. You will also need to replace the access keys for AWS to access your S3 bucket.
f6f8f8

## Production Build

Before pushing to Heroku `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed towards. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Usage

1.

## Built With

### Front End

- JavaScript
- React
- Redux
- Redux-Saga
- HTML
- Styling:
  - Material-UI
  - CSS

### Back End

- TypeScript
- Node.js
- Express
- PostgreSQL
- Axios

### Third Party

- Docker
- Amazon S3
- Nodemailer
- Heroku
- Luxon

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped us to make this application a reality. Also thanks to the development team: [Joey Heintz](https://github.com/joeheintz45), [Brad Loudis](https://github.com/bradloudis), [Trevor Sansalone](https://github.com/trevorks1), and [Josh Souza](https://github.com/jdjsouza) for their hard work.
