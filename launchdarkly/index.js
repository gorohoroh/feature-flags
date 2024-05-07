import LaunchDarkly from "@launchdarkly/node-server-sdk";
import credentials from "../credentials.json" assert {type: "json"};

const sdkKey = credentials.launchDarkly.sdkKey;
const featureFlags = {
    booleanFlag: {
        key: 'boolean-flag',
        type: 'boolean'
    },
    stringFlag: {
        key: 'string-flag',
        type: 'string'
    },
    numberFlag: {
        key: 'number-flag',
        type: 'number'
    },
    jsonFlag: {
        key: 'json-flag',
        type: 'object'
    }
}

const doSomethingDependingOnFeatureFlagValue = (flagKey, flagValue) => {
    console.log(`*** The '${JSON.stringify(flagKey)}' feature flag evaluates to ${JSON.stringify(flagValue)}.`);
};

const context = {
    kind: 'user',
    key: 'example-user-key',
    name: 'Sandy',
};

const ldClient = LaunchDarkly.init(sdkKey);
await ldClient.waitForInitialization();

const getBooleanFlag = async ldClient => {
    ldClient.variation(featureFlags.booleanFlag.key, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, flagValue));
    const flagValue = await ldClient.variation(featureFlags.booleanFlag.key, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, flagValue);

    ldClient.boolVariation(featureFlags.booleanFlag.key, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, flagValue));
    const booleanFlagValue = await ldClient.boolVariation(featureFlags.booleanFlag.key, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, booleanFlagValue);

    ldClient.boolVariationDetail(featureFlags.booleanFlag.key, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, flagValue));
    const booleanFlagDetails = await ldClient.boolVariationDetail(featureFlags.booleanFlag.key, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, booleanFlagDetails);
};

const getStringFlag = async ldClient => {
    ldClient.variation(featureFlags.stringFlag.key, context, "red").then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, flagValue));
    const flagValue = await ldClient.variation(featureFlags.stringFlag.key, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, flagValue);

    ldClient.stringVariation(featureFlags.stringFlag.key, context, "red").then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, flagValue));
    const stringFlagValue = await ldClient.stringVariation(featureFlags.stringFlag.key, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, stringFlagValue);

    ldClient.stringVariationDetail(featureFlags.stringFlag.key, context, "red").then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, flagValue));
    const stringFlagDetails = await ldClient.stringVariationDetail(featureFlags.stringFlag.key, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, stringFlagDetails);
};

const getNumberFlag = async ldClient => {
    ldClient.variation(featureFlags.numberFlag.key, context, 50).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, flagValue));
    const flagValue = await ldClient.variation(featureFlags.numberFlag.key, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, flagValue);

    ldClient.numberVariation(featureFlags.numberFlag.key, context, 50).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, flagValue));
    const numberFlagValue = await ldClient.numberVariation(featureFlags.numberFlag.key, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, numberFlagValue);

    ldClient.numberVariationDetail(featureFlags.numberFlag.key, context, 50).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, flagValue));
    const numberFlagDetails = await ldClient.numberVariationDetail(featureFlags.numberFlag.key, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, numberFlagDetails);
};

const getJsonFlag = async ldClient => {
    ldClient.variation(featureFlags.jsonFlag.key, context, {}).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, flagValue));
    const flagValue = await ldClient.variation(featureFlags.jsonFlag.key, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, flagValue);

    ldClient.jsonVariation(featureFlags.jsonFlag.key, context, {}).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, flagValue));
    const jsonFlagValue = await ldClient.jsonVariation(featureFlags.jsonFlag.key, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, jsonFlagValue);

    ldClient.jsonVariationDetail(featureFlags.jsonFlag.key, context, {}).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, flagValue));
    const jsonFlagDetails = await ldClient.jsonVariationDetail(featureFlags.jsonFlag.key, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, jsonFlagDetails);
};

const listenToEvents = async ldClient => {
    ldClient.on('ready', () => {
        console.log("We're connected to LaunchDarkly :)")
    });

    ldClient.on('failed', () => {
        console.log("Failed to connect to LaunchDarkly :(")
    });

    ldClient.on('error', error => {
        console.log(`The LaunchDarkly client has encountered an error. Here are the details: ${JSON.stringify(error)}`)
    });

    ldClient.on('update', keyObject => {
        console.log(`Configuration of flag ${keyObject.key} has changed`)
        ldClient.variation(keyObject.key, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(keyObject.key, flagValue))
    });

    ldClient.on(`update:${featureFlags.booleanFlag.key}`, () => {
        console.log(`Configuration of flag ${featureFlags.booleanFlag.key} has changed`)
        ldClient.variation(featureFlags.booleanFlag.key, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, flagValue));
    });
};

getBooleanFlag(ldClient);
getStringFlag(ldClient);
getNumberFlag(ldClient);
getJsonFlag(ldClient);
listenToEvents(ldClient);
