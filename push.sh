#!/bin/sh

if [ "$1" = "--m" ]; then
  message="$2"
else
  message="update"
fi

git add .
git commit -m "$message"
git push
clear
