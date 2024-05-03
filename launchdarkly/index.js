import LaunchDarkly from "@launchdarkly/node-server-sdk";
import credentials from "../credentials.json" assert {type: "json"};

const sdkKey = credentials.launchDarkly.sdkKey;
const featureFlagKey = 'test';

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

const printValueAndBanner = flagValue => {
    console.log(`*** The '${featureFlagKey}' feature flag evaluates to ${flagValue}.`);
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

const eventKey = `update:${featureFlagKey}`;
ldClient.on(eventKey, () => {
    ldClient.variation(featureFlagKey, context, false).then(printValueAndBanner);
});

ldClient.variation(featureFlagKey, context, false).then(flagValue => printValueAndBanner(flagValue));
