import LaunchDarkly from "@launchdarkly/node-server-sdk";
import credentials from "../credentials.json" assert {type: "json"};

const sdkKey = credentials.launchDarkly.sdkKey;
const featureFlagKeys = {
    booleanFlag: 'boolean-flag',
    stringFlag: 'string-flag',
    numberFlag: 'number-flag',
    jsonFlag: 'json-flag'
}

function showBanner() {
    console.log(
        `        ██
          ██
      ████████
         ███████
██ LAUNCHDARKLY █
         ███████
      ████████
          ██
        ██
`,
    );
}

const doSomethingDependingOnFeatureFlagValue = (flagKey, flagValue) => {
    console.log(`*** The '${flagKey}' feature flag evaluates to ${flagValue}.`);
    if (flagValue) showBanner();
};

// Set up the context properties. This context should appear on your LaunchDarkly contexts dashboard
// soon after you run the demo.
const context = {
    kind: 'user',
    key: 'example-user-key',
    name: 'Sandy',
};

const ldClient = LaunchDarkly.init(sdkKey);
await ldClient.waitForInitialization();

ldClient.on(`update:${featureFlagKeys.booleanFlag}`, () => {
    ldClient.variation(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
});

ldClient.variation(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
