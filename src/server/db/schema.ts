import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  index,
  real,
  varchar,
  primaryKey,
  smallint,
  pgEnum,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { customAlphabet } from "nanoid";

export const createId = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyz",
  10,
);

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

export const address = pgTable(
  "address",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    address: text("address").notNull(),
    city: text("city").notNull(),
    state: text("state").notNull(),
    zip: text("zip").notNull(),
    country: text("country").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("address_user_id_idx").on(table.userId),
    addressIdIdx: index("address_address_id_idx").on(table.id),
  }),
);

export const product = pgTable(
  "product",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar("name").notNull(),
    slug: varchar("slug").notNull().unique(),
    description: text("description").notNull(),
    detail: text("detail").notNull(),
    price: real("price").notNull().default(0),
    discoutn: real("discoutn").notNull().default(0),
    createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => ({
    slugIdx: index("product_slug_idx").on(table.slug),
    productIdIdx: index("product_product_id_idx").on(table.id),
  }),
);

export const media = pgTable(
  "media",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    thumbnail: text("thumbnail").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    productIdIdx: index("media_product_id_idx").on(table.productId),
    mediaIdIdx: index("media_media_id_idx").on(table.id),
  }),
);

export const stockandsize = pgTable(
  "stock",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    stock: integer("stock").notNull(),
    size: varchar("size").notNull(),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    stockIdIdx: index("stock_id_idx").on(table.id),
    productIdIdx: index("stock_product_id_idx").on(table.productId),
  }),
);

export const category = pgTable(
  "category",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar("name").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index("category_name_idx").on(table.name),
    categoryIdIdx: index("category_category_id_idx").on(table.id),
  }),
);

export const subcategory = pgTable(
  "subcategory",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar("name").notNull(),
    categoryId: varchar("categoryId")
      .notNull()
      .references(() => category.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    nameIdx: index("subcategory_name_idx").on(table.name),
    categoryIdIdx: index("subcategory_category_id_idx").on(table.categoryId),
    subcategoryIdIdx: index("subcategory_subcategory_id_idx").on(table.id),
  }),
);

export const productDetail = pgTable(
  "prduct_detail",
  {
    categoryId: varchar("categoryId")
      .notNull()
      .references(() => category.id),
    subcategoryId: varchar("subcategoryId")
      .notNull()
      .references(() => subcategory.id),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.categoryId, table.subcategoryId, table.productId],
    }),
    categoryIdx: index("product_category_idx").on(table.categoryId),
    subcategoryIdx: index("product_subcategory_idx").on(table.subcategoryId),
    productIdx: index("product_product_idx").on(table.productId),
  }),
);

export const cart = pgTable(
  "cart",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    amount: smallint("amount").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    cartIdIdx: index("cart_cart_id_idx").on(table.id),
    userIdIdx: index("cart_user_id_idx").on(table.userId),
    productIdIdx: index("cart_product_id_idx").on(table.productId),
  }),
);

export const promo = pgTable(
  "promo",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar("name").notNull(),
    discount: real("discount").notNull(),
    image: text("image"),
    slug: varchar("slug").notNull(),
    expiredAt: timestamp("expiredAt").notNull(),
  },
  (table) => ({
    slugIdx: index("promo_slug_idx").on(table.slug),
    promoIdIdx: index("promo_promo_id_idx").on(table.id),
  }),
);

export const promotoproduct = pgTable(
  "promotoproduct",
  {
    promoId: varchar("promoId")
      .notNull()
      .references(() => promo.id, { onDelete: "cascade" }),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.promoId, table.productId] }),
    promoIdx: index("promotoproduct_promo_idx").on(table.promoId),
    productIdx: index("promotoproduct_product_idx").on(table.productId),
  }),
);

export const coupon = pgTable(
  "coupon",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    name: varchar("name").notNull(),
    discount: real("discount").notNull(),
    minorder: integer("minorder").notNull(),
    description: text("description"),
    amount: integer("amount"),
    tac: varchar("tac").notNull(),
    code: varchar("code").notNull(),
    expiredAt: timestamp("expiredAt").notNull(),
  },
  (table) => ({
    couponIdIdx: index("coupon_coupon_id_idx").on(table.id),
    nameIdx: index("coupon_name_idx").on(table.name),
  }),
);

