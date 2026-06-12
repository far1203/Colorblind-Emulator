-- -------------------------------------------------------------
-- TablePlus 7.1.0(710)
--
-- https://tableplus.com/
--
-- Database: postgres
-- Generation Time: 2026-06-12 09:22:08.0690
-- -------------------------------------------------------------


-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "email" text NOT NULL,
    "hashed_password" text NOT NULL,
    "created_at" timestamptz DEFAULT now(),
    PRIMARY KEY ("id")
);

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS images_id_seq;

-- Table Definition
CREATE TABLE "public"."images" (
    "id" int4 NOT NULL DEFAULT nextval('images_id_seq'::regclass),
    "user_id" int4,
    "filename" text NOT NULL,
    "deficiency" text NOT NULL,
    "created_at" timestamp DEFAULT now(),
    PRIMARY KEY ("id")
);



-- Indices
CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);
ALTER TABLE "public"."images" ADD FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");
