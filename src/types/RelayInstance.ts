import type { AbstractRelay, Subscription } from "nostr-tools";

import { NostrEvent } from "@/types";

export type RelayInstance = {
  url: string;
  read: boolean;
  write: boolean;
  instance?: AbstractRelay;
  subscription?: Subscription;
  eventIds: Set<string>;

  connect: (pubkey: string) => void;
  restore: (events: NostrEvent[]) => Promise<void>[];
};
