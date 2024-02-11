import React from "react";
import {
  Stack,
  SimpleGrid,
  Box,
  Heading,
  Button,
  ButtonGroup,
  StackDivider,
  Icon,
} from "@chakra-ui/react";
import {
  MdCheckCircleOutline,
  MdOutlineCancel,
  MdOutlinePending,
  MdOutlineUpload,
} from "react-icons/md";

import { countBy } from "lodash";

import type { NostrEvent, RelayInstance } from "@/types";

export enum Kind {
  Metadata = 0,
  TextNote = 1,
  RecommendServer = 2,
  ContactList = 3,
  DirectMessage = 4,
  Deletion = 5,
  Repost = 6,
  Reaction = 7,
  BadgeAward = 8,
}

export default function SyncStats({
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
  const kindStats = countBy(Array.from(events.values()), "kind");
  return (
    <>
      <Stack spacing={4} align="stretch" direction={"column"} px={6}>
        <Stack direction={"row"} justifyContent="space-between">
          <Heading as="h2" size="lg">
            {events.size} Events
          </Heading>

          <ButtonGroup variant="outline" spacing="6">
            <Button variant="link" onClick={() => exportToJson()}>
              Download JSON
            </Button>
          </ButtonGroup>
        </Stack>

        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={12}>
          <Stack divider={<StackDivider borderColor="gray.500" />}>
            {Object.keys(kindStats).map((kind) => (
              <Stack key={`Kind-${kind}`} direction={"row"} justifyContent="space-between">
                <div>{Kind[parseInt(kind)] || `kind ${kind}`}</div>
                <div>{kindStats[kind]}</div>
              </Stack>
            ))}
          </Stack>
        </SimpleGrid>
      </Stack>
    </>
  );
}
