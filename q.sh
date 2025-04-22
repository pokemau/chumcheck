#!/bin/bash

# TO SETUP POSTGRES ON ARCH
# https://gist.github.com/NickMcSweeney/3444ce99209ee9bd9393ae6ab48599d8

systemctl start postgresql

# Check if a tmux session named 'chumcheck' exists
if tmux has-session -t chumcheck 2>/dev/null; then
    echo "Ending existing tmux session 'chumcheck'..."
    tmux kill-session -t chumcheck
fi

tmuxinator start