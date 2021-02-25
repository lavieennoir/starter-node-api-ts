import os from 'os';

import { env } from '@utils/env';

const IP_V4_FAMILY = 'IPv4';
const LOCALHOST_ADDRESS = '127.0.0.1';

const getProtocol = () => `http${env.useHttps ? 's' : ''}://`;

const buildHostUrl = (ipAddress: string) =>
  `${getProtocol()}${ipAddress}:${env.port}`;

export const getLocalIpAddress = () => buildHostUrl(LOCALHOST_ADDRESS);

export const getLocalNetworkIpAddress = () => {
  const networkInterfaces = os.networkInterfaces();

  const getInternalIPv4Addresses = (data?: Array<os.NetworkInterfaceInfo>) => {
    const result = data?.find(details => details.family === IP_V4_FAMILY && !details.internal
    );

    return result ? buildHostUrl(result.address) : undefined;
  };

  const netAddresses = Object.entries(networkInterfaces).map(
    ([, data]) => getInternalIPv4Addresses(data),
    []
  );

  return netAddresses.find(address => address);
};
