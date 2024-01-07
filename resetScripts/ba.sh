#!/bin/bash



IS_FORCE=false;
if [ $# -ne 2 ]; then
    if [ "$1" == "--force" ]; then
      IS_FORCE=true;
    fi
fi

echo "Installing missing dependencies..."
sudo apt-get update --fix-missing > /dev/null
echo "Upgrading apt library..."

sudo apt-get -y upgrade > /dev/null

echo; echo

echo "OpenShot:"
echo "   Checking for Zenity"
has_zenity=$(whereis zenity)
has_zenity=${has_zenity:7}
if [ -z "$has_zenity" ]; then
  echo "   Zenity isn't installed"
  sleep 2
  echo "   Installing Zenity"
  sudo apt -y install zenity < /dev/null
  echo "   Zenity was installed"
else
  echo "   Zenity is already installed"
fi


echo "   Getting latest OpenShot executable URL"
latest_url=$(wget https://www.openshot.org/download/stable/.AppImage -q -O -)
latest_version=${latest_url:58}
latest_version=${latest_version%/*}

echo
echo "   OpenShot $latest_version was found at $(tput bold)$(tput smul)$latest_url$(tput sgr0)"

if [ $IS_FORCE == true ]; then
    echo "   Downloading OpenShot (force)"
    wget --retry-connrefused --waitretry=1 --tries=10 -nv --show-progress ${latest_url} -O openshot
else
    echo "   Downloading OpenShot"
    wget --retry-connrefused --waitretry=1 --tries=10 -nv -nc --show-progress ${latest_url} -O openshot
fi

echo "   Done!"
