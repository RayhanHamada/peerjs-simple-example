import peer from "peer";

const server = new peer.PeerServer({ port: 3000, allow_discovery: true, });
