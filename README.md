### Hexlet tests, Code Climate and linter status:
[![Actions Status](https://github.com/Konstantin-Gromakovskiy/frontend-project-11/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Konstantin-Gromakovskiy/frontend-project-11/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a158ff74a20035959363/maintainability)](https://codeclimate.com/github/Konstantin-Gromakovskiy/frontend-project-11/maintainability)


## Rss aggregator
An application for reading and managing RSS feeds. The application is able to update the added sources every 5 seconds and add new posts. The application also provides a preview function, which allows you to view the basic information about the post without leaving the application. The application was written in vanilla JavaScript using additional libraries:
To solve the problem of rapid localization, the [i18next](https://github.com/i18next/i18next) library was used, which allowed us to collect all the application text and hints in one file. The [On-change](https://github.com/sindresorhus/on-change) and [Axios](https://github.com/axios/axios) libraries were used to update and render the application, which made it possible to update the feed asynchronously.

 Just try it: https://rss-reader-cyan.vercel.app