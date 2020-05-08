# Eterna Refresh

The site rewrite of [Eterna](eternagame.org).

The rewrite is based on the design present [here](https://github.com/eternagame/design).

## Project setup

```
npm install
```

If you want to modify any of the parameters in `.env`, create a file named `.env.local` and include any overrides there

> If you're running this on Windows and run into 'binary not found' errors, you need to install Windows Build Tools: https://github.com/nodejs/node-gyp#option-1

### Run locally

```
npm run serve
```

For now, please add `VUE_APP_ENV="client"` into your `.env.local` file.

### Recommended dev tools

- VS Code: Free code editor with good support for Vue and Typescript
- Prettier: Automatic code formatter
  - After installing the VS Code extension, configure autoformat on save:
    Add `"editor.formatOnSave": true,` to your .vscode/settings.json

## Contributing

Because of the structure of the project, we currently work with [Clubhouse](https://app.clubhouse.io/vital-mind-media/stories/space/441/everything) instead of github issues.
If you want to contribute, please join the [Eterna player-development slack](https://join.slack.com/t/eternaplayerdev/shared_invite/enQtODk1Njk0MTQxMDQ2LWFmZjFhNDMwM2NlNjkyMzYxZDNjOTNiNzhhNTY0MDcxNWNlOWE4YjkyZmQzZWY1YmEzZmFlMmU5NWM0MWFjZjM), where we can coordinate working on the project.
