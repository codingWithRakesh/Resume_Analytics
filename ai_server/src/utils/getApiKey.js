let getIndex = 0;
const apiArray = [{key: process.env.GOOGLE_API_KEY_1, countUse: 0},{key: process.env.GOOGLE_API_KEY_2, countUse: 0}];
const getApiKey = () => {
    const apiKey = apiArray[getIndex].key;
    apiArray[getIndex].countUse += 1;
    getIndex = (getIndex + 1) % apiArray.length;
    console.log("API Key used:", apiKey, "Count:", apiArray[getIndex].countUse, "Next Index:", getIndex);
    return apiKey;
}
export default getApiKey;