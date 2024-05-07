import {OpenFeature, ProviderEvents} from '@openfeature/server-sdk';
import {LaunchDarklyProvider} from '@launchdarkly/openfeature-node-server';
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
    targetingKey: 'example-user-key', // Remember when using OpenFeature to use `targetingKey` instead of `key`.
    name: 'Sandy'
};

await OpenFeature.setProviderAndWait(new LaunchDarklyProvider(sdkKey));
const client = OpenFeature.getClient();

const getBooleanFlag = async client => {
    client.getBooleanValue(featureFlagKeys.booleanFlag, false, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const booleanFlagValue = await client.getBooleanValue(featureFlagKeys.booleanFlag, false, context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, booleanFlagValue);

    client.getBooleanDetails(featureFlagKeys.booleanFlag, false, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, flagValue));
    const booleanFlagDetails = await client.getBooleanValue(featureFlagKeys.booleanFlag, false, context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.booleanFlag, booleanFlagDetails);
};

const getStringFlag = async client => {
    client.getStringValue(featureFlagKeys.stringFlag, "red", context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const stringFlagValue = await client.getStringValue(featureFlagKeys.stringFlag, "red", context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, stringFlagValue);

    client.getStringDetails(featureFlagKeys.stringFlag, "red", context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, flagValue));
    const stringFlagDetails = await client.getStringValue(featureFlagKeys.stringFlag, "red", context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.stringFlag, stringFlagDetails);
};

const getNumberFlag = async client => {
    client.getNumberValue(featureFlagKeys.numberFlag, 50, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const numberFlagValue = await client.getNumberValue(featureFlagKeys.numberFlag, 50, context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, numberFlagValue);

    client.getNumberDetails(featureFlagKeys.numberFlag, 50, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, flagValue));
    const numberFlagDetails = await client.getNumberValue(featureFlagKeys.numberFlag, 50, context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.numberFlag, numberFlagDetails);
};

const getJsonFlag = async client => {
    client.getObjectValue(featureFlagKeys.jsonFlag, {}, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const jsonFlagValue = await client.getObjectValue(featureFlagKeys.jsonFlag, {}, context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, jsonFlagValue);

    client.getObjectDetails(featureFlagKeys.jsonFlag, {}, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, flagValue));
    const jsonFlagDetails = await client.getObjectValue(featureFlagKeys.jsonFlag, {}, context);
    doSomethingDependingOnFeatureFlagValue(featureFlagKeys.jsonFlag, jsonFlagDetails);
};

const listenToEvents = async client => {
    OpenFeature.addHandler(ProviderEvents.Ready, () => {
        console.log("We're connected to LaunchDarkly through OpenFeature :)")
    })

    /*No equivalent of "failed"*/

    OpenFeature.addHandler(ProviderEvents.Error, error => {
        console.log(`The OpenFeature client for LaunchDarkly has encountered an error. Here are the details: ${JSON.stringify(error)}`)
    })

    OpenFeature.addHandler(ProviderEvents.ConfigurationChanged, async (_eventDetails) => {
        const changedFlag = _eventDetails.flagsChanged[0];
        console.log(`Configuration of flag ${changedFlag} has changed`)
        const flagValues = [];
        flagValues[0] = await client.getBooleanValue(changedFlag, null, context);
        flagValues[1] = await client.getStringValue(changedFlag, null, context);
        flagValues[2] = await client.getNumberValue(changedFlag, null, context);
        flagValues[3] = await client.getObjectValue(changedFlag, null, context);
        const flagValue = flagValues.find(x => x !== null);
        doSomethingDependingOnFeatureFlagValue(changedFlag, flagValue);
    })

    /*No equivalent of "update:key"*/
};

getBooleanFlag(client);
getStringFlag(client);
getNumberFlag(client);
getJsonFlag(client);
listenToEvents(client);
