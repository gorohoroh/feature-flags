import {OpenFeature, ProviderEvents} from '@openfeature/server-sdk';
import {LaunchDarklyProvider} from '@launchdarkly/openfeature-node-server';
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
    targetingKey: 'example-user-key', // Remember when using OpenFeature to use `targetingKey` instead of `key`.
    name: 'Sandy'
};

await OpenFeature.setProviderAndWait(new LaunchDarklyProvider(sdkKey));
const client = OpenFeature.getClient();

OpenFeature.addHandler(ProviderEvents.Ready, async (_eventDetails) => {
    const flagValue = await client.getBooleanValue(featureFlagKey, false, context);
    printValueAndBanner(flagValue);
});

OpenFeature.addHandler(ProviderEvents.ConfigurationChanged, async (_eventDetails) => {
    const flagValue = await client.getBooleanValue(featureFlagKey, false, context);
    printValueAndBanner(flagValue);
})
