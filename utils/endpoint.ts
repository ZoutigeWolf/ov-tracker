const URL = __DEV__
    ? "http://zoutige-mac.wolf-banana.ts.net:8000/api"
    : "https://ov.zoutigewolf.dev/api";

const endpoint = (endpoint: string) => URL + endpoint;

export default endpoint;
