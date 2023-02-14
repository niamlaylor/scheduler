# Interview Scheduler

Your trusty companion for booking interviews!

Start using the app: https://liam-scheduler.netlify.app/

## Stack

- Frontend: React
- Backend: Express
- Database: PostgreSQL - hosted on Railway
- Testing: Storybook, Jest and Cypress

![Interview Scheduler Home Screen](https://raw.githubusercontent.com/niamlaylor/scheduler/master/docs/home-screen.png "Creating a new appointment in Interview Scheduler")

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Visual Testbed

1. Clone the scheduler-api repo: https://github.com/lighthouse-labs/scheduler-api 

2. Run API server in test mode:
```
npm run test:server
```
3. Send a GET request to reset the DB:
```sh
curl http://localhost:8001/api/debug/reset
```
4. Run Cypress:
```sh
npm run cypress
```

## API endpoints
- Appointments: https://scheduler-api-production-e37e.up.railway.app/api/appointments
- Days: https://scheduler-api-production-e37e.up.railway.app/api/days
- Interviewers: https://scheduler-api-production-e37e.up.railway.app/api/interviewers