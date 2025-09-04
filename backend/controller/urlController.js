const Url = require("../model/url");
const { nanoid } = require("nanoid");

exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl, expiryTime, keyword } = req.body;

    if (!originalUrl || !expiryTime) {
      return res
        .status(400)
        .json({ message: "Original URL and expiry time are required" });
    }

    let shortCode;

    if (keyword) {
      const existing = await Url.findOne({ shortCode: keyword });
      if (existing) {
        return res
          .status(400)
          .json({ message: "Keyword already in use, choose another one" });
      }
      shortCode = keyword;
    } else {
      let isUnique = false;
      while (!isUnique) {
        const newCode = nanoid(6);
        const existing = await Url.findOne({ shortCode: newCode });
        if (!existing) {
          shortCode = newCode;
          isUnique = true;
        }
      }
    }

    const expiryDate = new Date(expiryTime);

    const url = new Url({
      shortCode,
      originalUrl,
      expiryDate,
    });

    await url.save();

    res.json({ shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (new Date() > url.expiryDate) {
      return res.status(410).json({ message: "URL expired" });
    }

    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
