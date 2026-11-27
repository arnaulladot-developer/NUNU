CREATE TYPE "public"."estat_comanda" AS ENUM('Comprat', 'Tramitat', 'Enviat', 'Arribat', 'Cancel·lada');--> statement-breakpoint
CREATE TYPE "public"."estat_pagament" AS ENUM('pendent', 'pagat', 'caducat', 'reemborsat');--> statement-breakpoint
CREATE TABLE "comanda_articles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "comanda_articles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"comanda_id" text NOT NULL,
	"product_id" text NOT NULL,
	"mida_id" text NOT NULL,
	"nom_producte" text NOT NULL,
	"etiqueta_mida" text NOT NULL,
	"preu_unitat_cents" integer NOT NULL,
	"quantitat" integer NOT NULL,
	"comentari" text DEFAULT '' NOT NULL,
	CONSTRAINT "comanda_articles_valors_ck" CHECK ("comanda_articles"."quantitat" > 0 and "comanda_articles"."preu_unitat_cents" >= 0)
);
--> statement-breakpoint
CREATE TABLE "comandes" (
	"id" text PRIMARY KEY NOT NULL,
	"creada_el" timestamp with time zone DEFAULT now() NOT NULL,
	"estat" "estat_comanda" DEFAULT 'Comprat' NOT NULL,
	"estat_pagament" "estat_pagament" DEFAULT 'pendent' NOT NULL,
	"pagat_el" timestamp with time zone,
	"client" text NOT NULL,
	"correu" text NOT NULL,
	"telefon" text NOT NULL,
	"adreca" text NOT NULL,
	"import_productes_cents" integer NOT NULL,
	"import_enviament_cents" integer NOT NULL,
	"import_total_cents" integer NOT NULL,
	"stripe_sessio_id" text,
	"stripe_pagament_id" text,
	CONSTRAINT "comandes_imports_ck" CHECK ("comandes"."import_productes_cents" >= 0
        and "comandes"."import_enviament_cents" >= 0
        and "comandes"."import_total_cents" = "comandes"."import_productes_cents" + "comandes"."import_enviament_cents")
);
--> statement-breakpoint
CREATE TABLE "rams_exhaurits" (
	"product_id" text PRIMARY KEY NOT NULL,
	"marcat_el" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stripe_esdeveniments" (
	"id" text PRIMARY KEY NOT NULL,
	"tipus" text NOT NULL,
	"rebut_el" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "comanda_articles" ADD CONSTRAINT "comanda_articles_comanda_id_comandes_id_fk" FOREIGN KEY ("comanda_id") REFERENCES "public"."comandes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "comanda_articles_linia_uq" ON "comanda_articles" USING btree ("comanda_id","product_id","mida_id");--> statement-breakpoint
CREATE UNIQUE INDEX "comandes_stripe_sessio_uq" ON "comandes" USING btree ("stripe_sessio_id");--> statement-breakpoint
CREATE INDEX "comandes_pagament_creada_idx" ON "comandes" USING btree ("estat_pagament","creada_el");