"use client";
import React from "react";
import { useFormik } from "formik";
import { Stack, FormControl, Input, Button } from "@chakra-ui/react";

export default function NostrForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const formik = useFormik({
    initialValues: {
      pk: "",
    },
    onSubmit: async (values) => {
      await onSubmit({ pubkey: values.pk });
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={4} direction={"row"}>
          <Input
            id="pk"
            name="pk"
            placeholder="nostr public key"
            onChange={formik.handleChange}
            value={formik.values.pk}
          />
          <Button type="submit">Scan</Button>
        </Stack>
      </form>
    </>
  );
}
