#!/bin/bash
cd /home/kavia/workspace/code-generation/employee-activity-and-management-system-90342-90431/frontend_web_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

