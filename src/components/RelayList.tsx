import React from "react";
import { Stack, StackDivider, Box, Heading, Button, ButtonGroup, Icon } from "@chakra-ui/react";
import {
  MdCheckCircleOutline,
  MdOutlineCancel,
  MdOutlinePending,
  MdOutlineUpload,
} from "react-icons/md";

import type { NostrEvent, RelayInstance } from "@/types";

export default function RelayList({
  events,
  relays,
  pubkey,
  exportToJson,
  restoreEvents,
}: {
  events: Map<string, NostrEvent>;
  relays: Map<string, RelayInstance>;
  pubkey: string | undefined;
  exportToJson: () => void;
  restoreEvents: (relay: RelayInstance) => void;
}) {
  return (
    <>
      <Stack px={6} direction={"row"} justifyContent="space-between">
        <Heading as="h3" size="lg">
          Relays
        </Heading>

        {/* <ButtonGroup variant="outline" spacing="6">
            <Button variant="link" onClick={() => exportToJson()}>
              Download JSON
            </Button>
          </ButtonGroup> */}
      </Stack>

      <Stack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        direction={"column"}
        px={6}
        mb={12}
      >
        {Array.from(relays).map((value, index, map) => {
          const [url, relay] = value;

          return (
            <Stack
              key={`relay-${index}}`}
              direction={"row"}
              spacing={0}
              align={"center"}
              justifyContent="space-between"
              // mb={5}
            >
              <div>{url}</div>
              <Stack direction={"row"} spacing={6}>
                <Box>
                  {pubkey && relay.instance && relay.write && (
                    <Button
                      variant="link"
                      isDisabled={relay.eventIds.size === events.size}
                      // size="sm"
                      onClick={() => restoreEvents(relay)}
                      leftIcon={<Icon as={MdOutlineUpload} />}
                    >
                      Restore Events
                    </Button>
                  )}
                </Box>
                <div>{relay.eventIds.size} Events</div>
                <div>
                  {pubkey ? (
                    relay.instance ? (
                      <Icon as={MdCheckCircleOutline} w={6} h={6} color="green.500" />
                    ) : (
                      <Icon as={MdOutlineCancel} w={6} h={6} color="red.500" />
                    )
                  ) : (
                    <Icon as={MdOutlinePending} w={6} h={6} color="gray.600" />
                  )}
                </div>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
}
