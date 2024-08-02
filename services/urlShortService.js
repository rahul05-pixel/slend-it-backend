const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const URL = require("../models/urlShort");
const shortId = require("shortid");
const req = require("express/lib/request");

const createShortUrl = async (body) => {
  const url = new URL({
    weburl: body.weburl,
    shortenedUrl: `http://localhost:9000/${shortId()}`,
  });
  const shortUrl = await url.save();
  return shortUrl;
};

const createAuthShortUrl = async (req) => {
  const { weburl } = req.body;

  const url = new URL({
    user: req.user.sub,
    weburl,
    shortenedUrl: `http://localhost:9000/${shortId()}`,
    clicks: 0,
  });
  const shortUrl = await url.save();
  return shortUrl;
};

const fetchShortUrls = async (req) => {
  const urls = await URL.find({ user: req.user.sub });
  return urls;
};
const shortUrlClickCount = async (req, res) => {
  let url = await URL.findById(req.params.id);

  url.clicks = url.clicks + 1;
  const shortUrl = await URL.findByIdAndUpdate(req.params.id, url, {
    useFindAndModify: false,
  });
  return shortUrl;
};
const redirectToUrl = async (code, res) => {
  const url = await URL.find();
  let temp = url.find((item) => {
    if (item.shortenedUrl?.includes(code)) {
      return item;
    }
  });

  res.redirect(temp.weburl);
};

const editAuthShortUrl = async (req, res) => {
  console.log(req.body.id,55)
 
  const newShortUrl = await URL.findByIdAndUpdate(req.body.id, req.body, {
    useFindAndModify: false,
  });
  return newShortUrl;
};

module.exports = {
  createShortUrl,
  createAuthShortUrl,
  fetchShortUrls,
  shortUrlClickCount,
  redirectToUrl,
  editAuthShortUrl
};
