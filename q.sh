#!/bin/bash

# TO SETUP POSTGRES ON ARCH
# https://gist.github.com/NickMcSweeney/3444ce99209ee9bd9393ae6ab48599d8

if ! systemctl is-active --quiet postgresql; then
    systemctl start postgresql
fi

if tmux has-session -t chumcheck 2>/dev/null; then
    echo "Ending existing tmux session 'chumcheck'..."
    tmux kill-session -t chumcheck
fi

tmuxinator start
