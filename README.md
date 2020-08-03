# eternagame.org

Website frontend for [Eterna](eternagame.org).

Interested in development? Join the discusson on the Eterna Discord!

[![Eterna Discord](https://discord.com/api/guilds/702618517589065758/widget.png?style=banner2)](https://discord.gg/KYeTwux)

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
If you want to contribute, please post a bug report, post a feature report, or work on one of the existing github issues. We also recommend joining our [Discord](https://discord.gg/KYeTwux) to chat with other developers.

Our work happens on the `dev` branch; please pull and submit PRs against that branch. Thanks!
