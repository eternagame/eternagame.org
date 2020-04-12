#!/bin/bash

# ensure we don't error initial deployment
pm2 stop /var/www/app/ecosystem.config.js || true
