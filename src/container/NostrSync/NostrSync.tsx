import React from "react";
import { Stack, StackDivider, Box, Heading, Button, ButtonGroup, useToast } from "@chakra-ui/react";
import { nip19 } from "nostr-tools";

import { NostrRelayInstance } from "@/utils/NostrRelay";
import type { RelayInstance, NostrEvent } from "@/types";
import NostrForm from "@/components/NostrForm";
import RelayList from "@/components/RelayList";
import SyncStats from "@/components/SyncStats";

import { getRelayList } from "@/utils/nostrUtils";

const relaysRaw = getRelayList();

export default function NostrSync() {
  const [pubkey, _setPubkey] = React.useState<string>();
  const [events, setEvents] = React.useState<Map<string, NostrEvent>>(new Map());
  const [relays, setRelays] = React.useState<Map<string, RelayInstance>>(new Map());

  const toast = useToast();

  const addRelay = React.useCallback((relay: RelayInstance) => {
    setRelays((prev) => {
      const copy = new Map(prev);
      copy.set(relay.url, relay);
      return copy;
    });
  }, []);

  const addEvent = React.useCallback((event: NostrEvent) => {
    setEvents((prevEvents) => {
      const copy = new Map(prevEvents);
      copy.set(event.id, event);
      return copy;
    });
  }, []);

  const restoreEvents = React.useCallback(
    async (relay: RelayInstance) => {
      try {
        await relay.restore(Array.from(events.values()));
        if (pubkey) {
          await relay.connect(pubkey);
        }
      } catch (e) {
        console.error(e);
        toast({
          title: `Restore failed for ${relay.url}`,
          description: `Message ${e}`,
          status: "error",
          position: "bottom-left",
          duration: 3000,
          isClosable: true,
        });
      }
    },
    [events, pubkey, toast]
  );

  const registerRelays = async (pubkey: string) => {
    for (const [url, relay] of Array.from(relays)) {
      await relay.connect(pubkey);
    }
  };

  const setPubkey = (pubkey: string) => {
    let pk = "";
    if (pubkey.startsWith("npub")) {
      const pubkeyDecode = nip19.decode(pubkey) as any;
      pk = pubkeyDecode.data;
      _setPubkey(pk);
    } else {
      pk = pubkey;
    }
    _setPubkey(pk);
    registerRelays(pk);
  };

  const scan = async ({ pubkey }: { pubkey: string }) => {
    setPubkey(pubkey);
  };

  React.useEffect(() => {
    async function registerRelays() {
      for (const relay of relaysRaw) {
        const instance = new NostrRelayInstance(relay, addEvent, addRelay);
        addRelay(instance);
      }
    }
    registerRelays();
  }, [addEvent, addRelay]);

  const exportToJson = () => {
    const exports: any[] = [];
    events.forEach((e) => {
      exports.push({
        id: e.id,
        kind: e.kind,
        content: e.content,
        tags: e.tags,
        pubkey: e.pubkey,
        sig: e.sig,
        created_at: e.created_at,
      });
    });
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(exports)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${pubkey}_${Date.now()}.json`;

    link.click();
  };

  return (
    <>
      <Stack spacing={12} align="stretch" direction={"column"} px={6}>
        <NostrForm
          onSubmit={async (data) => {
            await scan(data);
          }}
        />

        <SyncStats
          events={events}
          relays={relays}
          pubkey={pubkey}
          exportToJson={exportToJson}
          restoreEvents={restoreEvents}
        />

        <RelayList
          events={events}
          relays={relays}
          pubkey={pubkey}
          exportToJson={exportToJson}
          restoreEvents={restoreEvents}
        />
      </Stack>
    </>
  );
}
