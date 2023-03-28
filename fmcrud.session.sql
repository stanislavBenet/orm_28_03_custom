CREATE TABLE "things"(
    "id" bigserial PRIMARY KEY,
    "body" text NOT NULL CHECK ("body"!=''),
    "updateAt" timestamp NOT NULL DEFAULT current_timestamp,
    "createAt" timestamp NOT NULL DEFAULT current_timestamp)