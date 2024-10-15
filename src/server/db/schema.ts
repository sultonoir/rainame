import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").notNull(),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
    twoFactorEnabled: boolean("twoFactorEnabled"),
    role: text("role"),
    banned: boolean("banned"),
    banReason: text("banReason"),
    banExpires: integer("banExpires"),
  },
  (table) => ({
    emailIdx: index("user_email_idx").on(table.email),
    nameIdx: index("user_name_idx").on(table.name),
    createdAtIdx: index("user_created_at_idx").on(table.createdAt),
    roleIdx: index("user_role_idx").on(table.role),
  }),
);

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
    impersonatedBy: text("impersonatedBy").references(() => user.id),
  },
  (table) => ({
    userIdIdx: index("session_user_id_idx").on(table.userId),
    expiresAtIdx: index("session_expires_at_idx").on(table.expiresAt),
  }),
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    expiresAt: timestamp("expiresAt"),
    password: text("password"),
  },
  (table) => ({
    userIdIdx: index("account_user_id_idx").on(table.userId),
    providerIdIdx: index("account_provider_id_idx").on(table.providerId),
    accountIdIdx: index("account_account_id_idx").on(table.accountId),
  }),
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
  },
  (table) => ({
    identifierIdx: index("verification_identifier_idx").on(table.identifier),
    expiresAtIdx: index("verification_expires_at_idx").on(table.expiresAt),
  }),
);

export const twoFactor = pgTable(
  "twoFactor",
  {
    id: text("id").primaryKey(),
    secret: text("secret").notNull(),
    backupCodes: text("backupCodes").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
  },
  (table) => ({
    userIdIdx: index("two_factor_user_id_idx").on(table.userId),
  }),
);

export const passkey = pgTable(
  "passkey",
  {
    id: text("id").primaryKey(),
    name: text("name"),
    publicKey: text("publicKey").notNull(),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
    webauthnUserID: text("webauthnUserID").notNull(),
    counter: integer("counter").notNull(),
    deviceType: text("deviceType").notNull(),
    backedUp: boolean("backedUp").notNull(),
    transports: text("transports"),
    createdAt: timestamp("createdAt"),
  },
  (table) => ({
    userIdIdx: index("passkey_user_id_idx").on(table.userId),
    webauthnUserIDIdx: index("passkey_webauthn_user_id_idx").on(
      table.webauthnUserID,
    ),
    createdAtIdx: index("passkey_created_at_idx").on(table.createdAt),
  }),
);

// relations

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session),
  accounts: many(account),
  twoFactor: one(twoFactor),
  passkeys: many(passkey),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
  impersonatedBy: one(user, {
    fields: [session.impersonatedBy],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const twoFactorRelations = relations(twoFactor, ({ one }) => ({
  user: one(user, {
    fields: [twoFactor.userId],
    references: [user.id],
  }),
}));

export const passkeyRelations = relations(passkey, ({ one }) => ({
  user: one(user, {
    fields: [passkey.userId],
    references: [user.id],
  }),
}));
