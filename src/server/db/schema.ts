import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  real,
  smallint,
  boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 10);

export const createTable = pgTableCreator((name) => `rainame_${name}`);

export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    role: varchar("role", { length: 255 }).notNull().default("consument"),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    hashedPassword: varchar("hashedPassword", { length: 255 }),
    emailVerified: timestamp("emailVerified", {
      mode: "date",
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", { length: 255 }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (user) => ({
    userByIdIdx: index("createdById_idx").on(user.id),
    nameIndex: index("name_idx").on(user.name),
    emailIndex: index("email_idx").on(user.email),
  }),
);

export const product = createTable(
  "product",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    desc: text("desc").notNull(),
    categoryId: varchar("categoryId").references(() => category.id),
    subCategoryId: varchar("subCategoryId").references(() => subCategory.id),
    discount: smallint("discount").notNull().default(0),
    price: real("price").notNull().default(0),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
  },
  (pr) => ({
    productIdIdx: index("productIdIdx").on(pr.id),
    productTitleIdx: index("productTitleIdx").on(pr.title),
    productSlugIdx: index("productSlugIdx").on(pr.slug),
  }),
);

export const sizes = createTable("sizes", {
  id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const details = createTable(
  "details",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    stock: smallint("stock").notNull().default(0),
    productId: varchar("productId", { length: 255 })
      .references(() => product.id, { onDelete: "cascade" })
      .notNull()
      .references(() => product.id),
    sizeId: varchar("sizeId", { length: 255 })
      .notNull()
      .references(() => sizes.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (p) => ({
    detailsIDx: index("detailsIDx").on(p.id),
    detailsProductIdx: index("detailsProductIdx").on(p.productId),
    detailsSizeIdx: index("detailsSizeIdx").on(p.sizeId),
  }),
);

export const category = createTable(
  "category",
  {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (cat) => ({
    categoryIdIdx: index("categoryIdIdx").on(cat.id),
    categorynameIdx: index("categorynameIdx").on(cat.name),
  }),
);

export const subCategory = createTable(
  "subCategory",
  {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    categoryId: varchar("categoryId")
      .notNull()
      .references(() => category.id),
    name: varchar("name").notNull(),
  },
  (cat) => ({
    subCategoryIdIdx: index("subCategoryIdIdx").on(cat.id),
    subCategoryNameIdx: index("subCategoryNameIdx").on(cat.name),
  }),
);

export const imageProduct = createTable(
  "imageProduct",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    url: text("url").notNull(),
    blur: text("blur").notNull(),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
  },
  (img) => ({
    imgIdIdx: index("imgIdIdx").on(img.id),
    imgProductIdx: index("imgProductIdx").on(img.productId),
  }),
);

export const coupon = createTable(
  "coupon",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    name: varchar("name", { length: 255 }).notNull(),
    value: smallint("value").notNull(),
    imageUrl: varchar("imageUrl", { length: 255 }),
  },
  (pr) => ({
    couponIdIdx: index("couponIdIdx").on(pr.id),
    couponNameIdx: index("couponNameIdx").on(pr.name),
  }),
);

export const promo = createTable(
  "promo",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    couponId: varchar("couponId").references(() => coupon.id),
    productId: varchar("productId").references(() => product.id),
  },
  (c) => ({
    promoIdIdx: index("promoIdIdx").on(c.id),
    promoCouponIdx: index("promoCouponIdx").on(c.couponId),
    promoProductIdx: index("promoProductIdx").on(c.productId),
  }),
);

export const cart = createTable(
  "cart",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    totalPrice: real("totalPrice").notNull().default(0),
    size: varchar("size").notNull(),
    totalProduct: smallint("totalProduct").notNull().default(0),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (c) => ({
    cartUserIdx: index("cartUserIdx").on(c.userId),
    cartProductIdx: index("cartProductIdx").on(c.productId),
  }),
);

export const wishlist = createTable(
  "wishlist",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (c) => ({
    cartUserIdx: index("wishlistUserIdx").on(c.userId),
    cartProductIdx: index("wishlistProductIdx").on(c.productId),
  }),
);

export const lineItems = createTable("lineItems", {
  id: varchar("id", { length: 255 })
    .notNull()
    .unique()
    .primaryKey()
    .$defaultFn(() => nanoid(10)),
  paymentId: varchar("paymentId").notNull(),
  productId: varchar("productId").notNull(),
  totalPrice: real("totalPrice").notNull().default(0),
  size: varchar("size").notNull(),
  totlaProduct: smallint("totalProduct").notNull().default(0),
  createdAt: timestamp("createdAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .notNull()
    .defaultNow(),
  cartId: varchar("cartId"),
});

export const payment = createTable(
  "payment",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    status: varchar("status").notNull().default("pending"),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (c) => ({
    paymentCartIdIdx: index("paymentCartIdIdx").on(c.id),
    paymentuserIdx: index("paymentuserIdx").on(c.userId),
  }),
);

export const ratings = createTable(
  "ratings",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    value: smallint("value").notNull(),
    message: text("message"),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    paymentId: varchar("paymentId")
      .notNull()
      .references(() => payment.id),
    productId: varchar("productId")
      .notNull()
      .references(() => payment.id),
  },
  (c) => ({
    ratingIdIdx: index("ratingIdIdx").on(c.id),
    ratinguserIdx: index("ratinguserIdx").on(c.userId),
    ratingpaymentIdx: index("ratingpaymentIdx").on(c.paymentId),
    ratingvalueIdx: index("ratingvalueIdx").on(c.value),
  }),
);

export const categoryNotifi = createTable(
  "categoryNotifi",
  {
    id: varchar("id", { length: 255 }).notNull().unique().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
  },
  (c) => ({
    categoryNotifiIdx: index("categoryNotifiIdx").on(c.id),
    categoryNotifiNameIdx: index("categoryNotifiNameIdx").on(c.name),
  }),
);

export const notifiRead = createTable(
  "notifiRead",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    isRead: boolean("isRead").notNull().default(false),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    notifiId: varchar("notifiId", { length: 255 })
      .notNull()
      .references(() => notifi.id),
  },
  (c) => ({
    notifiReadIdIdx: index("notifiReadIdIdx").on(c.id),
    notifiReadIsReadIdx: index("notifiReadIsReadIdx").on(c.isRead),
    notifiReadUserIdx: index("notifiReadUserIdx").on(c.userId),
  }),
);

