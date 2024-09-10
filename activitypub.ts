export interface Actor {
  id: string;
  "@context": string;
  type: string;
  preferredUsername: string;
  inbox: string;
  outbox: string;
  followers: string;
  following: string;
  publicKey: {
    id: string;
    owner: string;
    publicKeyPem: string;
  };
  displayName: string;
}

export function createActor(username: string, domain: string, displayName: string): Actor {
  const actorId = `https://${domain}/users/${username}`;
  return {
    "@context": "https://www.w3.org/ns/activitystreams",
    id: actorId,
    type: "Person",
    preferredUsername: username,
    inbox: `${actorId}/inbox`,
    outbox: `${actorId}/outbox`,
    followers: `${actorId}/followers`,
    following: `${actorId}/following`,
    publicKey: {
      id: `${actorId}#main-key`,
      owner: actorId,
      publicKeyPem: "YOUR_PUBLIC_KEY_PEM" // Replace with the actual public key
    },
    displayName: displayName
  };
}
