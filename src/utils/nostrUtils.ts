export function getRelayList() {
  return [
    process.env.NODE_ENV === "development" && {
      url: "ws://localhost:8080",
      read: true,
      write: true,
    },
    { url: "wss://relay.damus.io", read: true, write: true },
    { url: "wss://nostr.oxtr.dev", read: true, write: true },
    { url: "wss://nostr.fmt.wiz.biz", read: true, write: true },
    { url: "wss://relayable.org", read: true, write: false },
  ].filter((e) => e);
}
