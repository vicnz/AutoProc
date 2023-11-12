# AutoProc

Automatic Procurement Management System <span style="color: orange;font-weight: bold;">BETA</span>

## System Requirements

Some of the Required List of Utilies required to run AutoProc

-   **Windows 10** or **Windows 11**
-   **MySQL** version 8 or above
-   **Node.js** and **NPM** Node.js for the Runtime and Package Manager version 18 or above

> NOTE: For **MYSQL** you must create a dedicated _connection_ user for the database ex: `autoproc-su-admin`,

> <span style="color: orangered;font-weight: bold;">NOTICE!</span> It is recommended /or (required) to always add a secured **password** for the default user which is **root** to prevent unauthorized changes to the database.

---

> Deploying to a **Docker** container is still in the planning phase but once it's incrementally adopted some of the requirements above will be stripped out since docker handles most of these by default.

## Running App

If the requirements above are all satisfied then you can run the app

```bash
# Install NodeJs Packages
npm run install

# Initiale Data From Prisma Schema
npx prisma push

# Build App
npm run build

# then
npm run start
```

## SSL Configuration

The `SSL` Configuration is still a heavily tested section of the App and required the need to purchase and SSL.

> For Local Area Network Testing...

```bash
# Install Make Cert This is for Development
choco mkcert

mkcert localhost #can add other custom hostname
```

## Setting Up Environments

When Deploying the App for Production, these Environments must exists in the App Context

```bash
# DATABASE URI
DATABASE_URL=mysql://username:password@hostname:3306/autoproc_db

# JWT SECRET USED FOR GENERATING HASHES
JWT_SECRET=alphanumericrandomstring
# AUTHENTICATION SECRET
NEXTAUTH_SECRET=alphanumericstring

# NEXTAUTH_URL_INTERNAL=https://192.168.0.0:3000 -> WHEN URL IS AN UNMASKED HOSTNAME

# NEXTAUTH_URL=http://localhost:3000/ -> SET THIS WHEN IN DEPLOYMENT

# PASSWORD_SECRET
BCRYPT_SECRET=alphanumericstring

# LOGGER (OPTIONAL)
LOG_ERROR=./error.log # ERROR SPECIFIC
LOG_DEFAULT=./app.log # ERROR HISTORY TRACKING
```

> To Generate A Random String Key You Can Execute ...

```bash
$ openssl rand -base64 32
```

## Logger File

Set Up the Logger File, in Development this file is in `.gitignore` to prevent sharing app logs to Github.

```bash
touch app.log
```

## App Settings

There are two types of settings, the setting exposed by `settings` in **database** schema. and a `settings.app.json` in the **server** `./settings.app.json`. The Settings Structure is still in Development but it is required to add the file to accomodate for the incoming settings feature.

```bash
touch ./app.settings.json
```
