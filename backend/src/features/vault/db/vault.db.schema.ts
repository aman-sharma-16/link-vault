import mongoose from "mongoose";

const vault_db_schema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Unique share token (hard to guess)
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Content type
    type: {
      type: String,
      enum: ["TEXT", "FILE"],
      required: true,
    },

    // TEXT content (if type === "TEXT")
    textContent: {
      type: String,
      required: function () {
        return this.type === "TEXT";
      },
    },

    // FILE content (if type === "FILE")
    file: {
      url: {
        type: String,
      },
      originalName: {
        type: String,
      },
      mimeType: {
        type: String,
      },
      size: {
        type: Number,
      },
    },

    // Expiry handling
    expiresAt: {
      type: Date,
      default: new Date(Date.now() + 10 * 60 * 1000), // Default 10 minutes from creation
      required: true,
    },

    // Auto delete flag
    isExpired: {
      type: Boolean,
      default: false,
    },

    // Optional bonus features
    password: {
      type: String, // hashed password if implemented
    },

    maxViews: {
      type: Number,
      default: null,
    },

    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default vault_db_schema;
