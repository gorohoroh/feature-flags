import LaunchDarkly from "@launchdarkly/node-server-sdk";
import credentials from "../credentials.json" assert {type: "json"};

const sdkKey = credentials.launchDarkly.sdkKey;
const featureFlagKeys = {
    booleanFlag: 'boolean-flag',
    stringFlag: 'string-flag',
    numberFlag: 'number-flag',
    jsonFlag: 'json-flag'
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
    ldClient.variation(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const flagValue = await ldClient.variation(featureFlagKeys.booleanFlag, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue);

    ldClient.boolVariation(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const booleanFlagValue = await ldClient.boolVariation(featureFlagKeys.booleanFlag, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, booleanFlagValue);

    ldClient.boolVariationDetail(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const booleanFlagDetails = await ldClient.boolVariationDetail(featureFlagKeys.booleanFlag, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, booleanFlagDetails);
};

const getStringFlag = async ldClient => {
    ldClient.variation(featureFlagKeys.stringFlag, context, "red").then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const flagValue = await ldClient.variation(featureFlagKeys.stringFlag, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue);

    ldClient.stringVariation(featureFlagKeys.stringFlag, context, "red").then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const stringFlagValue = await ldClient.stringVariation(featureFlagKeys.stringFlag, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, stringFlagValue);

    ldClient.stringVariationDetail(featureFlagKeys.stringFlag, context, "red").then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const stringFlagDetails = await ldClient.stringVariationDetail(featureFlagKeys.stringFlag, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, stringFlagDetails);
};

const getNumberFlag = async ldClient => {
    ldClient.variation(featureFlagKeys.numberFlag, context, 50).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const flagValue = await ldClient.variation(featureFlagKeys.numberFlag, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue);

    ldClient.numberVariation(featureFlagKeys.numberFlag, context, 50).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const numberFlagValue = await ldClient.numberVariation(featureFlagKeys.numberFlag, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, numberFlagValue);

    ldClient.numberVariationDetail(featureFlagKeys.numberFlag, context, 50).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const numberFlagDetails = await ldClient.numberVariationDetail(featureFlagKeys.numberFlag, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, numberFlagDetails);
};

const getJsonFlag = async ldClient => {
    ldClient.variation(featureFlagKeys.jsonFlag, context, {}).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const flagValue = await ldClient.variation(featureFlagKeys.jsonFlag, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue);

    ldClient.jsonVariation(featureFlagKeys.jsonFlag, context, {}).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const jsonFlagValue = await ldClient.jsonVariation(featureFlagKeys.jsonFlag, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, jsonFlagValue);

    ldClient.jsonVariationDetail(featureFlagKeys.jsonFlag, context, {}).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const jsonFlagDetails = await ldClient.jsonVariationDetail(featureFlagKeys.jsonFlag, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, jsonFlagDetails);
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

    ldClient.on(`update:${featureFlagKeys.booleanFlag}`, () => {
        console.log(`Configuration of flag ${featureFlagKeys.booleanFlag} has changed`)
        ldClient.variation(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    });

};

getBooleanFlag(ldClient);
getStringFlag(ldClient);
getNumberFlag(ldClient);
getJsonFlag(ldClient);
listenToEvents(ldClient);