export const notifi = createTable(
  "notifi",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    title: varchar("title", { length: 2555 }).notNull(),
    details: text("details"),
    userId: varchar("userId", { length: 255 }).references(() => users.id),
    categoryNotifiId: varchar("categoryNotifiId")
      .notNull()
      .references(() => categoryNotifi.id),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (c) => ({
    notifiIdIdx: index("notifiIdIdx").on(c.id),
    notifiCategoryIdx: index("notifiCategoryIdx").on(c.categoryNotifiId),
    notifiUserIdx: index("notifiUserIdx").on(c.userId),
  }),
);

export const conversation = createTable(
  "conversation",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (c) => ({ conversationIdIdx: index("conversationIdIdx").on(c.id) }),
);

export const member = createTable(
  "member",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    userId: varchar("userId", { length: 255 }).references(() => users.id),
    conversationId: varchar("conversationId", { length: 255 }).references(
      () => users.id,
    ),
  },
  (c) => ({
    memberIdIdx: index("memberIdIdx").on(c.id),
    memberUserIdIdx: index("memberUserIdIdx").on(c.userId),
    memberConversationIdx: index("memberConversationIdx").on(c.conversationId),
  }),
);

export const message = createTable(
  "message",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .unique()
      .primaryKey()
      .$defaultFn(() => nanoid(10)),
    isRead: boolean("isRead").notNull().default(false),
    value: text("value").notNull(),
    userId: varchar("userId", { length: 255 }).references(() => users.id),
    conversationId: varchar("conversationId", { length: 255 }).references(
      () => users.id,
    ),
  },
  (c) => ({
    messageIdIdx: index("messageIdIdx").on(c.id),
    messageUserIdx: index("messageUserIdx").on(c.userId),
    messageConversationIdx: index("messageConversationIdx").on(
      c.conversationId,
    ),
  }),
);

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

//relations

