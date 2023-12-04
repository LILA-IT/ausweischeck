# AusweisCheck 🇩🇪 (EU-ID Card Check)

![NPM](https://img.shields.io/npm/l/ausweischeck)
![NPM](https://img.shields.io/npm/v/ausweischeck)
![GitHub Workflow Status](https://github.com/LILA-IT/ausweischeck/actions/workflows/ausweischeck.yml/badge.svg?branch=main)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Quality Gate Status](https://sonarqube.lila.systems/api/project_badges/measure?project=AusweisCheck&metric=alert_status&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=AusweisCheck)
[![Maintainability Rating](https://sonarqube.lila.systems/api/project_badges/measure?project=AusweisCheck&metric=sqale_rating&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=AusweisCheck)
[![Security](https://sonarqube.lila.systems/api/project_badges/measure?project=AusweisCheck&metric=security_rating&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=AusweisCheck)
[![Bugs](https://sonarqube.lila.systems/api/project_badges/measure?project=AusweisCheck&metric=bugs&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=AusweisCheck)
[![Coverage](https://sonarqube.lila.systems/api/project_badges/measure?project=AusweisCheck&metric=coverage&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=AusweisCheck)
[![Duplicated Lines (%)](https://sonarqube.lila.systems/api/project_badges/measure?project=AusweisCheck&metric=duplicated_lines_density&token=sqb_17d32d830cafc47fc0ea2968734531f12e89e870)](https://sonarqube.lila.systems/dashboard?id=AusweisCheck)

## ✨ Features

Just plain typescript lib to check the validity of German ID card and passport numbers with the help of the serial number.
Special thanks to [Deniz Celebi (@derDeno)](https://github.com/derDeno) for the [original implementation](https://github.com/derDeno/AusweisCheck).

## 🔧 Installation

```sh
npm install ausweischeck
yarn add ausweischeck
```

## 🎬 Getting started

```ts
import { checkPerso, checkReisepass } from "ausweischeck";

const persoResult = checkPerso("L01X00T471");
const reisepassResult = checkReisepass("C01X00T478D", "en");
```

## 📜 API

### `checkPerso(idNumber: string, language?: "de" | "en"): AusweisCheckResult`

This method checks for the validity of a German Personalausweis (ID card) number.
The language parameter is optional and defaults to "de". The language parameter is only used for the error message.

**Example:**

```ts
const persoResult = checkPerso("L01X00T471");

console.log(persoResult);
// {
//   result: true,
//   ausweis: {
//     number: "L01X00T47",
//     type: "EU ID",
//   },
// }
```

### `checkEuId(idNumber: string): AusweisCheckResult`

This method duplicates the checkPerso method. It defaults to the English error message.
It's only there for usability reasons.

### `checkReisepass(idNumber: string, language?: "de" | "en"): AusweisCheckResult`

This method checks for the validity of a German Reisepass (passport) number.
The language parameter is optional and defaults to "de". The language parameter is only used for the error message.

**Example:**

```ts
const reisepassResult = checkReisepass("C01X00T478D");

console.log(reisepassResult);
// {
//   result: true,
//   ausweis: {
//     number: "C01X00T478",
//     type: "Passport",
//   },
// }
```

### `checkGermanPassport(idNumber: string): AusweisCheckResult`

This method duplicates the checkReisepass method. It defaults to the English error message.
It's only there for usability reasons.

## 🥂 License

[MIT](./LICENSE.md)
