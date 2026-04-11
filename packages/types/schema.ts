export type KnownSchemaVersion =
  | '2026-04-09T10:12:00Z'

export type SchemaVersion =
  | KnownSchemaVersion
  | 'latest'
  | undefined;

export type SchemaAfter<Schema extends KnownSchemaVersion> =
  Schema extends '2026-04-09T10:12:00Z' ? '2026-04-09T10:12:00Z' : undefined;
