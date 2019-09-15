import Vue from 'vue';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';

export default function InitGlobalComponents() {
  const requireComponent = require.context(
  // The relative path of the components folder
    './Global',
    // Whether or not to look in subfolders
    true,
    // The regular expression used to match base component filenames
    /[A-Z]\w+\.(vue|ts|tsx)$/,
  );

  requireComponent.keys().forEach((fileName) => {
  // Get component config
    const componentConfig = requireComponent(fileName);
    // Get PascalCase name of component
    const componentName = upperFirst(
      camelCase(
      fileName
        .split('/')
        .pop()!
        .replace(/\.\w+$/, ''),
      ),
    );

    // Register component globally
    Vue.component(
      componentName,
      // Look for the component options on `.default`, which will
      // exist if the component was exported with `export default`,
      // otherwise fall back to module's root.
      componentConfig.default || componentConfig,
    );
  });
}
