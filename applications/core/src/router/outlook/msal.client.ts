import * as msal from '@azure/msal-node';

const config = {
  auth: {
    clientId: process.env.MS_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
    clientSecret: process.env.MS_CLIENT_SECRET,
  },
};

const msalClient = new msal.ConfidentialClientApplication(config);

export default msalClient;
