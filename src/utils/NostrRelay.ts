// import "websocket-polyfill";
import { Relay, AbstractRelay, Subscription, nip19 } from "nostr-tools";

import type { RelayInstance, NostrEvent } from "@/types";

export class NostrRelayInstance implements RelayInstance {
  private _eventIds: Set<string>;
  private _url: string;
  private _read: boolean;
  private _write: boolean;
  private _instance: AbstractRelay | undefined;
  private _subscription: Subscription | undefined;
  public _addEvent: (event: NostrEvent) => void;
  public _addRelay: (relay: RelayInstance) => void;

  constructor(
    data: any,
    addEvent: (event: NostrEvent) => void,
    addRelay: (relay: RelayInstance) => void
  ) {
    this._url = data.url;
    this._read = data.read;
    this._write = data.write;
    this._eventIds = new Set<string>();
    this._addEvent = addEvent;
    this._addRelay = addRelay;
  }

  public get instance() {
    return this._instance;
  }

  public get read() {
    return this._read;
  }

  public get write() {
    return this._write;
  }

  public get url() {
    return this._url;
  }

  public get eventIds() {
    return this._eventIds;
  }

  connect(pubkey: string) {
    return Relay.connect(this._url)
      .then((instance) => {
        // console.log(`connected to ${this.url}`);
        this._instance = instance;

        const filters = [
          {
            // kinds: [0],
            authors: [pubkey],
          },
        ];

        this._subscription = this._instance.subscribe(filters, {});

        this._subscription.onevent = (event) => {
          // console.log(`onevent ${this.url} event ${event.id}`);
          this._eventIds.add(event.id);
          this._addEvent(event);
        };
        this._subscription.oneose = () => {
          this.close();
        };

        this._addRelay(this);
      })
      .catch((err) => {
        console.error(`ERROR: connected to ${this._url}`);
        console.error(err);
      });
  }

  restore(events: NostrEvent[]) {
    const promises: Promise<void>[] = [];
    if (!this._instance || !this._write) {
      return promises;
    }

    events.forEach((event) => {
      if (this._eventIds.has(event.id) || !this._instance) {
        return;
      }

      if (!this._instance.connected) {
        throw new Error("instance not connected");
      }

      const sync = this._instance.publish(event).then((res) => {
        console.log(`published event ${event.id} to ${this._url}`);
        this._eventIds.add(event.id);
      });

      promises.push(sync);
    });

    return promises;
  }

  close() {
    if (!this._instance) return;
    this._subscription?.close();
    // console.log(`close connection to ${this._instance.url}`);
  }
}
