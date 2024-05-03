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
    console.log(`*** The '${flagKey}' feature flag evaluates to ${JSON.stringify(flagValue)}.`);
};

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

const getBooleanFlag = async ldClient => {
    ldClient.variation(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const booleanFlagValue = await ldClient.variation(featureFlagKeys.booleanFlag, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, booleanFlagValue);

    ldClient.boolVariation(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const booleanFlagValueBV = await ldClient.boolVariation(featureFlagKeys.booleanFlag, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, booleanFlagValueBV);

    ldClient.boolVariationDetail(featureFlagKeys.booleanFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const booleanFlagValueBVD = await ldClient.boolVariationDetail(featureFlagKeys.booleanFlag, context, false);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, booleanFlagValueBVD);
};

const getStringFlag = async ldClient => {
    ldClient.variation(featureFlagKeys.stringFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const stringFlagValue = await ldClient.variation(featureFlagKeys.stringFlag, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, stringFlagValue);

    ldClient.stringVariation(featureFlagKeys.stringFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const stringFlagValueBV = await ldClient.stringVariation(featureFlagKeys.stringFlag, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, stringFlagValueBV);

    ldClient.stringVariationDetail(featureFlagKeys.stringFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const stringFlagValueBVD = await ldClient.stringVariationDetail(featureFlagKeys.stringFlag, context, "red");
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, stringFlagValueBVD);
};

const getNumberFlag = async ldClient => {
    ldClient.variation(featureFlagKeys.numberFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const numberFlagValue = await ldClient.variation(featureFlagKeys.numberFlag, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, numberFlagValue);

    ldClient.numberVariation(featureFlagKeys.numberFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const numberFlagValueBV = await ldClient.numberVariation(featureFlagKeys.numberFlag, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, numberFlagValueBV);

    ldClient.numberVariationDetail(featureFlagKeys.numberFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const numberFlagValueBVD = await ldClient.numberVariationDetail(featureFlagKeys.numberFlag, context, 50);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, numberFlagValueBVD);
};

const getJsonFlag = async ldClient => {
    ldClient.variation(featureFlagKeys.jsonFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const jsonFlagValue = await ldClient.variation(featureFlagKeys.jsonFlag, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, jsonFlagValue);

    ldClient.jsonVariation(featureFlagKeys.jsonFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const jsonFlagValueBV = await ldClient.jsonVariation(featureFlagKeys.jsonFlag, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, jsonFlagValueBV);

    ldClient.jsonVariationDetail(featureFlagKeys.jsonFlag, context, false).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const jsonFlagValueBVD = await ldClient.jsonVariationDetail(featureFlagKeys.jsonFlag, context, {});
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, jsonFlagValueBVD);
};

getBooleanFlag(ldClient);
getStringFlag(ldClient);
getNumberFlag(ldClient);
getJsonFlag(ldClient);


