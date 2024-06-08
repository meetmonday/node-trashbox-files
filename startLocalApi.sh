#!/bin/bash
# Нужно оче видно вставлять свои $API_ID и $API_HASH
docker run -d -p 8081:8081 --name=telegram-bot-api --restart=always \
  -v telegram-bot-api-data:/var/lib/telegram-bot-api \
  -e TELEGRAM_API_ID=$API_ID \
  -e TELEGRAM_API_HASH=$API_HASH \
  aiogram/telegram-bot-api:latest
