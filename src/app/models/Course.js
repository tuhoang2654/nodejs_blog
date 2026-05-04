const mongoose = require('mongoose');
const getSlug = require('speakingurl');
const crypto = require('crypto');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const slugOptions = { separator: '-', lang: 'en', truncate: 120 };

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, unique: true },
  },
  {
    timestamps: true,
  },
);

Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
})

// mongoose-slug-generator dùng .exec(callback) — không tương thích Mongoose 7+
Course.pre('save', async function () {
  if (!this.isModified('name')) {
    return;
  }

  const baseSlug = getSlug(this.name, slugOptions);
  let slug = baseSlug;

  const query = { slug: baseSlug };
  if (this._id) {
    query._id = { $ne: this._id };
  }

  const existing = await this.constructor.findOne(query);
  if (existing) {
    slug = `${baseSlug}-${crypto.randomBytes(4).toString('hex')}`;
  }

  this.slug = slug;
});

module.exports = mongoose.model('Course', Course);