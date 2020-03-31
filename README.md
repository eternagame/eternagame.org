# Eterna Refresh

The site rewrite of [Eterna](eternagame.org).

The rewrite is based on the design present [here](https://github.com/eternagame/design).

## Project setup

```
npm install
```

If you want to modify any of the parameters in `.env`, create a file named `.env.local` and include any overrides there

### Workflow Recommendations
[This article](https://alligator.io/vuejs/eslint-vue-vetur/) on setting up linting for VSCode is very helpful

### Run locally

```
npm start
```

## Contributing

Because of the structure of the project, we currently work with [trello](https://trello.com/b/T3nDTm0B/eterna-refresh-site-rewrite) instead of github issues.
If you want to contribute, please join the [Eterna player-development slack](https://join.slack.com/t/eternaplayerdev/shared_invite/enQtODk1Njk0MTQxMDQ2LWFmZjFhNDMwM2NlNjkyMzYxZDNjOTNiNzhhNTY0MDcxNWNlOWE4YjkyZmQzZWY1YmEzZmFlMmU5NWM0MWFjZjM), where we can coordinate working on the project.

## Recommendations

Use [prettier](https://prettier.io/) with this configuration:
Add a `.prettierrc.json` file in the root of the directory with these contents
{
"singleQuote": true,
"trailingComma": "all",
"vueIndentScriptAndStyle": true
}
