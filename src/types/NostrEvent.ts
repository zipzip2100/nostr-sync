export type NostrEvent = {
  id: string;
  kind: number;
  content: string;
  tags: string[][];
  pubkey: string;
  sig: string;
  created_at: number;
};
