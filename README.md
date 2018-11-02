# Lens Wallet prototype

Use this codebase to create a new Lens Wallet for a token on API Miner.

## Prerequisites

### Git

You'll need Git installed on your computer. See the Git page for instructions:

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

### GitHub Authentication

You must be connected to GitHub using SSH. 

If you're not already authenticated, see GitHub help:

https://help.github.com/articles/connecting-to-github-with-ssh/

More specifically, you'll need to:

- Generate a new SSH Key
- Add it to your computers ssh-agent
- Add the key to your GitHub account

### Node.js

Node.js 8+ is needed, recommended Node.js 10. See:

https://nodejs.org/en/download/package-manager/

### API Miner account and token contract

You'll need an auth token for an API Miner account, as well as the contract ID
for a deployed token contract.

## Setup

All commands (except step 1) should be run under the `lens-wallet-prototype`
directory, unless otherwise noted.

### 1. Clone or download this repository

If cloning, use:

```
git clone git@github.com:novoa-media/lens-wallet-prototype.git
```

This will clone the codebase to `lens-wallet-prototype` under your current
working directory.

If downloading, just extract the zip package onto your computer.

### 2. Run `npm install`

Run:

```
npm install
```

If you get permission errors, make sure GitHub Authentication is setup
correctly.

### 3. Run the init command

Run:

```
./cli init
```

The command will ask you a series of questions to configure the app:

1. App ID - this should be all lowercase letters and dashes, no spaces. It's used
to identify the app. For example: `mywallet`.
2. Select API Miner environment. This should match the environment your desired
token contract is on.
3. API Miner auth token - the API key/token for the user account on API Miner.

Lastly, you'll be asked to either create a new token contract, or enter the ID
of an existing one.

The command will configure the app and initialize the database, after which
you're good to go.

### 4. Create user

In order to actually log in to the app, you'll need to create a user
account. To create an account, run:

```
npx lens user <email>
```

Replacing `<email>` with an account email address. It will ask you for a
password.

### 5. Send tokens to user

Finally, to get tokens for the new account, use the lens command again:

```
npx lens send <email> <amount>
```

This will send tokens from the default account of the app user to the address
associated with the given email.

### 6. Version control (optional)

After setup, it's recommended to clear the current Git config (if it exists)
by removing the .git folder, and initializing Git again for this new wallet.

Instructions for using Git are outside the scope of this README, but you could
look at GitHub's resources:

https://try.github.io/

## Setup tl;dr

```
git clone git@github.com:novoa-media/lens-wallet-prototype.git
cd lens-wallet-prototype
npm install
./cli init
npx lens user <email>
```

## Development

### Building assets

Both CSS and JavaScript are built from source code, and thus any changes you
make will not be immediately visible on the website.

While developing, run the following command in another terminal:

```
npm run watch
```

As long as it's running, it will rebuild all assets when it detects changes,
making it easier for development.

To build the assets for production, use the build command instead:

```
npm run build
```

### Running the server

You can run the server using:

```
npm run dev
```

This will start the server in development mode, which means it restarts when
it detects changes in the source files.

### CSS

The stylesheets are written using Sass with the SCSS syntax. SCSS is fully
compatible with CSS, so you can just write regular CSS. However, if you'd like
to take advantage of the features of Sass, read about it here:

https://sass-lang.com/guide

The stylesheets are located under `public-src/css`, and for the most part
you'll be editing `styles.scss`.

You'll also probably want to edit `variables.scss`, which contains variable
overrides for [Materialize](https://materializecss.com/). To see all the
variables used by Materialize that you can override, open the file
`node_modules/am-lens-wallet/frontend/css/components/_variables.scss`.

The two most important variables are `$primary-color` and `$secondary-color`.
Materialize uses these two to give color to components, such as buttons,
form fields, etc.

The remaining specific colors are all in `styles.scss`. You can also add
any other CSS changes there, as `styles.scss` is loaded last and will override
everything else.

**Note**, don't forget that you need to rebuild the assets for any CSS changes
to apply, as described in [Building Assets](#building-assets).

### JavaScript

Most of the JavaScript is in the `am-lens-wallet` module, and not directly
editable. You can have additional JavaScript in `public-src/js/custom.js`.

JavaScript is written in ES2015, and transformed to browser-compatible code 
using [Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/).
This means you can use promises, async/await etc, if you want to.

The one thing that's not optional is the use of ES modules, described here:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

This means that simply adding a JavaScript file to the js directory and then
including it in HTML is not correct.

`custom.js` already has imports for `jquery` and `materialize-css` to get
you started, so you can use this with `$` and `M` respectively.

#### Adding a library

To add a JavaScript library, there are two steps needed. I'm going to use
`lodash` as an example.

First, install the library locally using NPM. In this example, that would mean
running:

```
npm install --save lodash
``` 

Secondly, import `lodash` to the JavaScript file where you need it. At the top
of the file:

```javascript
import _ from 'lodash';
```

Then inside that file, you can use `_` as you'd expect with `lodash`.

### Templates

Templates are all written using [Handlebars](https://handlebarsjs.com/).

There are two templates in the codebase under the `views/partials` directory.
One is so you can change the logo image in the header, and the other is the
list of test accounts for the Send Tokens screen.

You can also override any of the base templates by copying it from
`node_modules/am-lens-wallet/views` to the equivalent location in the base
`views` directory. For example, to make changes to the main layout, copy
`node_modules/am-lens-wallet/views/layouts/main.hbs` to 
`views/layouts/main.hbs`, and make the necessary changes. The ones under the
root `views` folder take priority.
