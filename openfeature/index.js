import {OpenFeature, ProviderEvents} from '@openfeature/server-sdk';
import {LaunchDarklyProvider} from '@launchdarkly/openfeature-node-server';
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
    client.getBooleanValue(featureFlags.booleanFlag.key, false, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, flagValue));
    const booleanFlagValue = await client.getBooleanValue(featureFlags.booleanFlag.key, false, context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, booleanFlagValue);

    client.getBooleanDetails(featureFlags.booleanFlag.key, false, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, flagValue));
    const booleanFlagDetails = await client.getBooleanValue(featureFlags.booleanFlag.key, false, context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.booleanFlag.key, booleanFlagDetails);
};

const getStringFlag = async client => {
    client.getStringValue(featureFlags.stringFlag.key, "red", context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, flagValue));
    const stringFlagValue = await client.getStringValue(featureFlags.stringFlag.key, "red", context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, stringFlagValue);

    client.getStringDetails(featureFlags.stringFlag.key, "red", context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, flagValue));
    const stringFlagDetails = await client.getStringValue(featureFlags.stringFlag.key, "red", context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.stringFlag.key, stringFlagDetails);
};

const getNumberFlag = async client => {
    client.getNumberValue(featureFlags.numberFlag.key, 50, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, flagValue));
    const numberFlagValue = await client.getNumberValue(featureFlags.numberFlag.key, 50, context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, numberFlagValue);

    client.getNumberDetails(featureFlags.numberFlag.key, 50, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, flagValue));
    const numberFlagDetails = await client.getNumberValue(featureFlags.numberFlag.key, 50, context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.numberFlag.key, numberFlagDetails);
};

const getJsonFlag = async client => {
    client.getObjectValue(featureFlags.jsonFlag.key, {}, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, flagValue));
    const jsonFlagValue = await client.getObjectValue(featureFlags.jsonFlag.key, {}, context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, jsonFlagValue);

    client.getObjectDetails(featureFlags.jsonFlag.key, {}, context).then(flagValue => doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, flagValue));
    const jsonFlagDetails = await client.getObjectValue(featureFlags.jsonFlag.key, {}, context);
    doSomethingDependingOnFeatureFlagValue(featureFlags.jsonFlag.key, jsonFlagDetails);
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
        const flagType = Object.values(featureFlags).find(x => x.key === changedFlag).type;

        let flagValue;
        if (flagType === "boolean") {
            flagValue = await client.getBooleanValue(changedFlag, false, context);
        } else if (flagType === "string") {
            flagValue = await client.getStringValue(changedFlag, "red", context);
        } else if (flagType === "number") {
            flagValue = await client.getNumberValue(changedFlag, 50, context);
        } else if (flagType === "object") {
            flagValue = await client.getObjectValue(changedFlag, null, context);
        } else {
            console.log('Something went awry: we don\'t know the type of the updated flag')
        }
        doSomethingDependingOnFeatureFlagValue(changedFlag, flagValue);
    })

    /*No equivalent of "update:key"*/
};

getBooleanFlag(client);
getStringFlag(client);
getNumberFlag(client);
getJsonFlag(client);
listenToEvents(client);
