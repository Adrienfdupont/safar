// ── Shared types & runtime stubs ──

/** A unique identifier (UUID v4) */
export type ID = string;

/** Timestamp as ISO 8601 string */
export type ISODateString = string;

export interface Timestamped {
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface User {
  id: ID;
  email: string;
  name: string;
}

export interface CreateUserDto {
  email: string;
  name: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
}

// ── Runtime stubs so bundlers (esbuild/Vite dev) can resolve imports ──
// These are never instantiated; consumers use the interfaces above as types.

export const User = undefined as unknown as User;
export const CreateUserDto = undefined as unknown as CreateUserDto;
export const UpdateUserDto = undefined as unknown as UpdateUserDto;
