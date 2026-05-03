export type KnownSchemaVersion =
  | '2026-05-03T00:00:00Z'

export type SchemaVersion =
  | KnownSchemaVersion
  | 'latest'
  | undefined;

export type SchemaAfter<Schema extends KnownSchemaVersion> =
  Schema extends '2026-05-03T00:00:00Z' ? '2026-05-03T00:00:00Z' : undefined;