export const usersRelations = relations(users, ({ many }) => ({
  notifi: many(notifi),
  accounts: many(accounts),
  cart: many(cart),
  message: many(message),
  member: many(member),
  payment: many(payment),
  notifiRead: many(notifiRead),
  product: many(product),
  ratings: many(ratings),
  wishlist: many(wishlist),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const productRelations = relations(product, ({ one, many }) => ({
  user: one(users, { fields: [product.userId], references: [users.id] }),
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  subCategory: one(subCategory, {
    fields: [product.subCategoryId],
    references: [subCategory.id],
  }),
  imageUrl: many(imageProduct),
  promo: many(promo),
  cart: many(cart),
  ratings: many(ratings),
  details: many(details),
  lineitems: many(lineItems),
  wishlist: many(wishlist),
}));

export const wishlistRelations = relations(wishlist, ({ one }) => ({
  product: one(product, {
    fields: [wishlist.id],
    references: [product.id],
  }),
  user: one(users, {
    fields: [wishlist.id],
    references: [users.id],
  }),
}));

export const sizesRelations = relations(sizes, ({ many }) => ({
  details: many(details),
}));

export const detailsRelations = relations(details, ({ one }) => ({
  products: one(product, {
    fields: [details.productId],
    references: [product.id],
  }),
  sizes: one(sizes, {
    fields: [details.sizeId],
    references: [sizes.id],
  }),
}));

export const imageProductRelations = relations(imageProduct, ({ one }) => ({
  product: one(product, {
    fields: [imageProduct.productId],
    references: [product.id],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  product: many(product),
  subCategory: many(subCategory),
}));

export const subCategoryRelations = relations(subCategory, ({ many, one }) => ({
  product: many(product),
  category: one(category, {
    fields: [subCategory.categoryId],
    references: [category.id],
  }),
}));

export const couponRelations = relations(coupon, ({ many }) => ({
  promo: many(promo),
}));

export const promoRelations = relations(promo, ({ one }) => ({
  coupon: one(coupon, {
    fields: [promo.couponId],
    references: [coupon.id],
  }),
  product: one(product, {
    fields: [promo.productId],
    references: [product.id],
  }),
}));

export const cartRelations = relations(cart, ({ one }) => ({
  product: one(product, {
    fields: [cart.productId],
    references: [product.id],
  }),
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
}));

export const paymentRelations = relations(payment, ({ one, many }) => ({
  user: one(users, {
    fields: [payment.userId],
    references: [users.id],
  }),
  items: many(lineItems),
}));

export const lineItemRelations = relations(lineItems, ({ one }) => ({
  product: one(product, {
    fields: [lineItems.productId],
    references: [product.id],
  }),
  cart: one(cart, {
    fields: [lineItems.cartId],
    references: [cart.id],
  }),
  payment: one(payment, {
    fields: [lineItems.paymentId],
    references: [payment.id],
  }),
}));

export const ratingRelations = relations(ratings, ({ one }) => ({
  users: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
  product: one(product, {
    fields: [ratings.productId],
    references: [product.id],
  }),
  payment: one(payment, {
    fields: [ratings.paymentId],
    references: [payment.id],
  }),
}));

export const categoryNotifiRelations = relations(
  categoryNotifi,
  ({ many }) => ({
    notifi: many(notifi),
  }),
);

export const notifiReadRealtions = relations(notifiRead, ({ one }) => ({
  users: one(users, {
    fields: [notifiRead.userId],
    references: [users.id],
  }),
  notifi: one(notifi, {
    fields: [notifiRead.notifiId],
    references: [notifi.id],
  }),
}));

export const notifiRelations = relations(notifi, ({ many, one }) => ({
  notifiRead: many(notifiRead),
  users: one(users, {
    fields: [notifi.userId],
    references: [users.id],
  }),
  categoryNotifi: one(categoryNotifi, {
    fields: [notifi.categoryNotifiId],
    references: [categoryNotifi.id],
  }),
}));

export const conversationRelations = relations(conversation, ({ many }) => ({
  member: many(member),
  message: many(message),
}));

export const messageRealtions = relations(message, ({ one }) => ({
  users: one(users, {
    fields: [message.userId],
    references: [users.id],
  }),
  conversation: one(conversation, {
    fields: [message.conversationId],
    references: [conversation.id],
  }),
}));

export const memberRealtions = relations(member, ({ one }) => ({
  users: one(users, {
    fields: [member.userId],
    references: [users.id],
  }),
  conversation: one(conversation, {
    fields: [member.conversationId],
    references: [conversation.id],
  }),
}));

export type Product = typeof product.$inferSelect;
export type Wishlist = typeof wishlist.$inferSelect
export type ImageProduct = typeof imageProduct.$inferSelect;
export type Category = typeof category.$inferSelect;
export type Details = typeof details.$inferSelect;
