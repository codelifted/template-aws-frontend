# template-aws-frontend

# Introduction

This is template for building your app. It has AWS cognito authentication method with sample page in app. No extra packages, components, apis. This template has been targeted for users who just need aesthetic and MUI from project.

# Getting Started

Installation process
   - run 'npm install / yarn'
   - start dev server run 'npm run start / yarn start'

# Connect AWS Cognito

For making the app work with AWS Cognito, you need to provide the configuration in the config.ts file. You can find the values in the AWS Cognito dashboard.

# Folder Structure

react-template
..
├── public
├── src
│   ├── assets
│   │   ├── images
│   ├── components -> common components used across a theme
│   ├── contexts -> State context for Login management
│   ├── data -> Static data
│   ├── hooks -> Custom hooks
│   ├── layout
│   │   ├── CommonLayout -> Layout for login and components showcase
│   │   ├── MainLayout -> Layout for dashboard
│   ├── pages -> View files for all pages
│   ├── routes -> different routes based on layouts
│   ├── sections -> This contains different sections used only for pages
│   ├── themes -> Contains application style and theme
│   │   ├── overrides -> MUI overrides for each component
│   │   ├── theme -> different theme preset
│   │   ├── ... -> Other theme-related setups
│   ├── utils
│   │   ├── locales -> different locale JSON files
│   │   ├── route-guard -> Auth guard to prevent unexpected navigations
│   ├── App.js
│   ├── config.js -> different theme config and AWS cognito config
│   ├── index.js
├── .eslint.rc
├── .prettierrc
├── jsconfig.json
├── package.json -> Package json file.
├── README.md
├── yarn.lock -> yarn lock file.
