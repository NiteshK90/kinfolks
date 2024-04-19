-- DropForeignKey
ALTER TABLE "places" DROP CONSTRAINT "places_location_id_fkey";

-- DropIndex
DROP INDEX "places_location_id_key";

-- AddForeignKey
ALTER TABLE "places" ADD CONSTRAINT "places_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
