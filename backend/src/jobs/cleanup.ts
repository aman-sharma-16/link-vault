import VAULT_model from "@/features/vault/db/vault.db.model";
import cron from "node-cron";
import fs from "node:fs";
import path from "node:path";

let isRunning = false; // prevent overlapping runs

export const startCleanupJob = () => {
  cron.schedule("*/10 * * * *", async () => {
    if (isRunning) {
      console.log("Cleanup already running. Skipping...");
      return;
    }

    isRunning = true;
    console.log("Running cleanup job (every 10 min)...");

    try {
      const now = new Date();

      const expiredVaults = await VAULT_model.find({
        expiresAt: { $lte: now },
      });

      if (!expiredVaults.length) {
        console.log("No expired vaults found.");
        isRunning = false;
        return;
      }

      for (const vault of expiredVaults) {
        try {
          // Delete file if exists
          if (vault.type === "FILE" && vault.file?.url) {
            const filePath = path.resolve(vault.file.url);

            if (fs.existsSync(filePath)) {
              await fs.promises.unlink(filePath);
              console.log("Deleted file:", filePath);
            }
          }

          // Delete DB entry
          await VAULT_model.deleteOne({ _id: vault._id });
          console.log("Deleted DB entry:", vault._id);

        } catch (err) {
          console.error("Error deleting vault:", vault._id, err);
        }
      }

      console.log(
        `Cleanup completed. Removed ${expiredVaults.length} expired vault(s).`
      );

    } catch (error) {
      console.error("Cleanup job failed:", error);
    } finally {
      isRunning = false;
    }
  });
};
