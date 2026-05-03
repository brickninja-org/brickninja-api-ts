import type { SchemaAfter, SchemaVersion } from "../schema";

export type Tokeninfo<Schema extends SchemaVersion = undefined> =
  Schema extends undefined ? Tokeninfo<Exclude<SchemaVersion, undefined>> :
  Schema extends SchemaAfter<'2026-05-03T00:00:00Z'> | 'latest' ? Tokeninfo_2026_05_03 :
  TokeninfoBase;

export type Permission = 'account' | 'builds';

interface TokeninfoBase {
  /** The token id */
  id: string

  /** The name of the base API key */
  name: string

  /** List of permissions */
  permissions: Permission[]
}

type Tokeninfo_2026_05_03 = TokeninfoBase & ({
  /** The type of the token */
  type: 'APIKey'
} | {
  /** The type of the token */
  type: 'Subtoken'

  /** Expiration date (ISO8601) of the subtoken. */
  expires_at: string

  /** The issue date (ISO8601) of the subtoken  */
  issued_at: string

  /** The URLs included in this subtoken */
  urls?: string[]
});
