export const homePagePath = '/';

export const accountPagePath = `${homePagePath}account`;
export const loginPath = `${accountPagePath}/login`;
export const registerPath = `${accountPagePath}/register`;

export const roomsDashboardPath = `${homePagePath}rooms`;
export const createRoomPagePath = `${roomsDashboardPath}/create`;
export const joinRoomPagePath = `${roomsDashboardPath}/join`;
export const roomPath = (code: string) => `${roomsDashboardPath}/${code}`;

export const gamePath = (code: string) => `${homePagePath}game/${code}`;