export const couponCounsume = pgTable(
  "coupon_consume",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    couponId: varchar("couponId")
      .notNull()
      .references(() => coupon.id),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    couponIdIdx: index("coupon_consume_coupon_id_idx").on(table.couponId),
    userIdIdx: index("coupon_consume_user_id_idx").on(table.userId),
    couponConsumeIdIdx: index("coupon_consume_coupon_consume_id_idx").on(
      table.id,
    ),
  }),
);

export const checkoutStatus = pgEnum("checkoutStatus", [
  "pending",
  "processing",
  "completed",
  "cancelled",
]);

export const checkout = pgTable(
  "checkout",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    paymentMethod: text("paymentMethod"),
    totalprice: real("totalprice").notNull(),
    amount: integer("amount").notNull(),
    status: checkoutStatus("checkoutStatus").default("pending"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("checkout_user_id_idx").on(table.userId),
    checkoutIdIdx: index("checkout_checkout_id_idx").on(table.id),
  }),
);

export const checkoutitem = pgTable(
  "checkout_item",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    checkoutId: varchar("checkoutId")
      .notNull()
      .references(() => checkout.id),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    amount: integer("amount").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    checkoutIdIdx: index("checkout_item_checkout_id_idx").on(table.checkoutId),
    productIdIdx: index("checkout_item_product_id_idx").on(table.productId),
    checkoutItemIdIdx: index("checkout_item_checkout_item_id_idx").on(table.id),
  }),
);

export const typeNotifi = pgEnum("typeNotifi", [
  "payment",
  "cancel-order",
  "promo-code",
  "shipping",
  "order-complete",
  "order-cancel",
  "order-refund",
  "product-review",
  "product-review-reply",
  "contact-us",
  "contact-us-reply",
  "feedback",
  "feedback-reply",
  "other",
]);

export const notifi = pgTable(
  "notifi",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    type: typeNotifi("typeNotifi").notNull(),
    message: varchar("message").notNull(),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    productId: varchar("productId").references(() => product.id),
    checkoutId: varchar("checkoutId").references(() => checkout.id),
    promoId: varchar("promoId").references(() => promo.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    notifiIdx: index("notifi_id_idx").on(table.id),
    userIdIdx: index("notifi_userId_idx").on(table.userId),
  }),
);

export const rating = pgTable(
  "rating",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    rating: real("rating").notNull(),
    messsage: text("messsage"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("rating_user_id_idx").on(table.userId),
    productIdIdx: index("rating_product_id_idx").on(table.productId),
    ratingIdIdx: index("rating_rating_id_idx").on(table.id),
  }),
);

export const feedback = pgTable(
  "feedback",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    productId: varchar("productId")
      .notNull()
      .references(() => product.id),
    message: text("message").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("feedback_user_id_idx").on(table.userId),
    productIdIdx: index("feedback_product_id_idx").on(table.productId),
    feedbackIdIdx: index("feedback_feedback_id_idx").on(table.id),
  }),
);

export const chat = pgTable(
  "chat",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    chatidIdx: index("chat_chat_id_idx").on(table.id),
  }),
);

export const message = pgTable(
  "message",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    chatId: varchar("chatId")
      .notNull()
      .references(() => chat.id),
    value: text("message").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("message_user_id_idx").on(table.userId),
    chatIdIdx: index("message_chat_id_idx").on(table.chatId),
    messageIdIdx: index("message_message_id_idx").on(table.id),
  }),
);

