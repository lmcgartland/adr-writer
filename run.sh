#!/usr/bin/env node

const next = require('next');
const { createServer } = require('http');
const path = require("path");
const fs = require("fs");

const PORT = 3000;

const app = next({dir: __dirname});
const handle = app.getRequestHandler();

console.log(`Starting server on port ${PORT}`);
createServer(handle).listen(PORT);