export const member = pgTable(
  "member",
  {
    id: varchar("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    userId: varchar("userId")
      .notNull()
      .references(() => user.id),
    chatId: varchar("chatId")
      .notNull()
      .references(() => chat.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => ({
    userIdIdx: index("member_user_id_idx").on(table.userId),
    chatIdIdx: index("member_chat_id_idx").on(table.chatId),
    memberIdIdx: index("member_member_id_idx").on(table.id),
  }),
);

// relations

export const userRelations = relations(user, ({ many, one }) => ({
  sessions: many(session, { relationName: "session" }),
  accounts: many(account),
  twoFactor: one(twoFactor),
  addresses: many(address),
  passkeys: many(passkey),
  messages: many(message),
  members: many(member),
  notifications: many(notifi),
  ratings: many(rating),
  feedbacks: many(feedback),
  couponConsumes: many(couponCounsume),
  checkouts: many(checkout),
  impersonate: many(session, { relationName: "impersonate" }),
}));

export const addressRelations = relations(address, ({ one }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
    relationName: "session",
  }),
  impersonatedBy: one(user, {
    fields: [session.impersonatedBy],
    references: [user.id],
    relationName: "impersonate",
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

export const productRelations = relations(product, ({ many }) => ({
  sizes: many(stockandsize),
  productDetails: many(productDetail),
  media: many(media),
  carts: many(cart),
  promoproduct: many(promotoproduct),
  checkoutitem: many(checkoutitem),
  notifications: many(notifi),
  ratings: many(rating),
  feedbacks: many(feedback),
}));

export const mediaRelations = relations(media, ({ one }) => ({
  product: one(product, {
    fields: [media.productId],
    references: [product.id],
  }),
}));

export const stockandsizeRelation = relations(stockandsize, ({ one }) => ({
  product: one(product, {
    fields: [stockandsize.productId],
    references: [product.id],
  }),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  subcategories: many(subcategory),
  productDetail: many(productDetail),
}));

export const subcategoryRelations = relations(subcategory, ({ many, one }) => ({
  productDetail: many(productDetail),
  category: one(category, {
    fields: [subcategory.categoryId],
    references: [category.id],
  }),
}));

export const productDetailRelations = relations(productDetail, ({ one }) => ({
  category: one(category, {
    fields: [productDetail.categoryId],
    references: [category.id],
  }),
  subcategory: one(subcategory, {
    fields: [productDetail.subcategoryId],
    references: [subcategory.id],
  }),
  product: one(product, {
    fields: [productDetail.productId],
    references: [product.id],
  }),
}));

export const cartRelation = relations(cart, ({ one }) => ({
  product: one(product, {
    fields: [cart.productId],
    references: [product.id],
  }),
}));

export const promoRelations = relations(promo, ({ many }) => ({
  promotoproduct: many(promotoproduct),
}));

export const promotoproductRelations = relations(promotoproduct, ({ one }) => ({
  product: one(product, {
    fields: [promotoproduct.productId],
    references: [product.id],
  }),
  promo: one(promo, {
    fields: [promotoproduct.promoId],
    references: [promo.id],
  }),
}));

export const couponRelations = relations(coupon, ({ many }) => ({
  couponConsumes: many(couponCounsume),
}));

export const couponCounsumeRelations = relations(couponCounsume, ({ one }) => ({
  coupon: one(coupon, {
    fields: [couponCounsume.couponId],
    references: [coupon.id],
  }),
  user: one(user, {
    fields: [couponCounsume.userId],
    references: [user.id],
  }),
}));

export const checkoutRelations = relations(checkout, ({ many, one }) => ({
  checkoutitems: many(checkoutitem),
  user: one(user, {
    fields: [checkout.userId],
    references: [user.id],
  }),
}));

export const checkoutitemRelations = relations(checkoutitem, ({ one }) => ({
  checkout: one(checkout, {
    fields: [checkoutitem.checkoutId],
    references: [checkout.id],
  }),
  product: one(product, {
    fields: [checkoutitem.productId],
    references: [product.id],
  }),
}));

export const notifiRelations = relations(notifi, ({ one }) => ({
  user: one(user, {
    fields: [notifi.userId],
    references: [user.id],
  }),
  product: one(product, {
    fields: [notifi.productId],
    references: [product.id],
  }),
  checkout: one(checkout, {
    fields: [notifi.checkoutId],
    references: [checkout.id],
  }),
  promo: one(promo, {
    fields: [notifi.promoId],
    references: [promo.id],
  }),
}));

export const ratingRelations = relations(rating, ({ one }) => ({
  user: one(user, {
    fields: [rating.userId],
    references: [user.id],
  }),
  product: one(product, {
    fields: [rating.productId],
    references: [product.id],
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(user, {
    fields: [feedback.userId],
    references: [user.id],
  }),
  product: one(product, {
    fields: [feedback.productId],
    references: [product.id],
  }),
}));

export const chatRelations = relations(chat, ({ many }) => ({
  messages: many(message),
  member: many(member),
}));

export const messageRelations = relations(message, ({ one }) => ({
  user: one(user, {
    fields: [message.userId],
    references: [user.id],
  }),
  chat: one(chat, {
    fields: [message.chatId],
    references: [chat.id],
  }),
}));

export const memberRelations = relations(member, ({ one }) => ({
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
  chat: one(chat, {
    fields: [member.chatId],
    references: [chat.id],
  }),
}));
